import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
// import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../../redux/slices/transactionSlice";

const paymentOptions = [
  {
    id: 1,
    name: "Bank Rakyat Indonesia",
    logo: "/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg",
  },
  { id: 2, name: "Dana", logo: "/Logo DANA (PNG-240p) - FileVector69 1.svg" },
  {
    id: 3,
    name: "Bank Central Asia",
    logo: "/Bank BCA Logo (SVG-240p) - FileVector69 1.svg",
  },
  { id: 4, name: "Gopay", logo: "/Logo GoPay (SVG-240p) - FileVector69 1.svg" },
  { id: 5, name: "Ovo", logo: "/ovo.svg" },
];

function FindHistory() {
  const dispatch = useDispatch();
  // const { currentUser, registeredUsers } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams();

  const { histories: rawHistories, historyStatus } = useSelector(
    (state) => state.transaction,
  );
  const histories = rawHistories || [];
  const isLoading = historyStatus === "loading";

  const queryFromUrl = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(queryFromUrl);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const activeUser = registeredUsers.find((u) => u.email === currentUser?.email)
  // const historyTrx = activeUser?.history || []

  // const pageFromUrl = parseInt(searchParams.get("page")) || 1

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue) {
        setSearchParams({ search: inputValue });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchParams]);

  useEffect(() => {
    dispatch(
      fetchTransactionHistory({
        search: queryFromUrl,
        page: currentPage,
        limit: itemsPerPage,
      }),
    );
  }, [dispatch, queryFromUrl, currentPage, itemsPerPage]);

  // const totalItems = histories.length > 0 ? histories.length * (currentPage + (histories.length === itemsPerPage ? 1 : 0)) : 0;

  const pageNumbers = [currentPage];

  const isHasMorePage = histories.length === itemsPerPage;
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => {
    if (isHasMorePage) setCurrentPage((prev) => prev + 1);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const getImageURL = (imagePath) => {
    if (!imagePath) return "/User edit.svg";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
      return imagePath;

    const BACKEND_URL = "/api";

    const fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);

    return `${BACKEND_URL}/img/profile/${fileName}`;
  };

  return (
    <section className="rounded-md border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-bold text-black">Find History</h3>
          <p className="mt-1 text-sm text-gray-500">
            {/* {filteredPeople.length} Result Found For{" "}
            {queryFromUrl || "Everyone"}{" "} */}
            Result Found For {queryFromUrl || "All Transaction"}
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Enter Number Or Full Name"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full rounded-xs border border-gray-200 bg-white py-3 pr-12 pl-4 text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
            <img
              src="/Search.svg"
              alt="icon-search"
              className="h-5 w-5 opacity-40"
            />
          </div>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        {isLoading ? (
          <div className="py-10 text-center text-gray-500">
            Loading history...
          </div>
        ) : (
          <>
            <table className="w-full min-w-lg border-spacing-y-0 md:min-w-full">
              <tbody>
                {histories.map((item, index) => {
                  const isExpense = item.type_transaction === "expense";
                  const amountColor = isExpense
                    ? "text-red-500"
                    : "text-green-500";
                  const sign = isExpense ? "- " : "+ ";

                  const paymentData = paymentOptions.find(
                    (option) => option.id === item.payment_method_id,
                  );

                  const displayName = item.fullname
                    ? item.fullname
                    : "Top Up Balance";

                  let displayPicture;
                  if (isExpense) {
                    displayPicture = item.picture
                      ? getImageURL(item.picture)
                      : "/user edit.svg";
                  } else {
                    displayPicture = paymentData
                      ? paymentData.logo
                      : "/Upload-default.svg";
                  }
                  let displayPhone;
                  if (isExpense) {
                    displayPhone = item.phone ? item.phone : "-";
                  } else {
                    displayPhone = paymentData
                      ? paymentData.name
                      : "System Entry";
                  }

                  return (
                    <tr
                      key={item.id || index}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} transition-colors hover:bg-blue-50`}
                    >
                      <td className="w-12 px-3 py-2 md:w-16 md:px-4 md:py-3">
                        <img
                          src={displayPicture}
                          alt={displayName}
                          className="h-10 w-10 rounded-sm object-cover md:h-12 md:w-12"
                        />
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-black md:text-base">
                        {/* className="py-3 px-4 text-center text-sm md:text-base font-medium text-black" */}

                        {displayName}
                      </td>

                      <td
                        className={`px-4 py-3 text-xs font-bold md:text-sm ${amountColor}`}
                      >
                        {sign}
                        {formatRupiah(item.amount)}
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-500 md:text-sm">
                        {displayPhone}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="rounded-full p-2 transition-colors hover:bg-gray-200">
                          <img
                            src="/Trash.svg"
                            alt="hapus"
                            className="h-5 w-5 opacity-60"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {histories.length === 0 && !isLoading && (
          <div>Data tidak ditemukan</div>
        )}
      </div>

      {histories.length > 0 && (
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 text-sm text-gray-500 sm:flex-row">
          <div className="font-medium">Show {histories.length} History</div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1 || isLoading}
              className="px-2 py-1 font-medium transition-colors hover:text-[#4A3AFF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`flex h-8 w-8 items-center justify-center rounded-md font-medium transition-all ${
                  currentPage === num
                    ? "text-primary bg-blue-50 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={!isHasMorePage || isLoading}
              className="hover:text-primary px-2 py-1 font-medium text-black transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default FindHistory;

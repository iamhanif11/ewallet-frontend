import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
// import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../../redux/slices/transactionSlice";

const paymentOptions = [
  { id: 1, name: "Bank Rakyat Indonesia", logo: "/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg" },
  { id: 2, name: "Dana", logo: "/Logo DANA (PNG-240p) - FileVector69 1.svg" },
  { id: 3, name: "Bank Central Asia", logo: "/Bank BCA Logo (SVG-240p) - FileVector69 1.svg" },
  { id: 4, name: "Gopay", logo: "/Logo GoPay (SVG-240p) - FileVector69 1.svg" },
  { id: 5, name: "Ovo", logo: "/ovo.svg" },
];

function FindHistory() {
  const dispatch = useDispatch();
  // const { currentUser, registeredUsers } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams();

  const {histories: rawHistories, historyStatus} = useSelector((state) => state.transaction);
  const histories = rawHistories || []
  const isLoading = historyStatus === "loading"

  const queryFromUrl = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(queryFromUrl);

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // const activeUser = registeredUsers.find((u) => u.email === currentUser?.email)
  // const historyTrx = activeUser?.history || []

  // const pageFromUrl = parseInt(searchParams.get("page")) || 1

 
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setCurrentPage(1)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      
      if (inputValue) {
        setSearchParams({search: inputValue});
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
      })
    )
  }, [dispatch, queryFromUrl, currentPage, itemsPerPage])

  // const totalItems = histories.length > 0 ? histories.length * (currentPage + (histories.length === itemsPerPage ? 1 : 0)) : 0;

  const pageNumbers = [currentPage];

  const isHasMorePage = histories.length === itemsPerPage
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev -1, 1))
  const handleNext = () => {
    if (isHasMorePage) setCurrentPage((prev) => prev +1)
  }

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };
  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/User edit.svg";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    const BACKEND_URL = "http://localhost:8080";
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    return cleanPath.startsWith("img/profile")
      ? `${BACKEND_URL}/${cleanPath}`
      : `${BACKEND_URL}/img/profile/${cleanPath}`;
  };

  return (
    <section className="bg-white rounded-md p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-black">Find History</h3>
          <p className="text-sm text-gray-500 mt-1">
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
            className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src="/Search.svg"
              alt="icon-search"
              className="w-5 h-5 opacity-40"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading history...</div>
        ) : (
          <>
        <table className="w-full min-w-lg md:min-w-full border-spacing-y-0">
          <tbody>
            {histories.map((item, index) =>{
              const isExpense = item.type_transaction === 'expense'
              const amountColor = isExpense ? 'text-red-500' : 'text-green-500'
              const sign = isExpense ? '- ' : "+ "

            const paymentData = paymentOptions.find(option => option.id === item.payment_method_id);

              const displayName = item.fullname ? item.fullname : "Top Up Balance";

              let displayPicture
              if (isExpense){
                displayPicture = item.picture ? getImageUrl(item.picture) : "/user edit.svg"

              } else {
                displayPicture = paymentData ? paymentData.logo : "/Upload-default.svg";
              }
              let displayPhone;
              if (isExpense) {
                displayPhone = item.phone ? item.phone : "-";
              } else {
                
                displayPhone = paymentData ? paymentData.name : "System Entry";
              }
              

              return (
                <tr
                  key={item.id || index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} transition-colors hover:bg-blue-50`}
                >
                  <td className="py-2 px-3 md:py-3 md:px-4 w-12 md:w-16">
                    <img
                      src={displayPicture}
                      alt={displayName}
                      className=" w-10 h-10 md:w-12 md:h-12 rounded-sm object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-sm md:text-base font-medium text-black">
                  
                      {/* className="py-3 px-4 text-center text-sm md:text-base font-medium text-black" */}
  
                      {displayName}
                  </td>
  
                  <td className={`py-3 px-4 text-xs md:text-sm font-bold ${amountColor}`}>
                    {sign}{formatRupiah(item.amount)}
                  </td>
  
                  <td className="py-3 px-4 text-xs md:text-sm text-gray-500">
                    {displayPhone}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <img
                        src="/Trash.svg"
                        alt="hapus"
                        className="w-5 h-5 opacity-60"
                      />
                    </button>
                  </td>
                </tr>
              )
})}
          </tbody>
        </table>
          </>

        )}

        {histories.length === 0 && !isLoading  &&(
          <div>
            Data tidak ditemukan
          </div>
        )}

      </div>

      {histories.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 w-full text-sm text-gray-500 pt-4 border-t border-gray-100 gap-4">
          <div className="font-medium">
            Show {histories.length} History
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1 || isLoading}
              className="px-2 py-1 font-medium hover:text-[#4A3AFF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-medium transition-all ${
                  currentPage === num
                    ? "text-primary font-bold bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={!isHasMorePage || isLoading}
              className="px-2 py-1 font-medium text-black hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { findReceivers } from "../../redux/slices/transactionSlice";

function FindPeople() {
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
 
  const queryFromUrl = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(queryFromUrl);

  const {receivers, pagination, status} = useSelector((state) => state.transaction)
  const isLoading = status === "loading"

  const [currentPage, setCurrentPage] = useState(pagination.page || 1);
  const itemsPerPage = pagination.limit || 10;

  const handleSelectPerson = (person) => {
  navigate("/detail", {state: {selectedPerson:person }})
}

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
      findReceivers({
        search: queryFromUrl,
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, queryFromUrl,currentPage, itemsPerPage])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/User edit.svg";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    const BACKEND_URL = "/api"; 
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    return cleanPath.startsWith("img/profile") 
      ? `${BACKEND_URL}/${cleanPath}` 
      : `${BACKEND_URL}/img/profile/${cleanPath}`;
  };

  const isHasMorePage = receivers.length === itemsPerPage;
  // const totalItems = filteredPeople.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedPeople = filteredPeople.slice(
  //   startIndex,
  //   startIndex + itemsPerPage,
  // );

  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>{
    if (isHasMorePage) setCurrentPage((prev) => prev + 1)
  }

  return (
    <section className="bg-white rounded-md p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-black">Find People</h3>
          <p className="text-sm text-gray-500 mt-1">
            Result Found For {queryFromUrl || "Everyone"}
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
          <div className="text-center py-10 text-gray-500">Loading Data...</div>
        ) : (
          <>
            <table className="w-full min-w-lg md:min-w-full border-spacing-y-0">
              <tbody>
                {receivers.map((person, index) => (
                  <tr
                    key={person.id}
                    onClick={() => handleSelectPerson(person)}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"} transition-colors hover:bg-blue-50`}
                  >
                    <td className="py-2 px-3 md:py-3 md:px-4 w-12 md:w-16">
                      <img
                        src={getImageUrl(person.picture)}
                        alt={person.receiver}
                        className=" w-10 h-10 md:w-12 md:h-12 rounded-sm object-cover"
                      />
                    </td>
                    <td className="py-2 px-3 md:py-3 md:px-4 whitespace-nowrap">
                      <div
                        className="py-3 px-4 text-center text-sm md:text-base font-medium text-black"
                      >
                        {person.receiver}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs md:text-sm text-gray-500">
                      {person.phone}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <img
                          src="/Star.svg"
                          alt="favorit"
                          className="w-5 h-5 opacity-60"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {receivers.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                Data tidak ditemukan
              </div>
            )}
          </>
        )}
      </div>

      {receivers.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 w-full text-sm text-gray-500 pt-4 border-t border-gray-100 gap-4">
          <div className="font-medium">
            Show {currentPage} History of {receivers.length} History
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1 || isLoading}
              className="px-2 py-1 font-medium hover:text-[#4A3AFF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>


            <button className="w-8 h-8 flex items-center justify-center rounded-md font-medium transition-all text-[#4A3AFF] bg-blu">
              {currentPage}
            </button>
            {/* {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-medium transition-all ${
                  currentPage === num
                    ? "text-[#4A3AFF] font-bold bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))} */}

            <button
              onClick={handleNext}
              disabled={!isHasMorePage || isLoading}
              className="px-2 py-1 font-medium text-black hover:text-[#4A3AFF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default FindPeople;

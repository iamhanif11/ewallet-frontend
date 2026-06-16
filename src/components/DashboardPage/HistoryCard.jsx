import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { fetchTransactionHistory } from "../../redux/slices/transactionSlice";
import { Link } from "react-router";

const paymentOptions = [
  { id: 1, name: "Bank Rakyat Indonesia", logo: "/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg" },
  { id: 2, name: "Dana", logo: "/Logo DANA (PNG-240p) - FileVector69 1.svg" },
  { id: 3, name: "Bank Central Asia", logo: "/Bank BCA Logo (SVG-240p) - FileVector69 1.svg" },
  { id: 4, name: "Gopay", logo: "/Logo GoPay (SVG-240p) - FileVector69 1.svg" },
  { id: 5, name: "Ovo", logo: "/ovo.svg" },
];

function HistoryCard() {
  const dispatch = useDispatch();
  

  const { histories: rawHistories, historyStatus } = useSelector((state) => state.transaction);
  const histories = rawHistories || [];
  const isLoading = historyStatus === "loading";

  useEffect(() => {
    dispatch(fetchTransactionHistory({ page: 1, limit: 6 }));
  }, [dispatch]);

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
    <div className="bg-white p-6 border flex flex-col border-gray-200 rounded-xs font-montserrat w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold">Transaction History</h2>
        
        <Link to="/history" className="text-blue-600 text-xs font-medium hover:underline">
          See All
        </Link>
      </div>

      <div className="flex flex-col gap-5 flex-1">
        {isLoading && histories.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 opacity-40">
            <p className="text-sm">Memuat riwayat...</p>
          </div>
        ) : histories.length > 0 ? (
          histories.slice(0, 6).map((item, index) => {
            
            const isExpense = item.type_transaction === 'expense';
            const amountColor = isExpense ? 'text-red-500' : 'text-green-500';
            const sign = isExpense ? '- ' : '+ ';


            const paymentData = paymentOptions.find(option => option.id === Number(item.payment_method_id));
            const displayName = item.fullname ? item.fullname : "Top Up Balance";
            const displayType = isExpense ? "Transfer" : "Top Up";

            let displayPicture;
            if (isExpense) {
              displayPicture = item.picture ? getImageURL(item.picture) : "/User edit.svg";
            } else {
              displayPicture = paymentData ? paymentData.logo : "/Upload-default.svg";
            }

            return (
              <div key={item.id || index} className="history flex items-center justify-between">
                <div className="flex items-center gap-4">
                  
                  <img 
                    src={displayPicture} 
                    alt={displayName} 
                    className="w-10 h-10 rounded-full object-contain" 
                  />
                  <div className="status flex flex-col">
                    
                    <h3 className="font-semibold">{displayName}</h3>
                    <p className="text-sm text-gray-500">{displayType}</p>
                  </div>
                </div>

                
                <h3 className={`font-semibold ${amountColor}`}>
                  {sign}{formatRupiah(item.amount)}
                </h3>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 opacity-40">
            <p className="text-sm">No Transaction Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryCard;
import { useEffect, useState } from "react";
import PaymentMethod from "../components/atoms/PaymentOption";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import Menu from "../components/DashboardPage/Menu";
// import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { topUpBalance } from "../redux/slices/transactionSlice";
import { useNavigate } from "react-router";
import { fetchUserProfile } from "../redux/slices/usersSlice";
import { useAuth } from "../hooks/useAuth";


function TopUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {currentUser} = useAuth

  const {topUpStatus} = useSelector((state) => state.transaction)
  const {profileData} = useSelector((state) => state.users)
  // const [previewImage, setPreviewImage] = useState(null)

  const [amount, setAmount] = useState("")
  const [paymentMethodId, setPaymentMethodId] = useState(1)

  useEffect(() => {
    if (!profileData) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, profileData])

  const serviceFee = 2500
  const taxRate = 0.11

  const nominalTopUp = Number(amount) || 0
  const tax = nominalTopUp > 0 ? serviceFee * taxRate : 0;
  const totalCharge = nominalTopUp > 0 ? nominalTopUp + serviceFee + tax : 0

 const handleSubmit = async () => {
    if (nominalTopUp <= 0) {
      toast.error("Masukkan nominal yang valid!")
      return;
    }

    try{
     await dispatch(topUpBalance({
      amount: nominalTopUp, 
      payment_method_id: Number(paymentMethodId)
     })).unwrap()

      toast.success(
        <div>
          <p className="font-bold">Top Up Berhasil</p>
          <p>Rp. {nominalTopUp.toLocaleString("id-ID")}</p>
        </div>
      )
      setAmount("")

      setTimeout(() => {
        navigate("/dashboard")
      },1500)
    } catch (error) {
      toast.error(error.message || "Terjadi Kesalahan")
    }
  }

   const getDisplayImage = (imagePath) => {
    if (!imagePath) return "/User edit.svg";

    if(imagePath.startsWith("blob")) return imagePath

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;

    const BACKEND_URL = "/api";
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath

    if (cleanPath.startsWith("img/profile")){
      return `${BACKEND_URL}/${cleanPath}`
    } else {
      return `${BACKEND_URL}/img/profile/${cleanPath}`
    }
  };

  const displayLabel = profileData?.fullname || currentUser?.fullname || profileData?.email || currentUser?.email || "User Account";
  const rawPicture = profileData?.picture || currentUser?.picture;
  const displayPhone = profileData?.phone || currentUser?.phone || "-";

  return (
    <>
      <div>
        <DashboardHeader/>

        <div className="flex gap-8 p-4 md:py-0 md:px-8 flex-col md:flex-row">
          <Menu />
          <div className="flex flex-col">
            <div className="flex gap-2 font-bold p-4 ">
              <img src="/Upload.svg" alt="icon-upload" />
              <h2>Top Up Account</h2>
            </div>
            <div className="mb-8 border border-gray-200 rounded-xs p-4">
              <h3 className="text-lg font-bold mb-4">People Information</h3>

              <div className="flex items-center gap-4 bg-[#E8E8E84D] p-4  border border-gray-100">
                <img
                  src={getDisplayImage(rawPicture)}
                  alt="photo-profile"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-md">{displayLabel}</p>
                  <p className="text-sm text-gray-500 mb-1">{displayPhone}</p>
                  <div className="flex items-center gap-2 bg-primary text-white text-xs px-3 py-1 rounded-lg w-fit">
                    <img src="/badge.svg" alt="verified" className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <img
                    src="/Star.svg"
                    alt="favorite"
                    className="w-6 h-6 opacity-40"
                  />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-md font-bold">Amount</h3>
              <p className="text-sm text-gray-500 mb-4">
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <img
                    src="/money.png"
                    alt="icon-money"
                    className="w-8 h-8 opacity-50"
                  />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Nominal Transfer"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-md text-sm focus:outline-none  placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="border border-gray-200 rounded-xs p-4" >
              <PaymentMethod selectedMethod={paymentMethodId} onChange={setPaymentMethodId}/>
            </div>
          </div>
          <div>
             <section className="payment-section border border-gray-200 rounded-xs p-4 md:mt-14 md:w-sm">
              <h3 className="font-bold mb-4">Payment</h3>

              <div className="summary-item font-medium text-sm flex justify-between mb-2">
                <p>Order</p>
                <p>Rp {nominalTopUp.toLocaleString("id-ID")}</p>
              </div>
              <div className="summary-item font-medium text-sm flex justify-between mb-2">
                <p>Service Fee</p>
                <p>Rp {serviceFee.toLocaleString("id-ID")}</p>
              </div>
              <div className="summary-item font-medium text-sm flex justify-between mb-2">
                <p>Tax</p>
                <p>Rp {tax.toLocaleString("id-ID")}</p>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item font-medium text-sm flex justify-between mb-2 summary-total border-t-2 border-gray-400 pt-2">
                <p>Sub Total</p>
                <p>Rp {totalCharge.toLocaleString("id-ID")}</p>
              </div>

              <div className="flex justify-between font-medium text-sm mb-4">
                <p>Balance Entry</p>
                <p>Rp {nominalTopUp.toLocaleString("id-ID")}</p>
              </div>

             <button
                onClick={handleSubmit}
                disabled={nominalTopUp <= 0 || topUpStatus==="loading"}
                className={`w-full p-3 rounded-md text-sm font-bold transition-all shadow-md 
                  ${nominalTopUp > 0 && topUpStatus !=="loading"
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {topUpStatus === "loading" ? "loading..." : "Submit Payment"}
              </button>
            </section>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default TopUp;

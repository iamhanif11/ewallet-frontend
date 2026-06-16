import DetailTransfer from "../components/DashboardPage/DetailTransfer";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import Menu from "../components/DashboardPage/Menu";
import TransferMoney from "../components/DashboardPage/TransferMoney";
import { useState,useEffect } from "react";
import TransferSubmit from "./TransferSubmit";
import { useLocation,useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { transferFunds } from "../redux/slices/transactionSlice";
import { checkPin } from "../redux/slices/usersSlice";


function TransferDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recipient = location.state?.selectedPerson;


  const [transferData, setTransferData] = useState({amount: 0, note: ""})
  
  const [activeModal, setActiveModal] = useState(null);
 
  useEffect(() => {
    if (!recipient){
      navigate("/transfer")
    }
  }, [recipient, navigate])

  const handleModal = (amount, note) => {
    setTransferData({amount: Number(amount), note})
    setActiveModal("pin")
  }

  const closeModal = () => setActiveModal(null);

  const handlePinSubmit = async (pin) => {
    try {
      await dispatch(checkPin({pin:pin})).unwrap()
      const payload = {
        receiver_id: recipient.id,
        amount: transferData.amount,
        notes: transferData.note,
      }
      
      await dispatch(transferFunds(payload)).unwrap();
      setActiveModal("success")
    } catch(error) {
      console.log("Transfer errro", error)
      setActiveModal("failed")

      const errorMessage= typeof error === 'string' ? error : (error.message || "Transfer Gagal");
      toast.error(errorMessage)
      
    }
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
    <div className="relative min-h-screen overflow-hidden">
      <div className={`${activeModal ? "blur-sm" : ""}`}>
        <DashboardHeader />
        <div className="flex">
          <Menu />
          <div className="w-full px-8 py-4">
            <TransferMoney currentStep={2} />
            <DetailTransfer 
            recipient = {recipient}
            amount={transferData.amount}
            onConfirm={handleModal} />
          </div>
        </div>
      </div>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            
            <TransferSubmit
              type={activeModal}
              onPinSubmit={handlePinSubmit}
              onClose={closeModal}
              setType={setActiveModal}

              transferData={{
                amount: transferData.amount,
                name: recipient?.receiver || recipient?.name, 
                img: getImageURL(recipient?.picture || recipient?.img || "/User edit.svg") 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferDetail;

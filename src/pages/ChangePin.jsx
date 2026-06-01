import { useState } from "react";
import toast from "react-hot-toast";
import EnterPinAtom from "../components/atoms/EnterPinAtom";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import Menu from "../components/DashboardPage/Menu";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPin } from "../redux/slices/usersSlice";

function ChangePin() {
  
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  // const { currentUser, handleCreatePin } = useAuth();
  const dispatch = useDispatch()
  const { updateStatus} = useSelector((state) => state.users)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullPin = pin.join("");

    
    if (fullPin.length < 6) {
      return toast.error("PIN harus lengkap 6 angka!");
    }

    try {
      await dispatch(updateUserPin({pin: fullPin})).unwrap()
      
      toast.success("PIN berhasil diperbarui!");
      setPin(["", "", "", "", "", ""]); 
    } catch (err) {
      toast.error(err.message || "Gagal memperbarui PIN");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <DashboardHeader />

      <div className="flex gap-2 p-4 md:py-4 md:px-12 flex-col md:flex-row items-start">
        <Menu />

        <div  className="flex flex-col w-full max-w-5xl">
  
          <Link to="/edit-profile" 
           className="flex gap-3 py-4 items-center mb-6">
            <img src="/2 User.png" alt="icon-profile" className="w-5 h-5" />
            <h2 className="text-xl">Profile</h2>
          </Link>

          
          <div className="bg-white border border-gray-100 rounded-xl p-12 shadow-sm flex flex-col items-center w-full max-w-3xl min-h-450px justify-center self-center md:self-start">
            
            <div className="text-center mb-10">
              <h3  className="font-bold text-2xl mb-2">Change Pin 👋</h3>
              <p className="text-gray-400 text-sm max-w-250 mx-auto">
                Please save your pin because this is very important for your security.
              </p>
            </div>

    
            <div className="w-full flex justify-center mb-12">
        
              <EnterPinAtom pin={pin} setPin={setPin} />
            </div>

        
            <button
              onClick={handleSubmit}
              disabled = {updateStatus === "loading" || pin.join("").length < 6} 
              className={`w-full max-w-sm font-semibold py-4 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer
                ${
                  updateStatus === "loading" || pin.join("").length < 6
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                }`}
            >
              {updateStatus === "loading" ? "loading..." : "Submit"}
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default ChangePin;
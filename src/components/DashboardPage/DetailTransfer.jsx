import { useState } from "react";
// import { set } from "react-hook-form";
import toast from "react-hot-toast";


function DetailTransfer({recipient, onConfirm}) {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  const handleContinue = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Masukkan nominal transfer terlebih dahulu")
      return
    }
    onConfirm(Number(amount), note)
  }

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
    <section className="bg-white rounded-xs p-6  border border-gray-100 ">
      
    
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">People Information</h3>

        <div className="flex items-center gap-4 bg-[#E8E8E84D] p-4  border border-gray-100">
          <img 
            src={getImageUrl(recipient.picture || recipient?.img)} 
            alt="photo-profile" 
            className="w-16 h-16 rounded-md object-cover" 
          />
          <div className="flex-1">
            <p className="font-bold text-md">{recipient?.receiver||recipient?.name}</p>
            <p className="text-sm text-gray-500 mb-1">{recipient?.phone}</p>
            <div className="flex items-center gap-2 bg-primary text-white text-xs px-3 py-1 rounded-lg w-fit">
              <img src="/badge.svg" alt="verified" className="w-3 h-3" />
              <span>Verified</span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <img src="/Star.svg" alt="favorite" className="w-6 h-6 opacity-40" />
          </button>
        </div>
      </div>


      <div className="mb-8">
        <h3 className="text-md font-bold">Amount</h3>
        <p className="text-sm text-gray-500 mb-4">
          Type the amount you want to transfer and then press continue to the next steps.
        </p>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <img src="/money.png" alt="icon-money" className="w-8 h-8 opacity-50" />
          </div>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount (e.target.value)}
            placeholder="Enter Nominal Transfer" 
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-md text-sm focus:outline-none  placeholder:text-gray-400"
          />
        </div>
      </div>

    
      <div className="mb-10">
        <h3 className="text-md font-bold">Notes</h3>
        <p className="text-sm text-gray-500 mb-4">
          You can add some notes for this transfer such as payment coffee or something
        </p>
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={255}
          placeholder="Enter Some Notes"
          className="w-full p-4 bg-white border border-gray-200 rounded-md text-sm focus:outline-none resize-none placeholder:text-gray-400"
        ></textarea>
      </div>


      <button 
      type="button"
      onClick={handleContinue}
      className="w-full bg-primary hover:bg-blue-700 text-white  py-4 rounded-md">
        Submit & Transfer
      </button>
      
    </section>
  );
}

export default DetailTransfer;
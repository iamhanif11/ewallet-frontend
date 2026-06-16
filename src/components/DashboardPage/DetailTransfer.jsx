import { useState } from "react";
// import { set } from "react-hook-form";
import toast from "react-hot-toast";

function DetailTransfer({ recipient, onConfirm }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleContinue = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Masukkan nominal transfer terlebih dahulu");
      return;
    }
    onConfirm(Number(amount), note);
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
    <section className="rounded-xs border border-gray-100 bg-white p-6">
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-bold">People Information</h3>

        <div className="flex items-center gap-4 border border-gray-100 bg-[#E8E8E84D] p-4">
          <img
            src={getImageURL (recipient.picture || recipient?.img)}
            alt="photo-profile"
            className="h-16 w-16 rounded-md object-cover"
          />
          <div className="flex-1">
            <p className="text-md font-bold">
              {recipient?.receiver || recipient?.name}
            </p>
            <p className="mb-1 text-sm text-gray-500">{recipient?.phone}</p>
            <div className="bg-primary flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-xs text-white">
              <img src="/badge.svg" alt="verified" className="h-3 w-3" />
              <span>Verified</span>
            </div>
          </div>
          <button className="rounded-full p-2 transition-colors hover:bg-gray-200">
            <img
              src="/Star.svg"
              alt="favorite"
              className="h-6 w-6 opacity-40"
            />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-md font-bold">Amount</h3>
        <p className="mb-4 text-sm text-gray-500">
          Type the amount you want to transfer and then press continue to the
          next steps.
        </p>
        <div className="group relative">
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <img
              src="/money.png"
              alt="icon-money"
              className="h-8 w-8 opacity-50"
            />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Nominal Transfer"
            className="w-full rounded-md border border-gray-200 bg-white py-4 pr-4 pl-12 text-sm placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-md font-bold">Notes</h3>
        <p className="mb-4 text-sm text-gray-500">
          You can add some notes for this transfer such as payment coffee or
          something
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={255}
          placeholder="Enter Some Notes"
          className="w-full resize-none rounded-md border border-gray-200 bg-white p-4 text-sm placeholder:text-gray-400 focus:outline-none"
        ></textarea>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="bg-primary w-full rounded-md py-4 text-white hover:bg-blue-700"
      >
        Submit & Transfer
      </button>
    </section>
  );
}

export default DetailTransfer;

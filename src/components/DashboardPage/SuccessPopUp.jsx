import { useNavigate } from "react-router";


function SuccessPopUp(onDone) {
  const navigate = useNavigate()

  const handleGoToDashboard = () => {
    navigate("/dashboard")
  }
  return (
    <section className="p-8">
      <p className="font-semibold">Transfer to </p>

      <div className="flex flex-col justify-center items-center">
        <img src="/cs.png" alt="succeSs" className="w-2xs text" />
        <p className="font-semibold text-2xl text-center">
          Yeay Transfer <span className="text-green-500">Success</span>{" "}
        </p>
        <p className="text-sm text-gray-400 text-center">Thank you for using this application for your financial</p>
      </div>

      <button 
        onClick={handleGoToDashboard}
      className="btn-submit w-full border border-blue-600 p-2 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-montserrat mt-4">
        Done
      </button>

      <button
      onClick={onDone}
      className="btn-submit w-full border border-blue-600 p-2 rounded-md bg-white hover:bg-gray-100 cursor-pointer text-primary font-montserrat mt-4">
        Transfer Again
      </button>
    </section>
  );
}

export default SuccessPopUp;

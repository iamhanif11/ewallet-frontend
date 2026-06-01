import EnterPin from "../components/DashboardPage/EnterPin";
import FailPopUp from "../components/DashboardPage/FailPopUp";
import SuccessPopUp from "../components/DashboardPage/SuccessPopUp";


function TransferSubmit({ type, onClose, setType, onPinSubmit}) {
  const handleConfirm = (enteredPin) => {
    if (onPinSubmit) {
      onPinSubmit(enteredPin)
  };
}
  if (!type) return null;
  
  return (

    <div className="bg-white flex items-center justify-center p-4 rounded-2xl">
      <div
        className="absolute inset-0  "
        onClick={onClose}
      />

      <div className="relative z-10 w-full">
      
      {type === 'pin' &&(
        <EnterPin
        onConfirm={handleConfirm}
        onClose={onClose}
        />
      )}

      {type == 'success' && (
        <SuccessPopUp
        onDone={onClose}
        />
      )}

      {type == 'failed' &&(
        <FailPopUp
        onRetry={() => setType("pin")}
        onClose={onClose}
        />
      )}
      </div>
    </div>

);
}

export default TransferSubmit;

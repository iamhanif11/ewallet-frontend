import { useState } from "react";
import toast from "react-hot-toast";
import InputPassword from "../components/atoms/InputPasswd";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import Menu from "../components/DashboardPage/Menu";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../redux/slices/usersSlice";

function ChangePassword() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    const inputName = e.target.name || e.target.id;
    setFormData((prev) => ({ ...prev, [inputName]: e.target.value }));
  };
  




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      return toast.error("Password baru minimal 6 karakter!");
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Konfirmasi password tidak cocok!");
    }

    const payload = {
      current_password: formData.oldPassword,
      new_password: formData.newPassword
    }

    setIsLoading(true);
    try {
      await dispatch(updateUserPassword(payload)).unwrap();
      toast.success("Password berhasil diperbarui")
      // Reset form
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      const errorMassage = typeof error === 'string'? error : (error.message)
      toast.error(errorMassage);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"> 
      <DashboardHeader />

      <div className="flex gap-8 p-4 md:py-8 md:px-12 flex-col md:flex-row items-start">
        <Menu />

        <div className="flex flex-col w-full max-w-5xl"> 
          
          
          <div className="flex gap-3 py-4 items-center mb-6">
            
            <img src="/2 User.png" alt="icon-profile" className="w-6 h-6 object-contain" />
            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
          </div>

          
          <form 
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 rounded-xl p-10 shadow-sm flex flex-col gap-8 w-full max-w-3xl" // Menyesuaikan padding, border, shadow, dan max-w form
          >
            <h3 className="font-bold text-xl text-gray-900 mb-2">Change Password</h3>


            <InputPassword
              label="Existing Password" 
              placeholder="Enter Your Existing Password"
              id="oldPassword" 
              name= "oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />

            
            <InputPassword
              label="New Password"
              placeholder="Enter Your New Password"
              id="newPassword"
              name= "newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            
            <InputPassword
              label="Confirm New Password"
              placeholder="Re-Type Your New Password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-lg transition-colors duration-200 mt-6 shadow-md ${
                isLoading 
                ? "bg-blue-400 text-gray-100 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              }`}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>


        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
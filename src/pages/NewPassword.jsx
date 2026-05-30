import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, useLocation, Link } from "react-router"; // Gunakan useLocation
import Logo from "../components/atoms/Logo";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";


const resetSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 6 karakter",
  }),
  confirmPassword: Joi.any().equal(Joi.ref("password")).required().messages({
    "any.only": "Konfirmasi password tidak cocok",
  }),
});

function NewPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const { handleNewPassword, isLoading } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword]= useState(false)

    const email = location.state?.email

    useEffect(() => {
        if (!email) {
            toast.error("Sesi tidak valid")
            navigate("/forgot-password")
        }
    }, [email, navigate])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(resetSchema),
    });

    const onSubmit = async (data) => {
        try{
            await handleNewPassword(email, data.password, data.confirmPassword);

            toast.success("Password berhasil diubah!")
            navigate("/login")
        } catch (error){
            const errorMessage = typeof error === 'string' ? error : (error.message)
            toast.error(errorMessage)
        }
    }
  return (
    <main className="flex w-full min-h-screen items-center justify-center p-10 md:bg-blue-600">
      <section className="md:border md:border-white md:bg-white flex flex-col gap-4 md:p-8 md:rounded-2xl max-w-md w-full">
        <Logo textColor={`text-blue-600`} />

        <div className="mb-2">
            <p className="font-bold text-lg">Create New Password 👋</p>
            <p className="text-sm text-gray-500">
              Your new password must be different from previous used passwords.
            </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className="form-group mb-3">
            <label htmlFor="password" className="font-montserrat font-medium mb-2 block">
              New Password
            </label>
            <div className={`input-box flex items-center gap-3 border p-2 rounded-sm focus-within:border-blue-600 ${errors.password ? "border-red-500" : "border-gray-600"}`}>
              <span className="icon">
                <img src="/Password.png" alt="icon_password" />
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                id="password"
                className="flex-1 w-full font-montserrat text-xs outline-none"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                <img
                  src="/eye.png"
                  alt="icon_eye"
                  className={`w-5 h-5 object-contain focus:outline-none ${showPassword ? "opacity-100" : "opacity-40"}`}
                />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] mt-1 mb-2">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="confirmPassword" className="font-montserrat font-medium mb-2 block">
              Confirm New Password
            </label>
            <div className={`input-box flex items-center gap-3 border p-2 rounded-sm focus-within:border-blue-600 ${errors.confirmPassword ? "border-red-500" : "border-gray-600"}`}>
              <span className="icon">
                <img src="/Password.png" alt="icon_password" />
              </span>
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter New Password Again"
                id="confirmPassword"
                className="flex-1 w-full font-montserrat text-xs outline-none"
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">
                <img
                  src="/eye.png"
                  alt="icon_eye"
                  className={`w-5 h-5 object-contain focus:outline-none ${showConfirmPassword ? "opacity-100" : "opacity-40"}`}
                />
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px] mt-1 mb-2">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="block w-full border border-blue-600 p-3 mt-4 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-center text-white font-montserrat transition-colors"
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-2">
            <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 font-medium">
            Back to Login
            </Link>
        </div>
      </section>
    </main>
  )
}

export default NewPassword
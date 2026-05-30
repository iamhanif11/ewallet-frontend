import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router";
import Logo from "../components/atoms/Logo";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";


const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email tidak boleh kosong",
      "string.email": "Format email salah",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 6 karakter",
  }),
  confirmPassword: Joi.any().equal(Joi.ref("password")).required().messages({
    "any.only": "Konfirmasi password tidak cocok",
  }),
});

function Register() {
  const navigate = useNavigate();

  const { handleRegister, isLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = async(data) => {
    try {
      // handleRegister(data.email, data.password)
      await handleRegister(data.email, data.password);

      toast.success("Registrasi Berhasil! Silahkan Login.")
      navigate("/login")
    } catch (error){
      const errorMessage = typeof error === 'string'? error :(error.message || "Register Gagal");
      setError("email", {message: errorMessage})
      toast.error(errorMessage)
    }
  };
  return (
    <main className=" w-full min-h-screen bg-blue-600 flex font-montserrat">
      <section
        className="left w-full md:w-1/2 flex justify-center px-8 md:px-32 py-10 md:rounded-r-4xl bg-white
        flex-col gap-2"
      >
        <Logo textColor={`text-blue-600`} />

        <div className="desc">
          <h1 className="font-montserrat text-lg font-medium">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h1>
          <p className="font-montserrat text-sm text-gray-700">
            Transfering money is eassier than ever, you can access E-wallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
        </div>

        <div className="social-login flex md:flex-col justify-between gap-4">
          <button className="btn-google flex justify-center items-center gap-2 border border-gray-600 py-2 px-4 rounded-full hover:bg-gray-200 cursor-pointer flex-1">
            <img
              src="/flat-color-icons_google.png"
              alt="icon google"
              className="text-center"
            />
            <span className="hidden md:block">Sign In With Google</span>
          </button>

          <button className="btn-fb btn-google flex justify-center items-center gap-2 border border-gray-600 py-2 px-4 rounded-full hover:bg-gray-200 cursor-pointer flex-1 ">
            <img src="/bx_bxl-facebook-circle.png" alt="icon FB" />
            <span className="hidden md:block">Sign In With Facebook</span>
          </button>
        </div>

        <div className="divider flex justify-center items-center gap-4 mb-2">
          <hr className="w-full border border-gray-500 flex-1 " />
          <span className="font-montserrat text-gray-500">Or</span>
          <hr className="w-full border border-gray-500 flex-1 " />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group mb-3">
            <label htmlFor="email" className="font-montserrat font-medium">
              E-mail
            </label>
            <div className="input-box flex items-center gap-3 border p-2 border-gray-600 rounded-sm focus-within:border-blue-600">
              <span className="icon">
                <img src="/Vector.svg" alt="icon_email" />
              </span>
              <input
                {...register("email")}
                type="text"
                id="email"
                className="flex-1 font-montserrat text-xs outline-none"
                placeholder="Enter Your Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="font-montserrat font-medium">
              Password
            </label>
            <div
              className={`input-box flex items-center gap-3 border p-2 border-gray-600 rounded-sm focus-within:border-blue-600 ${errors.password ? "border-red-500" : "border-gray-600"}`}
            >
              <span className="icon">
                <img src="/Password.png" alt="icon_password" />
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                id="password"
                className="flex-1 w-full font-montserrat text-xs outline-none"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                <img
                  src="/eye.png"
                  alt="icon_eyeslash"
                  className={`w-5 h-5 object-contain focus:outline-none ${showPassword ? "opacity-100" : "opacity-40"}`}
                />
              </span>
            </div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="font-montserrat font-medium">
              Confirm Password
            </label>
            <div
              className={`input-box flex items-center gap-3 border p-2 border-gray-600 rounded-sm focus-within:border-blue-600 ${errors.confirmPassword ? "border-red-500" : "border-gray-600"}`}
            >
              <span className="icon">
                <img src="/Password.png" alt="icon_password" />
              </span>
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Your Password Again"
                id="confirmPassword"
                className="flex-1 w-full font-montserrat text-xs outline-none"
              />
              <span onClick={() => setShowConfirmPassword (!showConfirmPassword)} className="cursor-pointer">
                <img
                  src="/eye.png"
                  alt="icon_eyeslash"
                  className={`w-5 h-5 object-contain focus:outline-none  ${showConfirmPassword ? "opacity-100" : "opacity-40"} `}
                />
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button 
          type="submit"
          disabled={isLoading}
          className={`btn-submit border w-full p-2 rounded-md font-montserrat mt-4 ${
            isLoading
              ? "bg-blue-400 border-blue-400 text-gray-200 cursor-not-allowed"
              : "border-blue-600 bg-blue-600 text-white"
          }`}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="register text-center mt-4">
          <p className="font-montserrat text-gray-600">
            Have An Account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </section>

      <aside className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center relative overflow-hidden flex-1/2">
        <img src="/dompet_tangan.png" alt="illustration" />
      </aside>
    </main>
  );
}

export default Register;

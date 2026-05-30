import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router";
import Logo from "../components/atoms/Logo";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const forgotSchema = Joi.object({
  email: Joi.string().email({tlds: {allow: false}}).required().messages({
    "string.empty": "Email tidak boleh kosong",
    "string.email": "Format email salah"
  }),
});

function ForgotPassword() {
  const navigate = useNavigate()
  const {handleCheckEmailForgot, isLoading} = useAuth()

  const{
    register,
    handleSubmit, 
    setError,
    formState: {errors},
  } = useForm({
    resolver: joiResolver(forgotSchema),
  })

  const onSubmit = async(data) => {
    try {
      await handleCheckEmailForgot(data.email)

      toast.success("Silahkan buat password baru")

      navigate("/new-password", {state: {email: data.email}})
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error :(error.message)
      setError("email", {message: errorMessage})
      toast.error(errorMessage)
    }
  }
  
  return (
    <main className="flex w-full min-h-screen items-center justify-center p-10 md:bg-primary">
      <section className="md:border md:border-white md:bg-white flex flex-col gap-4 md:p-8 md:rounded-2xl ">
        <Logo textColor={`text-blue-600`} />

        <p>Fill Out Form Correctly 👋</p>
        <p>We will send new password to your email</p>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group mb-3">
            <label htmlFor="email" className="font-montserrat font-medium mb-2">
              E-mail
            </label>
            <div className="input-box flex items-center gap-3 border p-2 border-gray-600 rounded-sm focus-within:border-blue-600 mb-4">
              <span className="icon">
                <img src="/Vector.svg" alt="icon_email" />
              </span>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="flex-1 font-montserrat text-xs outline-none"
                placeholder="Enter Your Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] mb-2">{errors.email.message}</p>
            )}

            <button 
            type="submit"
            disabled={isLoading}
            className="block w-full border border-blue-600 p-2 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-center text-white font-montserrat">
              {isLoading ? "Loading..." : "Verifikasi Email"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;

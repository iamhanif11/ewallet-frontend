import { useSelector, useDispatch } from "react-redux";
import {loginUser,registerUser, logoutUser, createPin, verifyEmail, resetPassword} from '../redux/slices/authSlice'
import NewPassword from "../pages/NewPassword";

export const useAuth = () => {
    const dispatch = useDispatch();

    const { isLoggedIn, currentUser, status } = useSelector((state) => state.auth)
    const isLoading = status === 'loading';

    const handleRegister = async(email, password) => {
        return await dispatch(registerUser({email, password})).unwrap();
    }

    const handleLogin = async(email, password) => {
        return await dispatch(loginUser({ email, password })).unwrap();
    }

    const handleLogout = async() => {
        return await dispatch(logoutUser()).unwrap();
    }

    const handleCheckEmailForgot = async(email) => {
        return await dispatch(verifyEmail({email})).unwrap();
    }

    const handleNewPassword = async(email, newPassword, confirmPassword) => {
        return await dispatch(resetPassword({ 
            email: email, 
            new_password: newPassword,
            confirm_password: confirmPassword
        })).unwrap();
    }

    const handleCreatePin = async(pin) => {
        if (!currentUser) throw new Error("Sesi tidak ditemukan")
        return await dispatch(createPin({pin})).unwrap();
    }

    return{
        isLoggedIn,
        currentUser,
        isLoading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleCheckEmailForgot,
        handleNewPassword,
        handleCreatePin
    }
}


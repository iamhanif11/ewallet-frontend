import { useSelector, useDispatch } from "react-redux";
import {login, logout, updateSessionPin} from '../redux/slices/authSlice'
import { addPinToUser, register as registerUser, resetUserPassword, setCurrentUserEmail, topUp, transferOut } from "../redux/slices/usersSlice";




export const useAuth = () => {
    const dispatch = useDispatch();
    
    const {registeredUsers} = useSelector((state) => state.users)
    const {isLoggedIn, currentUser} = useSelector((state) => state.auth)


    const handleRegister = (email, password, fullname) => {
        const isDuplicate = registeredUsers.find(u => u.email === email)
        if (isDuplicate) {
            throw new Error("Email sudah terdaftar")
        }
        dispatch (registerUser({email, password, fullname}));

    };

    const handleLogin = (email, password) => {
        const foundUser =registeredUsers.find(u => u.email === email)

        if (!foundUser) {
            throw new Error("Email belum terdaftar")
        }

        if(foundUser.password !== password) {
            throw new Error("Password Salah")
        }

        dispatch(login(foundUser))
        dispatch(setCurrentUserEmail(email))
        localStorage.setItem('currentUserEmail', email)
    }

    const handleTopUp = (amount) => {
        if (!currentUser) throw new Error("Sesi anda salah!")
        
        dispatch(topUp({ email: currentUser.email, amount }))
    }

    const handleTransfer = ({amount, recipientName, recipientImage}) => {
        if (!currentUser) throw new Error ("Sesi anda salah")

        const userTrx = registeredUsers.find(u => u.email === currentUser?.email)

        if (userTrx.balance < Number (amount)) {
            throw new Error ("Saldo tidak mencukupi")
        }

        dispatch(transferOut({ 
            email: currentUser.email, 
            amount,
            recipientName,
            recipientImage}))
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleCreatePin = (pin) => {
        if(!currentUser){
            throw new Error ("Error")
        }

        dispatch(addPinToUser({email:currentUser.email, pin}))

        dispatch(updateSessionPin(pin))
    }

    const handleCheckEmailForgot = (email) => {
        const foundUser = registeredUsers.find(u => u.email === email)
        if (!foundUser) {
            throw new Error ("Email tidak terdaftar")
        }

        return true
    }

    const handleNewPassword = (email, newPassword) => {
        dispatch(resetUserPassword({email, newPassword}));
    }

    return { registeredUsers, isLoggedIn, currentUser, handleRegister, handleLogin, handleLogout, handleCreatePin, handleCheckEmailForgot, handleNewPassword, handleTopUp, handleTransfer};
}

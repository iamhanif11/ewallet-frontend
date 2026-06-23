import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"


const ProtectedRoute = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const token = localStorage.getItem("token")

    if (!isLoggedIn && !token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}

export default ProtectedRoute
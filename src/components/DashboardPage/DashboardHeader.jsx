import { NavLink, useNavigate } from "react-router";
import Logo from "../atoms/Logo";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";


function DashboardHeader() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModelOpen] = useState(false)
  const{currentUser, handleLogout} = useAuth()
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const displayLabel = currentUser?.fullname || currentUser?.email|| "User"
  // const currentUserEmail = useSelector((state) => state.users.currentUserEmail)
  // const userFromStore = useSelector((state)=> state.users.registeredUsers.find((u)=> u.email === currentUserEmail))

  const onLogout = async () => {
    try{
      await handleLogout()
      toast.success("Berhasil Keluar dari akun")
      navigate("/login", {replace: true})
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : (error.message);
      toast.error(errorMessage);
      navigate("/login", {replace: true});
    }
  };

  const handleLogoutClick = () => {
    setIsModelOpen(true);
    setIsDropdownOpen(false);
  };
  
  return (
    <>
    <header className="relative py-4 px-8 md:px-20 flex justify-between items-center border-b border-gray-200 shadow-sm">
      <Logo textColor="text-primary" />

      <div
        className="profil flex gap-4 items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <p className="font-montserrat hidden md:block">{displayLabel}</p>
        <img src={currentUser?.picture || "/User edit.svg"} className="w-10" alt="photo-profil" />
        <img
          src="/down.svg"
          alt="dropdown"
          className={`${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-8 top-full mt-2 w-55 bg-white border border-gray-100 shadow-xl rounded-md p-2 z-50 ">
          <p className="font-semibold mt-4 md:hidden">Hello, {displayLabel}</p>
          <div className="md:hidden flex flex-col gap-1 border-b border-gray-200 pb-2 mb-2">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 p-3 text-black hover:bg-blue-600 hover:text-white rounded-md transition-colors group"
            >
              <img
                src="/dashboard-two (1).svg"
                alt="dashboard"
                className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>
            <NavLink
              to="/transfer"
              className="flex items-center gap-3 p-3 text-black hover:bg-blue-600 hover:text-white rounded-md transition-colors group"
            >
              <img
                src="/Send.svg"
                alt="transfer"
                className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-sm font-medium">Transfer</span>
            </NavLink>
            <NavLink
              to="/history"
              className="flex items-center gap-3 p-3 text-black hover:bg-blue-600 hover:text-white rounded-md transition-colors group"
            >
              <img
                src="/history.svg"
                alt="history"
                className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-sm font-medium">History</span>
            </NavLink>
            <NavLink
              to="/top-up"
              className="flex items-center gap-3 p-3 text-black hover:bg-blue-600 hover:text-white rounded-md transition-colors group"
            >
              <img
                src="/Upload-default.svg"
                alt="top Up"
                className="w-5 h-5 group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-sm font-medium">Top Up</span>
            </NavLink>

            <NavLink to="/edit-profile"
            className="flex items-center gap-3 p-3 text-black hover:bg-blue-600 hover:text-white rounded-md transition-colors group">
              <img
                src="/2 User.svg"
                alt="profile"
                className="group-hover:brightness-0 group-hover:invert"
              />
              <p>Profile</p>
            </NavLink>
            <button
              onClick={handleLogoutClick}
              className="exit flex items-center gap-4 p-3 text-left cursor-pointer rounded-md hover:bg-red-600 group hover:text-white"
            >
              <img
                src="/Icon.svg"
                alt="Exit"
                className="group-hover:brightness-0 group-hover:invert"
              />
              <p>Keluar</p>
            </button>
          </div>

          <NavLink to="/edit-profile"
          className="hidden md:flex items-center gap-3 w-full p-3 text-primary bg-white rounded-md mb-1 hover:bg-blue-700 hover:text-white transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <img src="/2 User.svg" className="invert" alt="user" />
            </div>
            <span className="text-sm font-medium">Profile</span>
          </NavLink>

          <button 
          onClick={handleLogoutClick}
          className="group hidden md:flex items-center gap-3 w-full p-3 text-red-500 hover:text-white bg-white hover:bg-red-600 rounded-md transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <img src="/Icon.svg" alt="logout" className="group-hover:brightness-0 group-hover:invert" />
            </div>
            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>
      )}
    </header>

   {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center transform transition-all">
            
          
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-montserrat">
              Konfirmasi Keluar
            </h3>
            <p className="text-sm text-gray-500 mb-6 font-montserrat">
              Apakah Anda yakin ingin keluar dari akun ini?
            </p>
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsModelOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium font-montserrat transition-colors cursor-pointer"
              >
                Tidak
              </button>
              
              <button
                onClick={onLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium font-montserrat transition-colors cursor-pointer"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardHeader;

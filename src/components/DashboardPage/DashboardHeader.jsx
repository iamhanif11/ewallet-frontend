import { NavLink, useNavigate } from "react-router";
import Logo from "../atoms/Logo";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

function DashboardHeader() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const { currentUser, handleLogout } = useAuth();

  const { profileData } = useSelector((state) => state.users);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const displayLabel =
    profileData?.fullname ||
    currentUser?.fullname ||
    profileData?.email ||
    currentUser?.email ||
    "User";

  const getImageURL = (imagePath) => {
    if (!imagePath) return "/User edit.svg";

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
      return imagePath;

    const BACKEND_URL = "/api";

    const fileName = imagePath.substring(imagePath.lastIndexOf("/") + 1);

    return `${BACKEND_URL}/img/profile/${fileName}`;
  };

  const rawPicture = profileData?.picture || currentUser?.picture;
  const displayPicture = getImageURL(rawPicture);

  const onLogout = async () => {
    try {
      await handleLogout();
      toast.success("Berhasil Keluar dari akun");
      navigate("/login", { replace: true });
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      toast.error(errorMessage);
      navigate("/login", { replace: true });
    }
  };

  const handleLogoutClick = () => {
    setIsModelOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header className="relative flex items-center justify-between border-b border-gray-200 px-8 py-4 shadow-sm md:px-20">
        <Logo textColor="text-primary" />

        <div
          className="profil flex cursor-pointer items-center gap-4"
          onClick={toggleDropdown}
        >
          <p className="font-montserrat hidden md:block">{displayLabel}</p>
          <img src={displayPicture} className="w-10" alt="photo-profil" />
          <img
            src="/down.svg"
            alt="dropdown"
            className={`${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full right-8 z-50 mt-2 w-55 rounded-md border border-gray-100 bg-white p-2 shadow-xl">
            <p className="mt-4 font-semibold md:hidden">
              Hello, {displayLabel}
            </p>
            <div className="mb-2 flex flex-col gap-1 border-b border-gray-200 pb-2 md:hidden">
              <NavLink
                to="/dashboard"
                className="group flex items-center gap-3 rounded-md p-3 text-black transition-colors hover:bg-blue-600 hover:text-white"
              >
                <img
                  src="/dashboard-two (1).svg"
                  alt="dashboard"
                  className="h-5 w-5 group-hover:brightness-0 group-hover:invert"
                />
                <span className="text-sm font-medium">Dashboard</span>
              </NavLink>
              <NavLink
                to="/transfer"
                className="group flex items-center gap-3 rounded-md p-3 text-black transition-colors hover:bg-blue-600 hover:text-white"
              >
                <img
                  src="/Send.svg"
                  alt="transfer"
                  className="h-5 w-5 group-hover:brightness-0 group-hover:invert"
                />
                <span className="text-sm font-medium">Transfer</span>
              </NavLink>
              <NavLink
                to="/history"
                className="group flex items-center gap-3 rounded-md p-3 text-black transition-colors hover:bg-blue-600 hover:text-white"
              >
                <img
                  src="/history.svg"
                  alt="history"
                  className="h-5 w-5 group-hover:brightness-0 group-hover:invert"
                />
                <span className="text-sm font-medium">History</span>
              </NavLink>
              <NavLink
                to="/top-up"
                className="group flex items-center gap-3 rounded-md p-3 text-black transition-colors hover:bg-blue-600 hover:text-white"
              >
                <img
                  src="/Upload-default.svg"
                  alt="top Up"
                  className="h-5 w-5 group-hover:brightness-0 group-hover:invert"
                />
                <span className="text-sm font-medium">Top Up</span>
              </NavLink>

              <NavLink
                to="/edit-profile"
                className="group flex items-center gap-3 rounded-md p-3 text-black transition-colors hover:bg-blue-600 hover:text-white"
              >
                <img
                  src="/2 User.svg"
                  alt="profile"
                  className="group-hover:brightness-0 group-hover:invert"
                />
                <p>Profile</p>
              </NavLink>
              <button
                onClick={handleLogoutClick}
                className="exit group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-red-600 hover:text-white"
              >
                <img
                  src="/Icon.svg"
                  alt="Exit"
                  className="group-hover:brightness-0 group-hover:invert"
                />
                <p>Keluar</p>
              </button>
            </div>

            <NavLink
              to="/edit-profile"
              className="text-primary mb-1 hidden w-full items-center gap-3 rounded-md bg-white p-3 transition-colors hover:bg-blue-700 hover:text-white md:flex"
            >
              <div className="flex h-5 w-5 items-center justify-center">
                <img src="/2 User.svg" className="invert" alt="user" />
              </div>
              <span className="text-sm font-medium">Profile</span>
            </NavLink>

            <button
              onClick={handleLogoutClick}
              className="group hidden w-full items-center gap-3 rounded-md bg-white p-3 text-red-500 transition-colors hover:bg-red-600 hover:text-white md:flex"
            >
              <div className="flex h-5 w-5 items-center justify-center">
                <img
                  src="/Icon.svg"
                  alt="logout"
                  className="group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <span className="text-sm font-medium">Keluar</span>
            </button>
          </div>
        )}
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm transform rounded-xl bg-white p-6 text-center shadow-lg transition-all">
            <h3 className="font-montserrat mb-2 text-lg font-bold text-gray-900">
              Konfirmasi Keluar
            </h3>
            <p className="font-montserrat mb-6 text-sm text-gray-500">
              Apakah Anda yakin ingin keluar dari akun ini?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsModelOpen(false)}
                className="font-montserrat flex-1 cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Tidak
              </button>

              <button
                onClick={onLogout}
                className="font-montserrat flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
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

import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

function Menu() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLogout = async () => {
    try {
      await handleLogout();
      toast.success("Berhasil keluar dari akun");
      navigate("/login", { replace: true });
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      toast.error(errorMessage);
      navigate("/login", { replace: true });
    }
  };
  return (
    <>
    <aside className="menu-bar h-max-screen hidden w-64 flex-col gap-2 px-6 pt-8 md:flex">
      <NavLink
        to="/dashboard"
        className="group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-blue-600 hover:text-white"
      >
        <img
          src="/dashboard-two (1).svg"
          alt="dashboard"
          className="group-hover:brightness-0 group-hover:invert"
        />
        <p>Dashboard</p>
      </NavLink>
      <NavLink
        to="/transfer"
        className="group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-blue-600 hover:text-white"
      >
        <img
          src="/Send.svg"
          alt="transfer"
          className="group-hover:brightness-0 group-hover:invert"
        />
        <p>Transfer</p>
      </NavLink>
      <NavLink
        to="/history"
        className="group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-blue-600 hover:text-white"
      >
        <img
          src="/history.svg"
          alt="history"
          className="group-hover:brightness-0 group-hover:invert"
        />
        <p>History</p>
      </NavLink>
      <NavLink
        to="/top-up"
        className="group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-blue-600 hover:text-white"
      >
        <img
          src="/Upload-default.svg"
          alt="top Up"
          className="group-hover:brightness-0 group-hover:invert"
        />
        <p>Top Up</p>
      </NavLink>
      <NavLink
        to="/edit-profile"
        className="group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-blue-600 hover:text-white"
      >
        <img
          src="/2 User.svg"
          alt="profile"
          className="group-hover:brightness-0 group-hover:invert"
        />
        <p>Profile</p>
      </NavLink>
      <button
        onClick={() => setIsModalOpen(true)}
        className="exit group flex cursor-pointer items-center gap-4 rounded-md p-3 text-left hover:bg-red-600 hover:text-white"
      >
        <img
          src="/Icon.svg"
          alt="Exit"
          className="group-hover:brightness-0 group-hover:invert"
        />
        <p>Keluar</p>
      </button>
    </aside>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h3 className="text-lg font-bold text-black mb-6 font-montserrat">
          Konfirmasi Keluar
        </h3>

        <p className="text-sm text-gray-500 mb-6 font-montserrat">
          Apakah anda yakin ingin keluar?
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium font-montserrat"
          >
            Tidak
          </button>

          <button
            onClick={onLogout}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium font-montserrat"
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

export default Menu;

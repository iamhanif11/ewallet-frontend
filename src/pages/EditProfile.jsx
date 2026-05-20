import { NavLink } from "react-router";
import ButtonDownload from "../components/atoms/ButtonDownload";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import Menu from "../components/DashboardPage/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  deleteProfilePicture,
  updateProfile,
  updateProfilePicture,
} from "../redux/slices/usersSlice";
import toast from "react-hot-toast";

function EditProfile() {
  const dispatch = useDispatch();
  const currentUserEmail = useSelector((state) => state.users.currentUserEmail);
  const user = useSelector((state) =>
    state.users.registeredUsers.find((u) => u.email === currentUserEmail),
  );

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    phone: user?.phone || "",
  });

  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("format file salah");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (file.imgSize < 1024 *1024) {
          toast.error("foto maksimal 1mb");
          return;
        }
        const base64 = event.target.result;
        setProfileImage(base64);

        dispatch(
          updateProfilePicture({
            email: currentUserEmail,
            profileImage: base64,
          }),
        );

        toast.success("Foto berhasil diubah");
      };
      img.onerror = () => {
        toast.error("gagal memuat gambar");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProfile = () => {
    setProfileImage(null);
    dispatch(deleteProfilePicture({ email: currentUserEmail }));
    toast.success("foto profil dihapus");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProfile({
        fullname: formData.fullname,
        phone: formData.phone,
      }),
    );

    toast.success("Profil berhasil diperbaharui");

  };
  return (
    <>
      <div className="min-h-screen bg-white">
        <DashboardHeader />

        <div className="flex gap-8 p-4 md:py-0 md:px-8 flex-col md:flex-row items-start">
          <Menu />

          <div className="flex flex-col w-full max-w-4xl">
            <div className="flex gap-2 py-8 items-center font-bold mb-2">
              <img src="/2 User.png" alt="icon-profile" className="w-5 h-5" />

              <h2 className="text-xl">Profile</h2>
            </div>

            <div className="p-6  border border-gray-200 rounded-md w-full">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <h3 className="text-gray-700 font-bold">Profile Picture</h3>
                  <div className="flex items-center gap-6">
                    <img
                      src={profileImage || "/User edit.svg"}
                      alt="photo-profile"
                      className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-xl object-cover p-2"
                    />
                    <div className="flex flex-col gap-2">
                      <div onClick={handleChangeProfileClick}>
                        <ButtonDownload
                          icon="/Edit Square.svg"
                          altText="edit-profile"
                          text="Change Profile"
                          imgSize="w-5"
                          variant="primary"
                        />
                      </div>
                      <div onClick={handleDeleteProfile}>
                        <ButtonDownload
                          icon="/Trash.svg"
                          altText="delete-profile"
                          text="Delete Profile"
                          imgSize="w-5"
                          variant="red"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    The profile picture must be 512 x 512 pixels or less
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <img
                        src="/User edit.svg"
                        alt="edit"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      />
                      <input
                        name="fullname"
                        type="text"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Phone
                    </label>
                    <div className="relative">
                      <img
                        src="/Phone.svg"
                        alt="phone"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      />
                      <input
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Your Number Phone"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <img
                        src="/mail2.svg"
                        alt=""
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      />
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        disabled={true}
                        className="cursor-not-allowed w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1  gap-6 pt-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <NavLink
                      to="/change-password"
                      type="button"
                      className="text-blue-600 text-sm font-medium hover:underline text-left w-fit"
                    >
                      Change Password
                    </NavLink>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700">
                      Pin
                    </label>
                    <NavLink
                      to="/change-pin"
                      className="text-blue-600 text-sm font-medium hover:underline text-left w-fit"
                    >
                      Change Pin
                    </NavLink>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white rounded-md text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all  mt-6"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;

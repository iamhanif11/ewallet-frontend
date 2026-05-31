import { NavLink } from "react-router";
import ButtonDownload from "../components/atoms/ButtonDownload";
import DashboardHeader from "../components/DashboardPage/DashboardHeader";
import Menu from "../components/DashboardPage/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../redux/slices/usersSlice";
import toast from "react-hot-toast";

function EditProfile() {
  const dispatch = useDispatch();

  const { profileData, updateStatus } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
  });

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const fileInputRef = useRef(null);
  const isFormInitialized =useRef(false)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch]);

  useEffect(() => {
    if(profileData && !isFormInitialized.current) {
      setFormData({
        fullname: profileData.fullname || "",
        phone: profileData.phone || "",
      });
      setPreviewImage(profileData.picture || null) 

      isFormInitialized.current =true;
    }
  }, [profileData])
  
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
    
    if (file.size > 1024 *1024) {
      toast.error("Foto Maksimal 1MB");
      return;
    }
   
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  
  const handleDeleteProfile = () => {
    setSelectedFile(null);
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Foto dihapus!")
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("fullname", formData.fullname)
    dataToSend.append("phone", formData.phone)

    if (selectedFile) {
      dataToSend.append("picture", selectedFile)
    }

    try{
      await dispatch(updateUserProfile(dataToSend)).unwrap();
      toast.success("Profil Berhasi Diperbarui!");
    } catch (error) {
      const errorMesssage = typeof error === 'string' ? error : (error)
      toast.error(errorMesssage)
    }
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
                      src={previewImage || "/User edit.svg"}
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
                        value={profileData?.email || ""}
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
                  disabled={updateStatus === "loading"}
                  className={`w-full py-4 rounded-md text-lg shadow-lg transition-all mt-6 ${
                    updateStatus === "loading"
                      ? "bg-blue-400 text-gray-100 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  } `}
                >
                  {updateStatus === "loading" ? "saving..." : "Submit"}
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

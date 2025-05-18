import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Check, Edit, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    isUpdatingName,
    updateName,
  } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState(false);
  const [newName, setNewName] = useState(authUser?.fullName || "");

  const handleNameChange = async (e) => {
    try {
      await updateName({ fullName: newName });
    } catch (error) {
      console.log("Error:", err.message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        console.log("Error in Updating Profile", error);
      }
    };
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold cursor-default">Profile</h1>
            <p className="mt-2 cursor-default">The small details matter.</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="tezt-sm text-zinc-400 cursor-default">
              {isUpdatingProfile ? "Updating..." : "Edit"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                Full Name (Editable)
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  disabled={!form}
                  placeholder={authUser?.fullName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={`px-4 py-2.5 bg-base-200 rounded-lg border w-full ${
                    form
                      ? "text-white placeholder-zinc-400"
                      : "text-white placeholder-white"
                  }`}
                />
                <button
                  className={`rounded-lg border px-4 py-2.5 bg-base-200 hover:bg-base-300`}
                  onClick={() => {
                    if (form) {handleNameChange()
                      toast.success("Name Updated Successfully")
                    };
                    setForm(!form);
                  }}
                >
                  {form ? (
                    <Check className="text-green-300 size-6" />
                  ) : (
                    <Edit className="text-zinc-300 size-6" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser.createdAt?.split("-")[2]?.split("T")[0] +
                    "-" +
                    authUser.createdAt?.split("-")[1] +
                    "-" +
                    authUser.createdAt?.split("-")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

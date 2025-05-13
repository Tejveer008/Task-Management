import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Placeholder images (direct image URLs)
const adminProfileImage = "https://picsum.photos/200?random=1"; // Direct image URL for admin
const userProfileImage = "https://picsum.photos/200?random=2"; // Direct image URL for user
const fallbackImage = "https://picsum.photos/200?random=3"; // Fallback image if loading fails

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", profilePhoto: null });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          console.log(`[${new Date().toISOString()}] User data fetched:`, data);
          console.log(`[${new Date().toISOString()}] Profile photo URL:`, data.profilePhoto);
          setUser(data);
          setFormData({
            name: data.role === "admin" ? data.adminName : data.username,
            email: data.email,
            profilePhoto: null,
          });
        } else {
          console.error(`[${new Date().toISOString()}] Failed to fetch user details:`, data.message);
          toast.error("Failed to fetch user details", { position: "top-center" });
          navigate("/login");
        }
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Error fetching user details:`, err);
        toast.error("Error fetching user details", { position: "top-center" });
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logged out successfully", { position: "top-center" });
      navigate("/login?fromLogout=true");
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Error logging out:`, err);
      toast.error("Error logging out", { position: "top-center" });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (user.role === "admin") {
        formDataToSend.append("adminName", formData.name);
        formDataToSend.append("email", formData.email);
      } else {
        formDataToSend.append("username", formData.name);
      }
      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      console.log(`[${new Date().toISOString()}] Sending update profile request with formData:`, [...formDataToSend.entries()]);

      const res = await fetch("http://localhost:8080/api/auth/update-profile", {
        method: "PUT",
        credentials: "include",
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`[${new Date().toISOString()}] Profile updated successfully:`, data);
        console.log(`[${new Date().toISOString()}] Updated profile photo URL:`, data.profilePhoto);
        toast.success("Profile updated successfully", { position: "top-center" });
        setUser(data);
        setIsModalOpen(false);
        setPreviewImage(null);
        setFormData((prev) => ({ ...prev, profilePhoto: null })); // Clear file input
      } else {
        console.error(`[${new Date().toISOString()}] Failed to update profile:`, data.message);
        toast.error(data.message || "Failed to update profile", { position: "top-center" });
      }
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Error updating profile:`, err);
      toast.error("Error updating profile: Network or server issue", { position: "top-center" });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto" && files[0]) {
      setFormData({ ...formData, profilePhoto: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
      console.log(`[${new Date().toISOString()}] Selected profile photo:`, files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (!user) {
    return <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />;
  }

  const profileImage = user.profilePhoto
    ? user.profilePhoto
    : user.role === "admin"
    ? adminProfileImage
    : userProfileImage;
  const displayName = user.role === "admin" ? user.adminName : user.username;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Profile Photo (Clickable) */}
      <div
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={profileImage}
          alt={displayName}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error(`[${new Date().toISOString()}] Failed to load profile image:`, profileImage);
            e.target.src = fallbackImage; // Fallback image on error
          }}
        />
      </div>

      {/* Role Badge Below Image */}
      <span
        className={`text-xs px-2 py-1 rounded-full mt-2 ${
          user.role === "admin" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
        }`}
      >
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </span>

      {/* Modal for Profile Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-blue-600 mb-4">Edit Profile</h2>
            <div className="flex justify-center mb-4">
              <img
                src={previewImage || profileImage}
                alt={displayName}
                className="w-16 h-16 rounded-full border-2 border-blue-600"
                onError={(e) => {
                  console.error(`[${new Date().toISOString()}] Failed to load modal profile image:`, previewImage || profileImage);
                  e.target.src = fallbackImage;
                }}
              />
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleChange}
                  className="w-full mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {user.role === "admin" ? "Admin Name" : "Username"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter your ${user.role === "admin" ? "admin name" : "username"}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={user.role !== "admin"}
                  className={`w-full mt-1 px-4 py-2 border border-gray-300 rounded-md ${
                    user.role !== "admin" ? "bg-gray-100" : "focus:outline-none focus:ring-2 focus:ring-blue-400"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  disabled
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setPreviewImage(null);
                    setFormData((prev) => ({ ...prev, profilePhoto: null })); // Clear file input on cancel
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
            <button
              onClick={handleLogout}
              className="mt-4 text-sm text-blue-600 hover:underline w-full text-center"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
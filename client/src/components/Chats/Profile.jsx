import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggler from "../ThemeToggler";
import { CLOUDINARY_URL, SERVER_URL } from "@/utils/Constant";
import { logout, setUser } from "@/redux/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setSelectedUser, setSeletedMessages } from "@/redux/auth/chatSlice";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(currentUser?.avatarUrl || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [about, setAbout] = useState(currentUser?.about || "");

  useEffect(() => {
    if (currentUser) {
      setUploadedUrl(currentUser.avatarUrl || "");
      setUsername(currentUser.username || "");
      setAbout(currentUser.about || "");
    }
  }, [currentUser]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "chat-app");

      try {
        setUploading(true);
        const response = await axios.post(`${CLOUDINARY_URL}`, formData);
        setUploadedUrl(response.data.secure_url);
        toast({
          description: "Image uploaded successfully",
        });
      } catch (error) {
        toast({
          description: "Error uploading image",
          variant: "destructive",
        });
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setSubmitting(true);
      const payload = {
        avatarUrl: uploadedUrl,
        username,
        about,
      };

      const response = await axios.patch(
        `${SERVER_URL}/api/user/update`,
        payload,
        { withCredentials: true }
      );

      dispatch(setUser(response.data.user));
      toast({
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        description: "Error updating profile",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/user/delete`, {
        withCredentials: true,
      });
      toast({
        description: "Account deleted successfully",
      });
      dispatch(setUser(null));
      dispatch(logout());
      dispatch(setSelectedUser(null));
      dispatch(setSeletedMessages(null));
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        description: "Error deleting account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="sticky hidden flex-none h-screen bg-accent px-5 py-5 shadow-sm sm:block lg:w-96">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-xl text-primary">Profile</h1>
        <ThemeToggler />
      </div>

      <div className="relative mx-auto flex w-full justify-center pt-14">
        <label htmlFor="avatarUpload" className="cursor-pointer group">
          <div className="relative w-40 h-40">
            <img
              src={uploadedUrl || "/placeholder-avatar.png"}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-4 border-gray-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-semibold">
                {uploading ? "Uploading..." : "Click to Upload"}
              </span>
            </div>
          </div>
        </label>
        <input
          id="avatarUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="w-full space-y-4 pt-12 pb-5">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full border border-card-foreground py-5"
          disabled={uploading || submitting}
        />
        <Input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Enter a brief intro about yourself"
          className="w-full border border-card-foreground py-5"
          disabled={uploading || submitting}
        />
      </div>

      <div>
        <Button
          className="w-full"
          disabled={uploading || submitting}
          onClick={handleUpdateProfile}
        >
          {uploading
            ? "Uploading Image..."
            : submitting
            ? "Submitting..."
            : "Submit"}
        </Button>
      </div>

      <div className="pt-8">
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDeleteUser}
        >
          <Trash2 className="mr-2" /> Delete your account
        </Button>
      </div>
    </div>
  );
};

export default Profile;

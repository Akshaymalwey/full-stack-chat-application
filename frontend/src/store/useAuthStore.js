import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isUpdatingName: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (e) {
      console.log("Error in checkAuth: ", e.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account Created Successfully");
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error in signing up: ", e.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async (data) => {
    set({ isLoggingOut: true });
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Account Logged Out Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in logging out", error.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      console.log("AuthUser set to res data");
      
      toast.success(`Welcome Back ${response.data.fullName}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
      console.log("error in logging in", error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profilePic", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Image Size too big, Choose a different image");
      console.log("Error in Updating Profile", error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updateName: async (data) => {
    set({ isUpdatingName: true });
    try {
      const res = await axiosInstance.put("/auth/update-fullName", data);
      set({ authUser: res.data });
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in Updating Profile", error.message);
    } finally {
      set({ isUpdatingName: false });
      toast.success("Full Name Updated Successfully");
    }
  },
}));

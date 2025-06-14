import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore.js"

export const useChatStore = create((set,get) => ({
  message: [],
  users: [],
  selectedUsers: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({isMessagesLoading: true});
    try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({message: res.data});
    } catch (error) {
        toast.error(error.message.data.message);
    } finally {
        set({isMessagesLoading: false})
    }
  },

  sendMessage: async (messageData) => {
    const {selectedUsers, message } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUsers._id}`, messageData);
      set({message : [...message, res.data ]});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUsers } = get();
    if(!selectedUsers) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUsers._id) return
      set({
        message : [...get().message, newMessage],
      })
    })
  },

  unsubscribeFromMessage : () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  },

  setSelectedUsers: (selectedUsers) => set({selectedUsers}),
}));

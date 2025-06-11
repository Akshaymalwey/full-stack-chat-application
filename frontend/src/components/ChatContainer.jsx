import React, { useEffect , useRef} from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx"; 
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formateMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const { message, getMessages, isMessagesLoading, selectedUsers, subscribeToMessages, unsubscribeFromMessage } =
    useChatStore();
  const { authUser } = useAuthStore();

 const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUsers._id);
    subscribeToMessages();

    return () => unsubscribeFromMessage();
  }, [selectedUsers._id, getMessages, subscribeToMessages, unsubscribeFromMessage]);

  useEffect(()=>{
    if(messageEndRef.current && message){ 
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [message])

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUsers.profilePic || "/avatar.png"
                  }
                  alt="Proflie Pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formateMessageTime(msg.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="sm: max-w-[200px] rounded-md mb-2"
                />
              )}
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;

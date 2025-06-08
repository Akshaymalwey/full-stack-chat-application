import React from 'react'
import {X} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'

const ChatHeader = () => {
    
    const {selectedUsers, setSelectedUsers } = useChatStore();
    const { onlineUsers } = useAuthStore();

  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUsers.profilePic || "/avatar.png"} alt={selectedUsers.fullname} />
                    </div>
                </div>

                <div>
                    <h3 className='font-medium'>{selectedUsers.fullName}</h3>
                    <p className='text-sm text-base-content opacity-70'>
                        {onlineUsers.includes(selectedUsers._id) ? "Online" : "Offine"}
                    </p>
                </div>
            </div>

            <button onClick={()=>setSelectedUsers(null)}>
                <X />
            </button>
        </div>
    </div>
  )
}

export default ChatHeader

import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  BookText,
  LogOut,
  LogOutIcon,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <>
      <header className="bg-base-100 border-b border-base-300 fixed w-full t-0 z-100 backdrop-blur-lg bg-base-100/80">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">Chatar Patar</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={"/settings"}
                className={`btn btn-sm gap-2 transition-colors`}
              >
                <Settings className="size-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              {authUser && (
                <>
                  <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                    <User className="size-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    className="flex gap-2 items-center"
                    onClick={() => setOpen(true)}
                  >
                    <LogOutIcon className="size-4" />
                    <span className="hiddle sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="btn" onClick={() => setOpen(false)}>
                Cancle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

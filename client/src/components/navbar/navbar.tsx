import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import RegisterForm from "../auth/registerForm";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex gap-4 justify-end items-end sticky top-0 font-semibold text-xs pb-2">
      <div
        className="p-2 rounded-3xl cursor-pointer hover:scale-105 duration-300"
        onClick={handleClickOpen}
      >
        <p>Sign up</p>
      </div>
      <div className="p-2 rounded-3xl bg-white text-black cursor-pointer hover:scale-105 duration-300">
        <p>Log in</p>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="bg-black">
          <RegisterForm handleClose={handleClose} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import RegisterForm from "../auth/registerForm";
import LoginForm from "../auth/loginForm";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);

  let { name, picture } = useSelector((state: any) => state.user);

  const handleClickOpen = () => {
    setOpenSignUp(true);
  };

  console.log(name);

  const handleClose = () => {
    setOpenSignUp(false);
  };

  return (
    <div className="flex gap-4 justify-end items-end sticky top-0 font-semibold text-xs pb-2">
      {name == undefined ? (
        <>
          <div
            className="p-2 rounded-3xl cursor-pointer hover:scale-105 duration-300"
            role="button"
            onClick={handleClickOpen}
          >
            <p>Sign up</p>
          </div>
          <div
            className="p-2 rounded-3xl bg-white text-black cursor-pointer hover:scale-105 duration-300"
            onClick={() => setOpenLogin(true)}
          >
            <p>Log in</p>
          </div>
        </>
      ) : (
        <div className="">
          <img
            src={picture}
            onMouseEnter={() => setHoverProfile(true)}
            onMouseLeave={() => setHoverProfile(false)}
            className="w-7 h-7 rounded-full mr-6 cursor-pointer relative"
          ></img>
          {hoverProfile && (
            <div className="bg-hoverColor w-fit p-1 rounded-md absolute top-8 right-6 text-xs z-10">
              <p>{name}</p>
            </div>
          )}
        </div>
      )}
      <Dialog open={openSignUp} onClose={handleClose}>
        <DialogContent className="bg-black">
          <RegisterForm handleClose={handleClose} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <DialogContent className="bg-black">
          <LoginForm handleClose={() => setOpenLogin(false)} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, Menu, MenuItem } from "@mui/material";
import RegisterForm from "../auth/registerForm";
import LoginForm from "../auth/loginForm";
import { useSelector, useDispatch } from "react-redux";
import AddMusicDialog from "../music/addMusicDialog";
import { clearData } from "@/redux/slice/userSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "@/services/auth/auth.service";

export default function Navbar() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddMusic, setAddMusic] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id, name, picture, token } = useSelector((state: any) => state.user);

  const handleClickOpen = () => {
    setOpenSignUp(true);
  };

  const handleClose = () => {
    setOpenSignUp(false);
  };

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  console.log(token, "token");

  const logout = async () => {
    try {
      handleMenuClose();
      dispatch(clearData());
      const res = await LogoutUser();
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex gap-4 justify-between absolute top-3 w-[79%] py-1 px-5  font-semibold text-xs pb-2 z-20 ">
      <div className="flex gap-1 ">
        <div className="p-2 rounded-full bg-black text-white text-sm">
          <FaChevronLeft />
        </div>
        <div className="p-2 rounded-full bg-black text-white text-sm">
          <FaChevronRight />
        </div>
      </div>
      {name == "" ? (
        <div className="flex gap-2 mr-6">
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
        </div>
      ) : (
        <div className="">
          <img
            src={picture}
            onMouseEnter={() => setHoverProfile(true)}
            onMouseLeave={() => setHoverProfile(false)}
            onClick={handleMenuClick}
            className="w-7 h-7 rounded-full mr-6 cursor-pointer relative"
          ></img>
          {hoverProfile && (
            <div className="bg-hoverColor w-fit p-1 rounded-md absolute top-8 right-6 text-xs z-10">
              <p>{name}</p>
            </div>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                bgcolor: "Scrollbar",
                color: "white",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/artist/${id}`);
              }}
              sx={{ fontSize: "0.800rem" }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                setAddMusic(true);
              }}
              sx={{ fontSize: "0.800rem" }}
            >
              Add a song
            </MenuItem>
            <MenuItem onClick={logout} sx={{ fontSize: "0.800rem" }}>
              Logout
            </MenuItem>
          </Menu>
          <Dialog open={openAddMusic} onClose={() => setAddMusic(false)}>
            <DialogContent className="bg-black">
              <AddMusicDialog handleClose={() => setAddMusic(false)} />
            </DialogContent>
          </Dialog>
        </div>
      )}
      <Dialog open={openSignUp} onClose={handleClose}>
        <DialogContent className="bg-black">
          <RegisterForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <DialogContent className="bg-black">
          <LoginForm handleClose={() => setOpenLogin(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useSelector } from "react-redux";
import Router from "./routes/index.routes";
import { getAccessToken } from "./services/auth/auth.service";
import { useDispatch } from "react-redux";
import { setData } from "./redux/slice/userSlice";

function App() {
  const { id, email, name, picture, token } = useSelector(
    (state: any) => state.user
  );
  console.log(token);
  const dispatch = useDispatch();

  const accessTokenGen = async () => {
    try {
      const res = await getAccessToken();
      console.log(res.data.data);
      let token: string = res.data.data;
      dispatch(setData({ id, email, name, picture, token: token }));
    } catch (e) {
      console.log(e);
    }
  };
  //!So jaba token hudaina ani aru details cha re vanesi tyo chai token chai udeko ho jastai user chai logged in cha hai tara
  //! due to cache the data has been refreshed like memory rakhni ho access token so that kole ni napaos vanera
  //! so if the details of the user are also empty and the token is also empty it means the user has been logged out
  // so there is no means of fetching the access token again and again tei vayera condition fetching lagaideko lol
  if (token == "" && id) {
    accessTokenGen();
  }

  return <Router />;
}

export default App;

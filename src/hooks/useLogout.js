import axios from "../api/axios";
import useAuth from "./useAuth";

const initialState = {
  user: "",
  roles: [],
};

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(initialState);
    try {
      const response = await axios.post("/user/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;

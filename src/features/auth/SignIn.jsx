import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Imported Context
// Imported Hooks
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
// Imported Data
import { ACTIONS, SERVER } from "../../data/actions";
// Imported Icons
import { FaRegUserCircle } from "react-icons/fa";
import axios from "../../api/axios";

const SignIn = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set focus to username input on load
  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Remove error message on user input
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(SERVER.USER_SIGNIN, {
        type: ACTIONS.USER_SIGNIN,
        payload: {
          username: user,
          password: pwd,
        },
      });

      if (response?.data?.status === "success") {
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, roles, accessToken });
        resetUser();
        setPwd("");
        setSuccess(true);
        navigate(from, { replace: true });
        navigate("/", { state: { username: user } });
      } else {
        alert(response);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
      errRef.current.focus();
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <section className={success ? "visible h-fit" : " invisible h-0"}>
        <p>You are now logged in!</p>
        <Link to="/">Go to Home Page</Link>
      </section>
      <section className={!success ? "visible h-fit w-full" : " invisible h-0"}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form
          className="form_auth rounded-lg shadow-lg shadow-zinc-600"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center my-4 relative">
            <h1>Sign In</h1>
            <FaRegUserCircle className="text-6xl absolute left-[50%] translate-x-[-50%]" />
          </div>
          {/* username */}
          <div className="field relative">
            <label htmlFor="username" className="field__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="UserName"
              ref={userRef}
              autoComplete="off"
              {...userAttribs}
              required
            />
          </div>
          {/* pwd */}
          <div className="field relative">
            <label htmlFor="password" className="field__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <button type="submit" className="btn btn-yellow mx-auto">
            Signin
          </button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist" className="ml-2">
              Trust This Device
            </label>
          </div>
          <div className="flex items-center gap-2">
            <p>Create new account</p>
            <Link to="/register" className="btn btn-blue">
              Signup
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignIn;

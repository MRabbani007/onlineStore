// React dependencies
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
// Imported Data
import { ACTIONS, SERVER } from "../data/actions";
// Imported Icons
import { FaRegUserCircle } from "react-icons/fa";
import {
  CiCircleInfo,
  CiSquareCheck,
  CiSquareInfo,
  CiSquareRemove,
} from "react-icons/ci";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    } else {
      try {
        const response = await axios.post(SERVER.USER_SIGNUP, {
          type: ACTIONS.USER_SIGNUP,
          payload: {
            username: user,
            password: pwd,
          },
        });
        if (response?.data?.status === "success") {
          setSuccess(true);
          //clear state and controlled inputs
          //need value attrib on inputs for this
          setUser("");
          setPwd("");
          setMatchPwd("");
          navigate(from, { replace: true });
          navigate("login", { state: { username: user } });
        } else {
          alert(response);
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className={success ? "visible h-fit" : " invisible h-0"}>
        <h1>Success!</h1>
        <p>
          <Link to="login">Sign In</Link>
        </p>
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
          className="form_auth shadow-lg shadow-zinc-600"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center my-4 relative">
            <h1>Sign Up</h1>
            <FaRegUserCircle className="text-6xl absolute left-[50%] translate-x-[-50%]" />
          </div>
          {/* username */}
          <div className="field relative">
            <label htmlFor="username" className="field__label">
              Username
              <CiSquareCheck className={validName ? "valid icon" : "hide"} />
              <CiSquareRemove
                className={validName || !user ? "hide" : "invalid icon"}
              />
            </label>
            <input
              type="text"
              id="username"
              placeholder="UserName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <CiSquareInfo className="icon" />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          {/* pwd */}
          <div className="field relative">
            <label htmlFor="password" className="field__label">
              Password
              <CiSquareCheck className={validPwd ? "valid icon" : "hide"} />
              <CiSquareRemove
                className={validPwd || !pwd ? "hide" : "invalid icon"}
              />
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <CiSquareInfo className="icon" />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          {/* Confirm pwd */}
          <div className="field relative">
            <label htmlFor="confirm_pwd" className="field__label">
              Confirm Password:
              <CiSquareCheck
                className={validMatch && matchPwd ? "valid icon" : "hide"}
              />
              <CiSquareRemove
                className={validMatch || !matchPwd ? "hide" : "invalid icon"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              placeholder="Re-Type Password"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <CiCircleInfo className="icon" />
              Must match the first password input field.
            </p>
          </div>
          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className="btn btn-blue mx-auto my-2"
          >
            Signup
          </button>
          <div className="flex items-center gap-2">
            <p>Have an account?</p>
            <Link to="/login" className="btn btn-yellow">
              Signin
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signup;

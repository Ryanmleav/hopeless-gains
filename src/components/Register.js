import React from "react";
import { useState } from "react";
import { getUser } from "../redux/userReducer";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";


const Register = ({ getUser }) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const history = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, phoneNumber } = state;

    try {
      const user = await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      getUser(user.data);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div>
      {/* <div className="register-nav-bar">
        <div className="register-nav-bar-left">
        </div>
        <div className="register-nav-bar-right">
        </div>
      </div> */}
      <div className="register-header">
        <h1 className="register-header-text">
          Create Your Hopeless Gains Account{" "}
        </h1>
      </div>
      <form className='register-input'onSubmit={(e) => registerUser(e)}>
        <div className="register-form-text"></div>
        <div className="register-name-input">
          <input
            className="register-first-name"
            placeholder="First name"
            onChange={(e) => changeHandler(e)}
            name="firstName"
          />
          <input
            className="register-last-name"
            placeholder="Last name"
            onChange={(e) => changeHandler(e)}
            name="lastName"
          />
        </div>
        <div className="register-email-input">
          <input
            placeholder="name@example.com"
            onChange={(e) => changeHandler(e)}
            name="email"
          />
          <input
            placeholder="Password"
            onChange={(e) => changeHandler(e)}
            name="password"
          />
        </div>
        <div className="register-phone-input">
          <input
            placeholder="Phone number"
            type="number"
            onChange={(e) => changeHandler(e)}
            name="phoneNumber"
          />
        </div>
        <div className="register-checkbox">
          <p className='register-checkbox-text'>
            Verify with: <br></br>
            Email
          </p>
          <input className="checkbox-email-message" type="checkbox" />
        </div>
        <button className="register-button" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUser })(Register);

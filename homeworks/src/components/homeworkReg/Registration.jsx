import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import UserContext from '../../context';

import "./reg.scss";
import { users } from '../../data/users';

import star from "./star.png";
import { useState, useContext } from "react";
import { json } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      className="reg"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = React.useState(0);
  const {setUser, signIn} = useContext(UserContext);

  const [register, setRegister] = useState({
    email: "",
    password: "",
    confirm: "",
    accept: false
  });

  const emailInputChangeHandler = (e) => {
    setEmail(e.target.value)
  };
  const passwordInputChangeHandler = (e) => {
    setPassword(e.target.value)
  };

  const registerInputChangeHandler = (e) => {
    const {value, name, type, checked} = e.target;
    setRegister((data) => {
        return {
            ...data,
            [name]: type === "checkbox" ? checked : value
        }
    })
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    if(email && password) {
      const profile = users.find(u => {
        if((u.email === email) && (u.password === password)) {
          return u;
        }
      })
      if(profile) {
        localStorage.setItem('User', JSON.stringify(profile));
        signIn(profile);
      } else {
        setUser(null)
      }
    }
  };

  const submitRegister = (e) => {
    e.preventDefault();
    if((register.email && register.password && register.accept && register.confirm) 
        && (register.password === register.confirm)) {
          setRegister({
            email: "",
            password: "",
            confirm: "",
            accept: false
          })
          console.log(register);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tabs">
      <img src={star} alt="star" className="star" />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="reg">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ width: "100%" }}
          >
            <Tab label="Sign up" {...a11yProps(0)} sx={{ width: "50%" }} />
            <Tab label="Register" {...a11yProps(1)} sx={{ width: "50%" }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <form className="form" name="login">
              <label>
                  <div className="title">Email address</div>
                  <input 
                      type="email" 
                      name="email"
                      value={email}
                      onChange={emailInputChangeHandler}
                      placeholder="Your email"
                      className="inputs"
                  />
              </label>
              <label>
                  <div className="title">Password</div>
                  <input 
                      type="password" 
                      name="password"
                      value={password}
                      onChange={passwordInputChangeHandler}
                      placeholder="Password"
                      className="inputs"
                  />
              </label>
              <button className="submitButton" type="submit" onClick={submitSignUp}>Sign in</button>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form className="form">
                <label>
                    <div className="title">Email address</div>
                    <input 
                        type="email" 
                        name="email"
                        value={register.email}
                        onChange={registerInputChangeHandler}
                        placeholder="Your email"
                        className="inputs"
                    />
                </label>
                <label>
                    <div className="title">Password</div>
                    <input 
                        type="password" 
                        name="password"
                        value={register.password}
                        onChange={registerInputChangeHandler}
                        placeholder="Password"
                        className="inputs"
                    />
                </label>
                <label>
                    <div className="title">Confirm</div>
                    <input 
                        type="password" 
                        name="confirm"
                        value={register.confirm}
                        onChange={registerInputChangeHandler}
                        placeholder="Confirm"
                        className="inputs"
                    />
                </label>
                <label className="accept">
                  <input 
                      type="checkbox" 
                      name="accept"
                      value={register.accept}
                      onChange={registerInputChangeHandler}
                      className="accept"
                  />
                  I accept the terms and privacy policy
              </label>
              <button className="submitButton register" type="submit" onClick={submitRegister}>Register</button>
          </form>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Registration;

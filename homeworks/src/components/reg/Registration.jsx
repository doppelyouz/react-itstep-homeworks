import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "./reg.scss";

import star from "./star.png";
import { useState } from "react";

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
  const [value, setValue] = React.useState(0);
  
  const [signUp, setSignUp] = useState({
    email: "",
    password: ""
  });
  
  const [register, setRegister] = useState({
    email: "",
    password: "",
    confirm: "",
    accept: false
  });

  const signUpInputChangeHandler = (e) => {
    const {value, name} = e.target;

    setSignUp((data) => {
        return {
            ...data,
            [name]: value
        }
    })
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
    if(signUp.email && signUp.password) {
      
      setSignUp({
        email: "",
        password: ""
      })
      console.log(signUp);
    }
  };

  const submitRegister = (e) => {
    e.preventDefault();
    
    if((register.email && register.password && register.accept && register.confirm) 
        && (register.password === register.confirm)) {
          fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(register),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
          });
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
          <form className="form">
              <label>
                  <div className="title">Email address</div>
                  <input 
                      type="email" 
                      name="email"
                      value={signUp.email}
                      onChange={signUpInputChangeHandler}
                      placeholder="Your email"
                      className="inputs"
                  />
              </label>
              <label>
                  <div className="title">Password</div>
                  <input 
                      type="password" 
                      name="password"
                      value={signUp.password}
                      onChange={signUpInputChangeHandler}
                      placeholder="Password"
                      className="inputs"
                  />
              </label>
              <button className="submitButton" type="submit" onClick={submitSignUp}>Sign up</button>
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

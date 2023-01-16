import React from "react";
import { useState } from "react";

import s from "./Lesson4.module.scss";

const Lesson4 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isHuman: false
  });

  console.log('formData: ', formData);

  const inputChangeHandler = (e) => {
    const {value, name, type, checked} = e.target;

    setFormData((data) => {
        return {
            ...data,
            [name]: type === "checkbox" ? checked : value
        }
    })
  };

  return (
    <div className={s.form}>
        <label htmlFor="name">
            <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={inputChangeHandler}
            />
        </label>
        <label htmlFor="email">
            <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={inputChangeHandler}
            />
        </label>
        <label htmlFor="email">
            <input 
                type="checkbox" 
                name="isHuman"
                value={formData.isHuman}
                onChange={inputChangeHandler}
            />
        </label>
    </div>
  );
};

export default Lesson4;

import React from "react";
import { useState } from "react";

import s from "./Lesson4.module.scss";

const Lesson4 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isHuman: false,
    number: null
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
        <label>
            <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={inputChangeHandler}
            />
        </label>
        <label>
            <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={inputChangeHandler}
            />
        </label>
        <label>
            <input 
                type="checkbox" 
                name="isHuman"
                value={formData.isHuman}
                onChange={inputChangeHandler}
            />
        </label>
        <label>
            <select
                value={formData.value}
                name="number"
                onChange={inputChangeHandler}
            >
                <option value={1}>11111</option>
                <option value={2}>22222</option>
                <option value={3}>33333</option>
                <option value={4}>44444</option>
            </select>
        </label>
    </div>
  );
};

export default Lesson4;

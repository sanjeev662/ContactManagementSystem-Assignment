import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import { url } from "../utils/Constants";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);
  const navigate = useNavigate();

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    spoc: "",
    add: "",
    desc: "",
  });

  const [errors, setErrors] = useState({});

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validateAge = (age) => {
    return !isNaN(age) && age >= 0;
  };

  const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, spoc, add, mobile, desc, age } = inpval;

    const newErrors = {};
    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!validateAge(age)) {
      newErrors.age = "Age must be a positive number";
    }
    if (!validateMobile(mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    if (spoc.trim() === "") {
      newErrors.spoc = "SPOC is required";
    }
    if (add.trim() === "") {
      newErrors.add = "Address is required";
    }
    if (desc.trim() === "") {
      newErrors.desc = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const res = await fetch(`${url}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          spoc,
          add,
          mobile,
          desc,
          age,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        alert("error");
      } else {
        alert("data added");
        navigate("/");
        setUdata(data);
      }
    }
  };

  return (
    <div className="container ">
      <form className="mt-4 mb-2">
        <h2 className="mb-3">Create Contact</h2>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="number"
              value={inpval.age}
              onChange={setdata}
              name="age"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.age && <p className="text-danger">{errors.age}</p>}
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              SPOC
            </label>
            <input
              type="text"
              value={inpval.spoc}
              onChange={setdata}
              name="spoc"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.spoc && <p className="text-danger">{errors.spoc}</p>}
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={inpval.add}
              onChange={setdata}
              name="add"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.add && <p className="text-danger">{errors.add}</p>}
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              value={inpval.desc}
              onChange={setdata}
              name="desc"
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
            {errors.desc && <p className="text-danger">{errors.desc}</p>}
          </div>
          <button type="submit" onClick={addinpdata} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;


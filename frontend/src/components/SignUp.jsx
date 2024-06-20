import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Validation for email field
    if (name === "email" && !value.endsWith("@gmail.com")) {
      setErrors({ ...errors, email: "Email must be a valid Gmail address." });
    } else {
      setErrors({ ...errors, email: "" });
    }

    // Validation for password strength
    if (name === "password") {
      const isStrongPassword = value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
      if (!isStrongPassword) {
        setErrors({
          ...errors,
          password: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!data.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!data.email.trim() || !data.email.endsWith("@gmail.com")) newErrors.email = "Email is required and must be a valid Gmail address.";
    if (!data.password.trim() || !isStrongPassword(data.password)) newErrors.password = "Password is required and must be strong.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const url = "http://localhost:3000/api/register";
      const { data: res } = await axios.post(url, data);
      toast.success("Registered successfully! Please check your email for the verification link.");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        setLoading(false);
      } else {
        toast.error("Something went wrong.");
        setLoading(false);
      }
    }
  };

  const isStrongPassword = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        {loading && <Spinner />}
        <h1 className="text-center text-2xl mb-4">Welcome</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder="First Name"
            />
            {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder="Last Name"
            />
            {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-gray-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

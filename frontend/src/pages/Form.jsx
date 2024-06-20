import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
// import { ThemeContext } from "../ThemeContext"; 

const Form = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
    month: "",
    time: "",
    number: "",
    color: "#1E85FF",
    select: "",
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/form");
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Email is not valid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!validatePassword(formData.password))
      newErrors.password = "Password is not strong enough";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.month) newErrors.month = "Month is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.number) newErrors.number = "Phone is required";
    if (!formData.select) newErrors.select = "Select an option";
    return newErrors;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    let [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error(formErrors);
    } else {
      const formattedData = {
        ...formData,
        date: formatDate(formData.date),
        time: formatTime(formData.time),
      };

      try {
        if (editMode) {
          const response = await axios.put(
            `http://localhost:3000/api/form/${currentId}`,
            formattedData
          );
          const updatedData = submittedData.map((data) =>
            data._id === currentId ? response.data : data
          );
          setSubmittedData(updatedData);
          setEditMode(false);
          toast.success("Form Updated Successfully");
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/form",
            formattedData
          );
          setSubmittedData([...submittedData, response.data]);
          toast.success("Form Added Successfully");
        }

        setFormData({
          name: "",
          email: "",
          password: "",
          date: "",
          month: "",
          time: "",
          number: "",
          color: "#1E85FF",
          select: "",
        });
        setShowEditModal(false);
        setCurrentId(null);
      } catch (error) {
        console.error("Error submitting data: ", error);
        toast.error(error);
      }
    }
  };

  const handleEdit = (data) => {
    setFormData({
      name: data.name,
      email: data.email,
      password: data.password,
      date: data.date.split("/").reverse().join("-"),
      month: data.month,
      time: data.time.split(" ")[0],
      number: data.number,
      color: data.color,
      select: data.select,
    });
    setEditMode(true);
    setCurrentId(data._id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/form/${id}`);
      setSubmittedData(submittedData.filter((data) => data._id !== id));
      setShowDeleteModal(false);
      setDeleteId(null);
      toast.success("Form Deleted Successfully");
    } catch (error) {
      console.error("Error deleting data: ", error);
      toast.error(error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className="flex flex-col w-full">
        <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div
          className={`${
            sidebarToggle ? "" : "ml-64"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="p-5">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded mb-4 border border-black"
            >
              Add New Form
            </button>

            <div className="mt-10 overflow-x-auto">
              <h2 className="text-xl font-semibold">Submitted Data</h2>
              <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Password</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Month</th>
                    <th className="py-2 px-4 border-b">Time</th>
                    <th className="py-2 px-4 border-b">Number</th>
                    <th className="py-2 px-4 border-b">Color</th>
                    <th className="py-2 px-4 border-b">Select</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{data.name}</td>
                      <td className="py-2 px-4 border-b">{data.email}</td>
                      <td className="py-2 px-4 border-b">{data.password}</td>
                      <td className="py-2 px-4 border-b">{data.date}</td>
                      <td className="py-2 px-4 border-b">{data.month}</td>
                      <td className="py-2 px-4 border-b">{data.time}</td>
                      <td className="py-2 px-4 border-b">{data.number}</td>
                      <td className="py-2 px-4 border-b">
                        <div
                          style={{ backgroundColor: data.color }}
                          className="w-6 h-6 rounded-full"
                        ></div>
                      </td>
                      <td className="py-2 px-4 border-b">{data.select}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEdit(data)}
                          className="text-blue-500 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(data._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showEditModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-2/3 lg:w-1/2">
                  <h2 className="text-xl font-semibold mb-4">
                    {editMode ? "Edit Data" : "Add Data"}
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-wrap"
                  >
                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                        placeholder="Name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                        placeholder="Password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.date ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Month
                      </label>
                      <input
                        type="month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.month ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                      />
                      {errors.month && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.month}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.time ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                      />
                      {errors.time && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.time}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Number
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className={`form-input w-full border ${
                          errors.number ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                        placeholder="Phone"
                      />
                      {errors.number && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.number}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Color
                      </label>
                      <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="form-input w-full h-10 border border-gray-300 rounded p-2"
                      />
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-6">
                      <label className="text-gray-800 text-sm font-medium inline-block mb-2">
                        Input Select
                      </label>
                      <select
                        name="select"
                        value={formData.select}
                        onChange={handleChange}
                        className={`form-select w-full border ${
                          errors.select ? "border-red-500" : "border-gray-300"
                        } rounded p-2`}
                      >
                        <option value="">Select an option</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {errors.select && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.select}
                        </p>
                      )}
                    </div>

                    <div className="w-full px-2 mt-7 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        {editMode ? "Update" : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showDeleteModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-1/3">
                  <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                  <p className="mb-6">
                    Are you sure you want to delete this item?
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(deleteId)}
                      className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Form;

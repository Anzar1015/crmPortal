import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useStatus } from "../StatusContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TextField, MenuItem, Button } from "@mui/material";
import Spinner from "../components/Spinner";

const CreateLead = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { statusOptions } = useStatus();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    company: Yup.string().required("Company is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "new",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("http://localhost:3000/leads", values)
        .then(() => {
          setLoading(false);
          enqueueSnackbar("Lead created successfully", { variant: "success" });
          onClose(); // Close the modal
          window.location = "/";
        })
        .catch((error) => {
          setLoading(false);
          if (error.response && error.response.data && error.response.data.message) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
          } else {
            enqueueSnackbar("Error creating lead", { variant: "error" });
          }
          console.log(error);
        });
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl">Add Lead</h1>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-800 focus:outline-none bg-red-500 p-2 rounded-md"
          >
            Close
          </button>
        </div>
        {loading && <Spinner />}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Company"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </div>
          <div className="mb-4">
            <PhoneInput
              country={"in"}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              onBlur={() => formik.setFieldTouched("phone", true)}
              inputClass="input-field w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              containerClass="w-full"
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>
          <div className="mb-4">
            <TextField
              select
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              variant="outlined"
              fullWidth
              margin="normal"
            >
              {statusOptions.map((statusOption, index) => (
                <MenuItem key={index} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-md mt-4 hover:bg-gray-800 transition-colors"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;




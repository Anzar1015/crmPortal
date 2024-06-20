// import React, { useState, useEffect } from 'react';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
// import { useStatus } from '../StatusContext';
// import PhoneInput from 'react-phone-input-2';

// const EditLead = () => {
//   const [name, setName] = useState('');
//   const [company, setCompany] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {id} = useParams();
//   const { enqueueSnackbar } = useSnackbar();
//   const { statusOptions } = useStatus();

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`http://localhost:3000/leads/${id}`)
//     .then((response) => {
//         setName(response.data.name);
//         setCompany(response.data.company)
//         setEmail(response.data.email)
//         setPhone(response.data.phone)
//         setStatus(response.data.status)
//         setLoading(false);
//       }).catch((error) => {
//         setLoading(false);
//         alert('An error happened. Please Chack console');
//         console.log(error);
//       });
//   }, [])
  
//   const handleEditLead = () => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       enqueueSnackbar("Please enter a valid email address", { variant: "warning" });
//       return;
//     }
//     const data = {
//       name,
//       company,
//       email,
//       phone,
//       status
//     };
//     setLoading(true);
//     axios
//       .put(`http://localhost:3000/leads/${id}`, data)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Lead Updated successfully', { variant: 'success' });
//         navigate('/');
//       })
//       .catch((error) => {
//         setLoading(false);
//         // alert('An error happened. Please Chack console');
//         enqueueSnackbar('Error', { variant: 'error' });
//         console.log(error); 
//       });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
//       <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-3xl">Update Lead</h1>
//           <Link to='/'>
//           <button
//             className="text-gray-600 hover:text-gray-800 focus:outline-none"
//           >
//             Close
//           </button>
//           </Link>
//         </div>
//         {loading && <Spinner />}
//         <div className="mb-4">
//           <label className="block text-gray-600 text-lg mb-2">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-field w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 text-lg mb-2">Company</label>
//           <input
//             type="text"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             className="input-field w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 text-lg mb-2">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input-field w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 text-lg mb-2">Phone</label>
//           <PhoneInput
//             country={"in"}
//             value={phone}
//             onChange={setPhone}
//             inputClass="input-field w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-600 text-lg mb-2">Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="input-field w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
//           >
//             {statusOptions.map((statusOption, index) => (
//               <option key={index} value={statusOption}>
//                 {statusOption}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="w-full bg-gray-700 text-white py-3 rounded-md mt-4 hover:bg-gray-800 transition-colors"
//           onClick={handleEditLead}
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   )
// }

// export default EditLead

import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useStatus } from '../StatusContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { TextField, MenuItem, Button } from '@mui/material';

const EditLead = ({ leadId, setIsPopupOpen }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { statusOptions } = useStatus();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/leads/${leadId}`)
      .then((response) => {
        formik.setValues({
          name: response.data.name,
          company: response.data.company,
          email: response.data.email,
          phone: response.data.phone,
          status: response.data.status,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    company: Yup.string().required('Company is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'new',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios.put(`http://localhost:3000/leads/${leadId}`, values)
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Lead updated successfully', { variant: 'success' });
          setIsPopupOpen(false)
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar('Error updating lead', { variant: 'error' });
          console.log(error);
        });
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl">Update Lead</h1>
        {/* <Link to='/'> */}
        <button
          onClick={() => setIsPopupOpen(false)}
          className="text-white hover:text-gray-800 focus:outline-none bg-red-500 p-2 rounded-md"
        >
          Close
        </button>
        {/* </Link> */}
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
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.phone}
            </div>
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
          Update
        </Button>
      </form>
    </div>
  </div>
  );
};

export default EditLead;


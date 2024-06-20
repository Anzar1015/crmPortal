// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Spinner from '../components/Spinner';

// const ShowLead = ({ leadId, setIsPopupOpen }) => {
//   const [lead, setLead] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:3000/leads/${leadId}`)
//       .then((response) => {
//         setLead(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, [leadId]);

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
//         <button
//           onClick={() => setIsPopupOpen(false)}
//           className="text-red-500 text-right"
//         >
//           X
//         </button>
//         <h1 className="text-3xl my-4">Show Lead</h1>
//         {loading ? (
//           <Spinner />
//         ) : (
//           <div className="w-full border-2 border-gray-800 rounded-xl p-4">
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Name</span>
//               <span>{lead.name}</span>
//             </div>
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Company</span>
//               <span>{lead.company}</span>
//             </div>
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Email</span>
//               <span>{lead.email}</span>
//             </div>
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Phone</span>
//               <span>{lead.phone}</span>
//             </div>
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Status</span>
//               <span>{lead.status}</span>
//             </div>
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Create Time</span>
//               <span>{new Date(lead.createdAt).toLocaleString()}</span>
//             </div>
//             <div className="my-4">
//               <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
//               <span>{new Date(lead.updatedAt).toLocaleString()}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShowLead;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const ShowLead = ({ leadId, setIsPopupOpen }) => {
  const [lead, setLead] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/leads/${leadId}`)
      .then((response) => {
        setLead(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [leadId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl">Show Lead</h1>
          <button
            onClick={() => setIsPopupOpen(false)}
            className="text-white hover:text-gray-800 focus:outline-none bg-red-600 p-2 rounded"
          >
            Close
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <div className="p-2 border border-gray-300 rounded">
              <span className="block text-lg font-medium text-gray-600">
                Name
              </span>
              <span className="block text-gray-800">{lead.name}</span>
            </div>
            <div className="p-2 border border-gray-300 rounded">
              <span className="block font-medium text-gray-600">Company</span>
              <span className="block  text-gray-800">{lead.company}</span>
            </div>
            <div className="p-2 border border-gray-300 rounded">
              <span className="block text-lg font-medium text-gray-600">
                Email
              </span>
              <span className="block  text-gray-800">{lead.email}</span>
            </div>
            <div className="p-2 border border-gray-300 rounded">
              <span className="block text-lg font-medium text-gray-600">
                Phone
              </span>
              <span className="block  text-gray-800">{lead.phone}</span>
            </div>
            <div className="p-2 border border-gray-300 rounded">
              <span className="block text-lg font-medium text-gray-600">
                Status
              </span>
              <span className="block  text-gray-800">{lead.status}</span>
            </div>
            <div className="p-2 border border-gray-300 rounded">
              <span className="block text-lg font-medium text-gray-600">
                Create Time
              </span>
              <span className="block  text-gray-800">
                {new Date(lead.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="p-2 border border-gray-300 rounded">
              <span className="block text-lg font-medium text-gray-600">
                Last Update Time
              </span>
              <span className="block  text-gray-800">
                {new Date(lead.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowLead;

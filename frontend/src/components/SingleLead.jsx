import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineMail, AiOutlineSetting } from "react-icons/ai";
import {
  MdOutlineDelete,
  MdOutlineSms,
  MdOutlineVisibility,
  MdOutlineWhatsapp,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import EmailPopup from "./Popup/EmailPopup"; // Import the new EmailPopup component
import SmsPopup from "./Popup/SmsPopup";
import WhatsappPopup from "./Popup/WhatsappPopup";
import ShowLead from "../pages/ShowLead";
import EditLead from "../pages/EditLead";

const SingleLead = ({ currentLeads }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSmsPopupOpen, setIsSmsPopupOpen] = useState(false);
  const [isWhatsappPopupOpen, setIsWhatsappPopupOpen] = useState(false);
  const [isShowLeadPopupOpen, setIsShowLeadPopupOpen] = useState(false);
  const [isEditLeadPopupOpen, setIsEditLeadPopupOpen] = useState(false);
  const [emailContent, setEmailContent] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [smsContent, setSmsContent] = useState({ to: "", body: "" });
  const [whatsappContent, setWhatsappContent] = useState({ to: "", body: "" });
  const [loading, setLoading] = useState(false);

  const [currentLeadName, setCurrentLeadName] = useState("");
  const [currentLeadId, setCurrentLeadId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleShowLeadClick = (leadId) => {
    setCurrentLeadId(leadId);
    setIsShowLeadPopupOpen(true);
  };

  const handleEditLeadClick = (leadId) => {
    setCurrentLeadId(leadId);
    setIsEditLeadPopupOpen(true);
  };

  const handleEmailClick = (email, name) => {
    setEmailContent({ to: email, subject: "", body: `Dear ${name},\n\n` });
    setCurrentLeadName(name);
    setIsPopupOpen(true);
  };

  const handleSendEmail = () => {
    setLoading(true);
    axios
      .post("http://localhost:3000/send-email", emailContent)
      .then((response) => {
        setIsPopupOpen(false);
        // alert("Email sent successfully!");
        toast.success("Email sent successfully!");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          "Error sending email:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to send email.");
        setLoading(false);
      });
  };

  const handleSmsClick = (phone, name) => {
    setSmsContent({ to: phone, body: `Dear ${name},\n\n` });
    setCurrentLeadName(name);
    setIsSmsPopupOpen(true);
  };

  const handleSendSms = () => {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/send-sms", smsContent)
      .then((response) => {
        setIsSmsPopupOpen(false);
        toast.success("SMS sent successfully!");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          "Error sending SMS:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      });
  };

  const handleWhatsappClick = (phone, name) => {
    setWhatsappContent({ to: phone, body: `Dear ${name},\n\n` });
    setCurrentLeadName(name);
    setIsWhatsappPopupOpen(true);
  };

  const handleSendWhatsapp = () => {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/send-whatsapp", whatsappContent)
      .then((response) => {
        setIsWhatsappPopupOpen(false);
        toast.success("WhatsApp message sent successfully!");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          "Error sending WhatsApp message:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      });
  };

  const toggleDropdown = (leadId) => {
    setDropdownOpen(dropdownOpen === leadId ? null : leadId);
  };

  return (
    <div className="relative">
      <table className="min-w-full border border-black dark:border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50 border border-black dark:border-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-500 uppercase tracking-wider"
            >
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentLeads.map((lead, index) => (
            <tr key={lead._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <Link to={`/leads/edit/${lead._id}`}>
                    <AiOutlineEdit className="text-yellow-600 cursor-pointer" />
                  </Link>
                  <Link to={`/leads/delete/${lead._id}`}>
                    <MdOutlineDelete className="text-red-600 cursor-pointer" />
                  </Link>
                  <MdOutlineSms
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleSmsClick(lead.phone)}
                  />
                </div>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500 relative ">
                <div className="relative group">
                  <AiOutlineSetting className="text-gray-600 cursor-pointer group-hover:block" />
                  <div className="absolute z-10 bg-white border border-gray-200 rounded shadow-md p-2 right-0 top-4 w-40 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible">
                    {/* <Link
                      to={`/leads/edit/${lead._id}`}
                      className="flex items-center p-2 hover:bg-gray-100"
                    >
                      <AiOutlineEdit className="text-yellow-600 mr-2" /> Edit
                    </Link> */}
                    <Link
                      to={`/leads/delete/${lead._id}`}
                      className="flex items-center p-2 hover:bg-gray-100"
                    >
                      <MdOutlineDelete className="text-red-600 mr-2" /> Delete
                    </Link>
                    <div
                      className="cursor-pointer flex items-center p-2 hover:bg-gray-100"
                      onClick={() => handleEditLeadClick(lead._id)}
                    >
                      <AiOutlineEdit className="text-blue-600 mr-2"/> Edit
                    </div>
                    <div
                      className="cursor-pointer flex items-center p-2 hover:bg-gray-100"
                      onClick={() => handleShowLeadClick(lead._id)}
                    >
                      <MdOutlineVisibility className="text-blue-600 mr-2"/> View
                    </div>
                    <div
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSmsClick(lead.phone, lead.name)}
                    >
                      <MdOutlineSms className="text-green-600 mr-2" /> Send SMS
                    </div>
                    <div
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleEmailClick(lead.email, lead.name)}
                    >
                      <AiOutlineMail className="text-blue-600 mr-2" /> Send
                      Email
                    </div>
                    <div
                      onClick={() => handleWhatsappClick(lead.phone, lead.name)}
                      className="flex items-center p-2  hover:bg-gray-100 cursor-pointer"
                    >
                      <MdOutlineWhatsapp className="text-green-600 mr-2" /> Send
                      Whats App
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500 ">
                {lead.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500 ">
                {lead.company}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500  cursor-pointer hover:text-blue-400"
                onClick={() => handleEmailClick(lead.email, lead.name)}
              >
                {lead.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500 ">
                {lead.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500 ">
                {lead.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-500 ">
                {new Date(lead.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowLeadPopupOpen && (
        <ShowLead
          leadId={currentLeadId}
          setIsPopupOpen={setIsShowLeadPopupOpen}
        />
      )}

{isEditLeadPopupOpen && (
        <EditLead
          leadId={currentLeadId}
          setIsPopupOpen={setIsEditLeadPopupOpen}
        />
      )}

      {isPopupOpen && (
        <EmailPopup
          emailContent={emailContent}
          setEmailContent={setEmailContent}
          handleSendEmail={handleSendEmail}
          setIsPopupOpen={setIsPopupOpen}
          loading={loading}
          currentLeadName={currentLeadName}
        />
      )}

      {isSmsPopupOpen && (
        <SmsPopup
          smsContent={smsContent}
          setSmsContent={setSmsContent}
          handleSendSms={handleSendSms}
          setIsPopupOpen={setIsSmsPopupOpen}
          loading={loading}
          currentLeadName={currentLeadName}
        />
      )}

      {isWhatsappPopupOpen && (
        <WhatsappPopup
          whatsappContent={whatsappContent}
          setWhatsappContent={setWhatsappContent}
          handleSendWhatsapp={handleSendWhatsapp}
          setIsWhatsappPopupOpen={setIsWhatsappPopupOpen}
          loading={loading}
          currentLeadName={currentLeadName}
        />
      )}
    </div>
  );
};

export default SingleLead;

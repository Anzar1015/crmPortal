import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useSearchContext } from "../SearchContext";
import Pagination from "../components/Pagination";
import SingleLead from "../components/SingleLead";
import Search from "../components/Search";
import CreateLead from "./CreateLead";
import { useModalContext } from "../ModalContext";
import { useStatus } from "../StatusContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchQuery } = useSearchContext();
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10); // Number of leads per page
  const [selectedStatus, setSelectedStatus] = useState("All"); // Default status
  const { statusOptions } = useStatus();
  const { closeCreateLeadModal, openCreateLeadModal, showCreateLead } =
    useModalContext();


  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/leads");
        setLeads(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  

  useEffect(() => {
    const filteredLeads = leads.filter((lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLeads(filteredLeads);
    setSearchPerformed(true);
  }, [leads, searchQuery]);

  // Filtered leads based on selected status
  const filteredLeadsByStatus =
    selectedStatus === "All"
      ? filteredLeads
      : filteredLeads.filter((lead) => lead.status === selectedStatus);

  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeadsByStatus.slice(
    indexOfFirstLead,
    indexOfLastLead
  );
  const totalPages = Math.ceil(filteredLeadsByStatus.length / leadsPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };


  return (

    <div className="p-4 m-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl mb-4 sm:mb-0">Lead List</h1>

        <div className="flex items-center space-x-4 ml-auto mb-4">
          <h1 className="text-sxl border border-black text-black dark:text-white p-2 rounded bg-gray-300 dark:bg-gray-600 cursor-pointer">
            Sort by Status
          </h1>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="input-field w-40 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="All">All</option>
            {statusOptions.map((statusOption, index) => (
              <option key={index} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button onClick={openCreateLeadModal}>
            <h1 className="text-sxl border border-black text-black dark:text-white p-2 rounded bg-gray-300 dark:bg-gray-600 cursor-pointer">
              Add Lead
            </h1>
          </button>
          <Link to="/import-leads">
            <h1 className="text-sxl border border-black text-black dark:text-white p-2 rounded bg-gray-300 dark:bg-gray-600 cursor-pointer">
              Import Leads
            </h1>
          </Link>
          {showCreateLead && <CreateLead onClose={closeCreateLeadModal} />}
        </div>
        <Search />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          {searchPerformed && filteredLeadsByStatus.length === 0 ? (
            <p className="text-gray-500 text-center">
              No leads found for '{searchQuery}'.
            </p>
          ) : (
            <SingleLead
              currentLeads={currentLeads}
              onClose={closeCreateLeadModal}
              showCreateLead={showCreateLead}
            />
          )}
        </div>
      )}
      <div className="flex justify-center  bg-transparent">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Home;

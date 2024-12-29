import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiClient from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import Pagination from '../../Pagination';
import '../../utils/Loader';
import Loader from '../../utils/Loader';
const Consignment = () => {
  const { user } = useContext(AuthContext);
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riders, setRiders] = useState([]); // Store all riders
  const [filteredRiders, setFilteredRiders] = useState({});
  const [selectedRiders, setSelectedRiders] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [tempParcels,setTempParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [query,setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all'); // State to track active tab

  const [parcels, setParcels] = useState([]);
  const [parcelId, setParcelId] = useState('');
  const itemsPerPage = 10;



  // Fetch consignments based on active tab and search term
  useEffect(() => {
    setLoading(true);

      const fetchConsignments = async () => {
        setLoading(true);
        if(user){
          console.log(`User role : ${user?.role}`);
          try {
            let endpoint = '/api/consignment';

            if (user?.role !== 'Admin') {
              endpoint = `/api/consignment/by-email/${user.email}`;
            }

            // Add tab-specific filtering
            const response = await apiClient.get(endpoint, {
              params: {
                parcel: searchTerm,
                status: activeTab !== 'all' ? activeTab : undefined, // Filter by status for specific tabs
              },
            });

            if(user?.role==='Marchant'){
              let temp=[];
              response.data.forEach((consignment) => {
                console.log(`ID: ${consignment._id}, Status: ${consignment.status}, ${activeTab} ${consignment.status===activeTab}`)
                  if(activeTab==='all' || consignment.status===activeTab){
                    temp.push(consignment);
                  }

              });
              setConsignments(temp);
            }
            else setConsignments(response.data);
            setTempParcels(consignments);
          } catch (error) {
            setConsignments([]);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchConsignments();

  }, [user?.email, user?.role, searchTerm, activeTab, parcels]);


  const dateFormat = (timestamp)=>{

    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0'); // Get day and ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;

  }

  const approveParcel = async (parcelId) => {
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/approve`);

      setParcels(parcels.filter(parcel => parcel._id !== parcelId));

      console.log('Parcel approved:', response.data);
      // Remove approved parcel from pending list
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: " Parcel Successfully Approved ",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error approving parcel', error);
    }
  };

  const rejectParcel = async (parcelId) => {
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/reject`);
      setParcels(parcels.filter(parcel => parcel._id !== parcelId));
      console.log('Parcel approved:', response.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: " Parcel Has been Rejected ",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error rejecting parcel', error);
    }
  };

  // Dynamically fetch filtered riders based on search term
  useEffect(() => {

    const fetchFilteredRiders = async () => {
      const results = {};

      await Promise.all(
        tempParcels.map(async (parcel) => {
          const searchTerm = searchTerms[parcel._id];
          if (searchTerm) {
            try {
              const response = await apiClient.get("/api/user/roleby/role", {
                params: { role: "Delivery Boy", boy: searchTerm },
              });
              results[parcel._id] = response.data;
            } catch (error) {
              console.error("Error fetching filtered riders:", error);
              results[parcel._id] = [];
            }

          } else {
            results[parcel._id] = riders; // Default to all riders
          }
        })
      );

      setFilteredRiders(results);
    };

    fetchFilteredRiders();
  }, [searchTerms, tempParcels, riders]);


  // Update selected rider for a parcel
  const handleRiderChange = (parcelId, riderId) => {
    setSelectedRiders((prev) => ({
      ...prev,
      [parcelId]: riderId,
    }));
  };

  // Update search term for a specific parcel
  const handleSearchChange = (parcelId, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [parcelId]: value,
    }));
  };


  const handleSubmit = async (parcelId) => {
    const selectedRiderId = selectedRiders[parcelId];
    if (!selectedRiderId) {
      // alert("Please select a delivery boy!");
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Please select a delivery boy",
        showConfirmButton: false,
        timer: 1800,
      });
      return;
    }

    try {

      const response = await apiClient.patch('/api/assign-rider', {

        consignmentId: parcelId,
        riderId: selectedRiderId,
      });

      setParcels(tempParcels.filter((parcel) => parcel._id !== parcelId)); // Remove assigned parcel
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Assigned Rider for this Parcel",
        showConfirmButton: false,
        timer: 1800,
      });
    } catch (error) {
      console.error("Error assigning rider:", error);
      //alert("Failed to assign rider.");
      Swal.fire({
        position: "top-center",
        icon: "danger",
        title: "Failed to assign rider",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const dynamicView = (row)=>{

    if(activeTab.toLocaleLowerCase()==='in review'){
      return <td className="py-0.5 px-2 text-center border-b">
      <Link to={`/adminboard/parcel-review/${encodeURIComponent(row.semail)||''}`}>
       <button className="bg-blue-600 text-white px-2 py-1 rounded">Data Entry</button>
     </Link>
     {/* <Link to={`/userboard/con-unique/${consignments._id}`}>
        <button className="bg-blue-600 text-white px-2 py-1 rounded">
          Data Entry
        </button>
      </Link> */}
   </td>
    }
    else if(activeTab.toLocaleLowerCase()==="pending"){
      return <div className="py-0.5 px-4 text-center border-b">
      <div className="space-x-2">
        <button
          className="bg-green-600 text-white py-1 px-2 rounded"
          onClick={() => approveParcel(row._id)}
        >
          Approve
        </button>
        <button
          className="bg-red-600 text-white py-1 px-2 rounded"
          onClick={() => rejectParcel(row._id)}
        >
          Reject
        </button>
      </div>
    </div>;
    }
    else if(activeTab.toLocaleLowerCase()==="approved"){
      return <>
        <td className="py-0.5 px-4 text-center">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded mb-2 w-full"
                        placeholder="Search Delivery Boy"
                        value={searchTerms[row._id] || ""}
                        onChange={(e) => handleSearchChange(row._id,  e.target.value)}
                      />
                      <select
                        className="border px-2 py-1 rounded w-full"
                        value={selectedRiders[row._id] || ""}
                        onChange={(e) => handleRiderChange(row._id, e.target.value)}
                      >
                        <option value="" disabled>
                          Select Delivery Boy
                        </option>
                        {(filteredRiders[row._id] || riders).map((rider) => (
                          <option key={rider._id} value={rider._id}>
                            {rider.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSubmit(row._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mt-2 w-full"
                      >
                        Assign
                      </button>
                    </td>
      </>
    }
    else{
      return <Link to={`/userboard/con-unique/${row._id}`}><button className="bg-blue-600 text-white px-2 py-0.5 rounded">View</button></Link>;
    }
  }



  // Handle search input
  const handleSearch = () => {
    setSearchTerm(query);
    setActiveTab('all')
    setCurrentPage(1);
  };

  const handleSearchValue = (e)=>{
    if(e.target.value!==''){
      setQuery(e.target.value);
    }else{
      setSearchTerm('')
      setQuery('')
    }
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consignments.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 p-10 w-screen">
      {/* Search Bar */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Consignments</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Consignment"
            value={query}
            onChange={(e) => handleSearchValue(e)} // Update searchTerm on input
            className="border px-4 py-0.5 focus:outline-none"
          />
          <button
            onClick={handleSearch} // Trigger search only on button click
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['all', 'in review', 'pending', 'approved', 'delivered', 'cancelled', 'asigned', 'pickedup'].map((tab) => (
          <button
            key={tab}
            onClick={() => {


              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-1 font-medium rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {tab.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Consignment Table */}
      <div className="p-8 bg-white shadow-sm">
        <table className="min-w-full printable-label">
          <thead>
            <tr>
              <th className="py-0.5 px-2 text-center border-b">Id</th>
              <th className="py-0.5 px-2 text-center border-b">Invoice</th>
              <th className="py-0.5 px-2 text-center border-b">Receiver Number</th>
              <th className="py-0.5 px-2 text-center border-b">Receiver Name</th>
              <th className="py-0.5 px-2 text-center border-b">COD Amount</th>
              <th className="py-0.5 px-2 text-center border-b">R.Address</th>
              <th className="py-0.5 px-2 text-center border-b">Status</th>
              <th className="py-0.5 px-2 text-center border-b">{activeTab==='approved'? 'Approved Date':'Created Date'}</th>
              <th className="py-0.5 px-2 text-center border-b">Details</th>

            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="py-0.5 px-2 text-center border-b">{row._id}</td>
                  <td className="py-0.5 px-2 text-center border-b">{row.invoice}</td>
                  <td className="py-0.5 px-2 text-center border-b">{row.rphone}</td>
                  <td className="py-0.5 px-2 text-center border-b">{row.rname}</td>
                  <td className="py-0.5 px-2 text-center border-b">{row.codAmount}</td>
                  <td className="py-0.5 px-2 text-center border-b">{row.raddress}</td>
                  <td className="py-0.5 px-2 text-center border-b">
                    <span
                      className={`px-2 py-0.5 rounded-lg ${
                        row.status === 'pending'
                          ? 'bg-yellow-400 text-white'
                          : row.status === 'approved'
                          ? 'bg-green-600 text-white'
                          : row.status === 'cancelled'
                          ? 'bg-red-600 text-white'
                          : 'bg-green-400 text-white'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{dateFormat(row.status==='approved'?row.approvalDate:row.createdAt)}</td>
                  <td className="py-0.5 px-2 text-center border-b">
                    {user?.role === 'Admin' ? dynamicView(row):
                      <Link to={`/userboard/con-unique/${row._id}`}><button className="bg-blue-600 text-white px-2 py-0.5 rounded">View</button></Link>
                    }
                  {/* <Link to={`/userboard/con-unique/${row._id}`}><button className="bg-blue-600 text-white px-2 py-0.5 rounded">View</button></Link> */}
                    {/* <button className="bg-blue-600 text-white px-2 py-0.5 rounded">View</button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            activePage={currentPage}
            totalPages={Math.ceil(consignments.length / itemsPerPage)}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Consignment;

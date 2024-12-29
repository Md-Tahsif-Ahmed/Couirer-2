import React, { useContext, useEffect, useState } from "react";
import apiClient from '../axiosInstance';
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../Pages/Shared/Navbar";
import BSidebar from "./Shared/Bsidebar";
const Bpage = () => {
  const [totalDelivered, setTotalDelivered] = useState(0);
  const { user } = useContext(AuthContext);

  // Fetch total delivered parcels
  useEffect(() => {
    const fetchTotalDelivered = async () => {
      try {
        if (user?.email) {
          const response = await apiClient.get(`/api/consignment/total/boydelivered/${user.email}`);
          if (response.data.success) {
            setTotalDelivered(response.data.totalDelivered);
          } else {
            console.error('Error:', response.data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching total delivered:', error.response?.data || error.message);
      }
    };
  
    fetchTotalDelivered();
  }, [user?.email]);

    // Fetch total delivered parcels
    useEffect(() => {
        const fetchTotalDelivered = async () => {
            try {
                if (user?.email) {
                    console.log('rrr',user)
                    // const response = await apiClient.get(`/api/consignment/total/boydelivered`, {
                    //     params: { boyEmail: user.email }, // Pass boyEmail dynamically
                    // });
                    const response = await apiClient.get('/api/consignment/total/boydelivered/user.email')
                    console.log('API Response:', response.data);
                    if (response.data.success) {
                        setTotalDelivered(response.data.totalDelivered);
                    }
                }
            } catch (error) {
                console.error('Error fetching total delivered:', error);
            }
        };

        fetchTotalDelivered();
    }, [user?.email]); // Add user?.email as a dependency






  return (
    <div>
      <Navbar />
      <div className="lg:flex bg-gray-100 min-h-screen">
        <BSidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
          {/* Warning Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h1 className="text-xl font-semibold text-red-600 text-center">
              *** ভুলেও ভুল নোট দিবেন না ***
            </h1>
            <ol className="list-decimal text-gray-700 pl-6 mt-4">
              <li>
                <span className="text-purple-600 font-semibold">টপস্পীড</span>{" "}
                কুরিয়ার{" "}
                <span className="text-red-600 font-semibold">আচার-ব্যবহার</span>{" "}
                বিষয়ে যথেষ্ট সেন্সেটিভ।
              </li>
              <li>
                গ্রাহক কিংবা মার্চেন্ট কারো সাথেই{" "}
                <span className="text-red-600 font-semibold">
                  কোনোরূপ খারাপ ব্যবহার করা যাবে না
                </span>{" "}
                কিংবা উচ্চস্বরে কথাও বলা যাবে না।{" "}
              </li>
              <li>
                খারাপ ব্যবহারের{" "}
                <span className="text-red-600 font-semibold">
                  সর্বনিম্ন শাস্তি চাকুরি থেকে অব্যাহতি।
                </span>
                তাই সবার প্রতি অনুরোধ, কোনোভাবেই খারাপ ব্যবহার করবেন না।{" "}
              </li>
              <li>
                <span className="text-red-600 font-semibold">টিপস চাওয়া</span>,
                হোম-ডেলিভারি না দিয়ে{" "}
                <span className="text-red-600 font-semibold">
                  রাস্তায় ডেকে আনানো
                </span>
                , মার্চেন্ট কে{" "}
                <span className="text-red-600 font-semibold">
                  না জানিয়ে ক্যান্সেল
                </span>{" "}
                করা, এগুলো গুরোতর অপরাধ।{" "}
              </li>
              <li>
                পার্সেল কোনোভাবেই ড্যামেজ বা হারিয়ে ফেলা যাবে না,
                <span className="text-red-600 font-semibold">
                  {" "}
                  রিটার্ণ-পার্সেল যত্নসহকারে
                </span>{" "}
                নিতে হবে।
              </li>
              <li>
                ওয়েবসাইট বা অ্যাপ্সে{" "}
                <span className="text-red-600 font-semibold">
                  ইনস্ট্যান্ট আপডেট
                </span>{" "}
                দিতে হবে। অন্যথায় আপনার ডেলিভারি হিসাবে গণ্য হবে না।
              </li>
              <li>
                কাস্টমার পার্সেল চ্যাক করতে চাইলে, আপনার সামনেই চ্যাক করতে
                বলবেন। ভিতরে নিয়ে যেতে চাইলে অবশ্যই মার্চেন্টের পার্মিশন নিবেন
                এবং দেখে নিবেন সঠিক পার্সেল ফেরত দিচ্ছে কি না।
              </li>
            </ol>
          </div>

          {/* Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">My Pickup Request</h2>
              <p className="text-2xl font-bold">0</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Hub's Pickup Request</h2>
              <p className="text-2xl font-bold">151</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Assigned RTN List</h2>
              <p className="text-2xl font-bold">0</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Pick N Drop Request</h2>
              <p className="text-2xl font-bold">0</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Pending Parcels</h2>
              <p className="text-2xl font-bold">2</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Delivery List</h2>
              <p className="text-lg font-bold">{totalDelivered}</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">RTN List</h2>
              <p className="text-lg font-bold">View</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Performance</h2>
              <p className="text-lg font-bold">View Details</p>
            </button>
            <button className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Salaries</h2>
              <p className="text-lg font-bold">View Salaries</p>
            </button>
          </div>

          {/* Recent Ratings Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Ratings</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Parcel ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Rating</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      18-11-2024
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-500 bg-white">
                      109331414
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-md">
                        Excellent
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      Great Service
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      14-11-2024
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-500 bg-white">
                      100368824
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-md">
                        Good
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      Thanks Bro
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      10-11-2024
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-500 bg-white">
                      107327697
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-md">
                        Excellent
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      Responsive
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      07-11-2024
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-500 bg-white">
                      107029599
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-md">
                        Excellent
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      Nice
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      05-10-2024
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-500 bg-white">
                      100362048
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-md">
                        Good
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 bg-white">
                      Good
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="mt-4 text-blue-500">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Bpage;

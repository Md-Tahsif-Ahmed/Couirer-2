import React, { useContext, useEffect, useState } from "react";
import apiClient from '../../../axiosInstance';
import { AuthContext } from "../../../contexts/AuthContext";
import Navbar from "../../Shared/Navbar";
import Sidebar from "../../Shared/Sidebar";
const MarchantAcc = () => {
  const { user, token } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [camount, setCamount] = useState("");
  const [receivableAmount, setReceivableAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [claims, setClaims] = useState([]);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch balances and claims
  useEffect(() => {
    if (user?.email) {
      const fetchBalancesAndClaims = async () => {
        try {
          // Fetch balance data
          const balanceResponse = await apiClient.get(
            `/api/user/email/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPendingAmount(balanceResponse.data.pendingBalance);
          setReceivableAmount(balanceResponse.data.balance);

          // Fetch claims data
          const claimsResponse = await apiClient.get(
            `/api/claim/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setClaims(claimsResponse.data.claims);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch data");
          setLoading(false);
        }
      };

      fetchBalancesAndClaims();
    }
  }, [user, token]);

  const handleClaimCash = () => {
    setIsFormOpen(!isFormOpen);
    setWarning("");
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > receivableAmount) {
      setWarning("You can't claim more than your balance.");
    } else {
      setWarning("");
      setCamount(value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // Submit the claim
      await apiClient.post(
        "/api/claim",
        { claimAmount: camount, userEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Introduce a delay and refetch claims after submission
      setTimeout(async () => {
        try {
          const claimsResponse = await apiClient.get(
            `/api/claim/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setClaims(claimsResponse.data.claims); // Update state with the latest claims
          setWarning(""); // Clear any warnings
        } catch (fetchError) {
          console.error("Error refetching claims:", fetchError);
          setWarning("Failed to refresh claims. Please try again.");
        }
      }, 2000); // 2-second delay before fetching new data

      // Clear form
      setCamount("");
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting claim:", error);
      setWarning("Failed to submit claim. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  const totalCamount = claims.reduce((total, claim) => {
    return total + (claim?.claimAmount || 0);
  }, 0);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Merchant Account</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">Pending Amount:</p>
              <p className="text-2xl font-bold text-red-500">${pendingAmount}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">Receivable Amount:</p>
              <p className="text-2xl font-bold text-green-500">${receivableAmount}</p>
            </div>
          </div>

          <button
            onClick={handleClaimCash}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 mb-4"
          >
            Claim Cash
          </button>

          {isFormOpen && (
            <form
              onSubmit={handleFormSubmit}
              className="bg-white p-4 rounded-md shadow-md mb-4"
            >
              <label htmlFor="camount" className="block text-lg font-medium mb-2">
                Enter Claim Amount
              </label>
              <input
                type="number"
                id="camount"
                value={camount}
                onChange={handleAmountChange}
                placeholder={`Max: $${receivableAmount}`}
                className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-blue-500"
                disabled={formLoading}
              />
              {warning && <p className="text-red-500 text-sm mb-2">{warning}</p>}
              <button
                type="submit"
                className={`w-full ${
                  formLoading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
                } text-white font-semibold py-2 rounded-md transition duration-300`}
                disabled={formLoading}
              >
                {formLoading ? "Submitting..." : "Submit Claim"}
              </button>
            </form>
          )}

          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-3">Your Claims</h2>
            {claims.length > 0 ? (
              <ul className="space-y-3">
                {claims.map((claim, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-3 border-b last:border-none"
                  >
                    <div>
                      <p>Claim Amount: ${claim?.claimAmount || 0}</p>
                      <div className="flex space-x-2">
                        <p className="text-sm text-gray-500">
                          Date:{" "}
                          {claim?.createdAt
                            ? new Date(claim.createdAt).toLocaleDateString()
                            : "Invalid Date"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Time:{" "}
                          {claim?.createdAt
                            ? new Date(claim.createdAt).toLocaleTimeString()
                            : "Invalid Time"}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">{claim?.status || "Unknown"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No claims made yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarchantAcc;

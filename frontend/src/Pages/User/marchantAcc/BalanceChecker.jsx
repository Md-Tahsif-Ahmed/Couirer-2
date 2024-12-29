import React, { useState } from "react";
import { TbHandClick } from "react-icons/tb";
import apiClient from '../../../axiosInstance';
const BalanceChecker = ({ user, token }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Track if balance is checked

  const fetchBalance = async () => {
    if (!user?.email) {
      alert("User email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get(
        `/api/user/email/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
      setIsChecked(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isChecked ? (
        <button
          onClick={fetchBalance}
          className="flex items-center justify-between gap-4 border border-green-500 text-sm text-green-500 font-semibold pr-4 py-1 rounded-full shadow-md hover:bg-green-100 focus:outline-none"
          disabled={loading}
          aria-live="polite"
        >
          <span className="flex items-center justify-center w-6 h-7 bg-white text-green-500 rounded-full shadow-inner">
            <TbHandClick className="w-5 h-5" />
          </span>
          <span className="whitespace-nowrap">{loading ? "Fetching..." : "Check Balance"}</span>
        </button>
      ) : (
        <div className="flex items-center justify-between gap-4 border border-green-500 text-green-500 font-semibold px-1 lg:px-4 py-1 rounded-full shadow-md text-xs lg:text-sm">
          <p className="text-sm whitespace-nowrap">
            <strong>
              {balance !== null ? `${parseFloat(balance).toFixed(2)} TK` : "Balance unavailable"}
            </strong>
          </p>

          <button
            className="bg-green-400 text-white px-3 py-1 text-sm rounded-full hover:bg-green-600"
            onClick={() => alert("Details feature coming soon!")}
          >
            Details
          </button>
        </div>
      )}
    </div>

  );
};

export default BalanceChecker;

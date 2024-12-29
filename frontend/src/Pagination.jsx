import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ activePage, totalPages, onChange }) => {
  const getItemProps = (index) => ({
    className: `flex items-center justify-center w-10 h-10 rounded-full transition ${
      activePage === index ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"
    }`,
    onClick: () => onChange(index),
  });

  const next = () => {
    if (activePage === totalPages) return;
    onChange(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    onChange(activePage - 1);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Previous Button */}
      <button
        onClick={prev}
        disabled={activePage === 1}
        className={`flex items-center space-x-1 text-gray-700 hover:text-black transition disabled:opacity-50`}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={next}
        disabled={activePage === totalPages}
        className={`flex items-center space-x-1 text-gray-700 hover:text-black transition disabled:opacity-50`}
      >
        <span>Next</span>
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;

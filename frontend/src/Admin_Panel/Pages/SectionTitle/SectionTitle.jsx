import React from 'react';

const SectionTitle = ({heading, searchTerm, handleSearch}) => {
    
    return (
        <div>
            <div className="flex justify-between mb-8 space-x-2 pr-2">
              <h2 className="lg:text-xl font-semibold text-xs">{heading}</h2>
              <input
                type="text"
                placeholder="Search "
                value={searchTerm}
                onChange={handleSearch}
                className="border focus:outline-none px-4 py-0.5"
              />
           
            </div>
        </div>
    );
};

export default SectionTitle;
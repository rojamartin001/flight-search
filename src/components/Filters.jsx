// src/components/Filters.jsx
import React from 'react';

const Filters = ({ filters, onFilterChange, uniqueAirlines }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 space-y-4 border border-blue-300">
      <h2 className="text-xl font-bold text-blue-700">🎛 Flight Filters</h2>

      {/* Price Range Filter */}
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={onFilterChange}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={onFilterChange}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Airline Filter */}
      <div>
        <label className="block mb-1">Airline</label>
        <div className="flex gap-4 flex-wrap">
          {uniqueAirlines.map((airline, index) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="checkbox"
                name="airlines"
                value={airline}
                checked={filters.airlines.includes(airline)}
                onChange={onFilterChange}
              />
              {airline}
            </label>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="flex flex-col">
        <label className="mb-1">Sort By</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={onFilterChange}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="">-- Select --</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="durationShort">Duration: Short to Long</option>
          <option value="durationLong">Duration: Long to Short</option>
          <option value="airlineAZ">Flight Name: A-Z</option>
          <option value="airlineZA">Flight Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

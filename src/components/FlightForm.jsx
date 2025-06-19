// src/components/FlightForm.jsx
import React, { useState } from 'react';

const FlightForm = ({ onAddFlight }) => {
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    price: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.airline) newErrors.airline = 'Airline is required';
    if (!formData.flightNumber.trim()) newErrors.flightNumber = 'Flight number is required';
    if (!formData.departureCity) newErrors.departureCity = 'Select a departure city';
    if (!formData.arrivalCity) newErrors.arrivalCity = 'Select an arrival city';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date required';
    if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date required';
    if (!formData.departureTime) newErrors.departureTime = 'Departure time required';
    if (!formData.arrivalTime) newErrors.arrivalTime = 'Arrival time required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddFlight({ ...formData, price: Number(formData.price) });

    setFormData({
      airline: '',
      flightNumber: '',
      departureCity: '',
      arrivalCity: '',
      departureDate: '',
      departureTime: '',
      arrivalDate: '',
      arrivalTime: '',
      price: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Add New Flight</h2>

      {/* Airline Dropdown */}
      <div>
        <label className="block">Airline *</label>
        <select
          name="airline"
          value={formData.airline}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Airline</option>
          <option value="Air India">Air India</option>
          <option value="IndiGo">IndiGo</option>
          <option value="SpiceJet">SpiceJet</option>
          <option value="Vistara">Vistara</option>
        </select>
        {errors.airline && <p className="text-red-500 text-sm">{errors.airline}</p>}
      </div>

      {/* Flight Number */}
      <div>
        <label className="block">Flight Number *</label>
        <input
          type="text"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.flightNumber && <p className="text-red-500 text-sm">{errors.flightNumber}</p>}
      </div>

      {/* Cities Dropdown */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Departure City *</label>
          <select
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          {errors.departureCity && <p className="text-red-500 text-sm">{errors.departureCity}</p>}
        </div>
        <div>
          <label className="block">Arrival City *</label>
          <select
            name="arrivalCity"
            value={formData.arrivalCity}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          {errors.arrivalCity && <p className="text-red-500 text-sm">{errors.arrivalCity}</p>}
        </div>
      </div>

      {/* Dates and Times */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Departure Date *</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
        </div>
        <div>
          <label className="block">Arrival Date *</label>
          <input
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.arrivalDate && <p className="text-red-500 text-sm">{errors.arrivalDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Departure Time *</label>
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.departureTime && <p className="text-red-500 text-sm">{errors.departureTime}</p>}
        </div>
        <div>
          <label className="block">Arrival Time *</label>
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.arrivalTime && <p className="text-red-500 text-sm">{errors.arrivalTime}</p>}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block">Price *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Add Flight
      </button>
    </form>
  );
};

export default FlightForm;

import React, { useEffect, useState } from 'react';
import FlightForm from '../components/FlightForm';
import Filters from '../components/Filters';

const Home = () => {
  const [flights, setFlights] = useState([]);

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    airlines: [],
    sort: '',
  });

  // ✅ Fetch flights from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/flights')
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.error('Error fetching flights:', err));
  }, []);

  // ✅ POST flight to backend
  const handleAddFlight = (newFlight) => {
    const departure = new Date(`${newFlight.departureDate}T${newFlight.departureTime}`);
    const arrival = new Date(`${newFlight.arrivalDate}T${newFlight.arrivalTime}`);
    const durationMs = arrival - departure;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    const flightWithDuration = {
      ...newFlight,
      duration: `${hours}h ${minutes}m`,
    };

    // ✅ Save to backend
    fetch('http://localhost:5000/api/flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flightWithDuration),
    })
      .then((res) => res.json())
      .then(() => {
        setFlights((prev) => [...prev, flightWithDuration]);
      })
      .catch((err) => console.error('Error adding flight:', err));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'airlines') {
      setFilters((prev) => ({
        ...prev,
        airlines: checked
          ? [...prev.airlines, value]
          : prev.airlines.filter((a) => a !== value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Filter flights
  const filteredFlights = flights.filter((flight) => {
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const matchPrice = flight.price >= min && flight.price <= max;
    const matchAirline =
      filters.airlines.length === 0 || filters.airlines.includes(flight.airline);
    return matchPrice && matchAirline;
  });

  // ✅ Sort flights
  const sortedFlights = [...filteredFlights];
  if (filters.sort === 'priceLow') {
    sortedFlights.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'priceHigh') {
    sortedFlights.sort((a, b) => b.price - a.price);
  } else if (filters.sort === 'durationShort') {
    sortedFlights.sort((a, b) => {
      const [ah, am] = a.duration.split(/[hm ]+/).map(Number);
      const [bh, bm] = b.duration.split(/[hm ]+/).map(Number);
      return ah * 60 + am - (bh * 60 + bm);
    });
  } else if (filters.sort === 'durationLong') {
    sortedFlights.sort((a, b) => {
      const [ah, am] = a.duration.split(/[hm ]+/).map(Number);
      const [bh, bm] = b.duration.split(/[hm ]+/).map(Number);
      return (bh * 60 + bm) - (ah * 60 + am);
    });
  } else if (filters.sort === 'airlineAZ') {
    sortedFlights.sort((a, b) => a.airline.localeCompare(b.airline));
  } else if (filters.sort === 'airlineZA') {
    sortedFlights.sort((a, b) => b.airline.localeCompare(a.airline));
  }

  const uniqueAirlines = [...new Set(flights.map((f) => f.airline))];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FlightForm onAddFlight={handleAddFlight} />

      {flights.length > 0 && (
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          uniqueAirlines={uniqueAirlines}
        />
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Flight List</h2>
        {sortedFlights.length === 0 ? (
          <p>No flights match your filters.</p>
        ) : (
          <ul className="space-y-4">
            {sortedFlights.map((flight, index) => (
              <li key={index} className="border p-4 rounded shadow">
                <p className="font-bold">
                  {flight.airline} ({flight.flightNumber})
                </p>
                <p>
                  {flight.departureCity} → {flight.arrivalCity}
                </p>
                <p>
                  {flight.departureDate} {flight.departureTime} →{' '}
                  {flight.arrivalDate} {flight.arrivalTime}
                </p>
                <p>Duration: {flight.duration}</p>
                <p>Price: ₹{flight.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;

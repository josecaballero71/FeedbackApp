import React, { useEffect, useState } from 'react';

const CenterSelect = () => {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('http://localhost:4000/center');
        const { centers } = await response.json();
        setCenters(centers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCenters();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCenter(selectedValue);
    localStorage.setItem("center", selectedValue);
  };

  useEffect(() => {
    localStorage.setItem("center", selectedCenter);
  }, [selectedCenter]);

  return (
    <div className='select-container'>
      <label htmlFor='center'>Center</label>
      <select id='center' value={selectedCenter} onChange={handleSelectChange}>
        <option value={0}>Select a center</option>
        {centers.map((center) => (
          <option key={center.Center_Id} value={center.Facility}>
            {center.Facility}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CenterSelect;
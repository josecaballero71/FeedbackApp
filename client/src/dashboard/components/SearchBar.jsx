import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import Title from '../../utils/components/Title';
import Button from '../../utils/components/Button';

export default function SearchBar() {
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
        localStorage.setItem('center', selectedValue);
    };

    function showDetail() {
        const currentPath = window.location.pathname;

        if (currentPath === '/Dashboard' || currentPath === '/dashboard') {
            const center = document.getElementById('center').value;
            const date = document.getElementById('date').value;

            switch (true) {
                case center !== undefined && date !== '':
                    const centerId = center;
                    const currentDate = date;
                    localStorage.setItem('searchDate', currentDate);
                    localStorage.setItem('searchCenter', centerId);
                    window.location.href = '/detail';
                    break;

                default:
                    alert('Please enter a Center and a Date to search');
                    break;
            }
        } else {
            const center = document.getElementById('center').value;
            const date = document.getElementById('date').value;

            switch (true) {
                case center !== undefined && date !== '':
                    const centerId = center;
                    const currentDate = date;
                    localStorage.setItem('searchDate', currentDate);
                    localStorage.setItem('searchCenter', centerId);
                    location.reload()

                    break

                default:
                    alert('Please enter a Center and a Date to search');
                    break;
            }

        }
    }

    return (
        <div className="search-bar">
            <Title blueTitle="LOOKUP" greenTitle="DASHBOARD " />
            <div className="search-bar-right">
                <div className="select-container">
                    <label htmlFor="center">Center</label>
                    <select id="center" value={selectedCenter} onChange={handleSelectChange}>
                        <option value={0}>Select a center</option>
                        {centers.map((center) => (
                            <option key={center.CenterId} value={center.FacilityName}>
                                {center.FacilityName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select-container">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" />
                </div>

                <div className="button-container">
                    <Button content="GO" execution={showDetail} />
                </div>
            </div>
        </div>
    );
}
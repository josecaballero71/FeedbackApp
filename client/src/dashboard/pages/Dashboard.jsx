import React, { useState, useEffect } from 'react';
import Header from '../../utils/components/Header';
import StatusBar from '../components/StatusBar';
import SearchBar from '../components/SearchBar';
import requireAuth from '../../utils/use-cases/requireAuth';
import './Dashboard.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import images from '../../utils/images/images';
import '../../utils/components/AppDatePicker.css';

function Dashboard() {
    const [information, setInformation] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().toISOString());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/information');
                const { information } = await response.json();
                setInformation(information);
            } catch (error) {
                console.error(error);
            }
        };

        const interval = setInterval(fetchData, 3000);

        fetchData();

        return () => {
            clearInterval(interval);
        };
    }, []);


    const handleDateChange = (date) => {
        setSelectedDate(date.toISOString());
    };

    const filteredData = Object.entries(information).reduce((filtered, [date, data]) => {
        if (moment(date, 'YYYY/MM/DD', true).isValid() && date === moment(selectedDate).format('YYYY/MM/DD')) {
            return [...filtered, ...data];
        }
        return filtered;
    }, []);

    console.log(filteredData)

    return (
        <>
            <Header />
            <div className="content">
                <SearchBar />
                <div className="dashboard-title">
                    <h1>Summary</h1>
                    <div className="date-picker-container">
                        <div className='date-picker-container'>
                            <button className='date-button' onClick={() => document.getElementById('date-picker').click()}>
                                <img src={images.calendar} alt='' />
                            </button>
                            <DatePicker selected={new Date(selectedDate)} onChange={handleDateChange} id='date-picker' />
                        </div>
                    </div>
                </div>
                <div className="dashboard-table-title">
                    <h2 className="center">CENTER</h2>
                    <h2 className="performance">QUANTITY</h2>
                    <h2 className="quantity">PERFORMANCE</h2>
                    <h2 className="reason">REASON</h2>
                    <h2 className="detail">DETAIL</h2>
                </div>
                <div className="dashboard-table-body">
                    {filteredData.map((item, index) => {
                        const date = Object.keys(item)[0];
                        const { Center } = item[date][0];
                        const key = `${date}-${Center}-${index}`;

                        function pickMaxReason(inputReason) {
                            if (inputReason && Object.keys(inputReason).length > 0) {
                                const reason = Object.keys(inputReason)[0];
                                return reason;
                            } else {
                                return null;
                            }
                        }

                        return (
                            <StatusBar
                                key={key}
                                center={item.Center}
                                excellent={item.Excellent}
                                good={item.Good}
                                poor={item.Poor}
                                excellentReason={pickMaxReason(item.excellentReason)}
                                poorReason={pickMaxReason(item.poorReason)}
                            />
                        );
                    })}

                </div>
            </div>
        </>
    );
}

export default requireAuth(Dashboard);
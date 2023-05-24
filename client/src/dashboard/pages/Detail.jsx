import React, { useState, useEffect } from 'react';
import RequireAuth from '../../utils/use-cases/requireAuth';
import Header from '../../utils/components/Header';
import Title from '../../utils/components/Title'
import images from '../../utils/images/images'
import SearchBar from '../components/SearchBar';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import './Detail.css'

function Detail() {
    const [information, setInformation] = useState([]);
    const [monthInformation, setMonthInformation] = useState([]);
    const [yearInformation, setYearInformation] = useState([]);

    const searchDate = moment(localStorage.getItem('searchDate')).format(
        'YYYY/MM/DD'
    );
    const searchCenter = localStorage.getItem('searchCenter');
    const searchMonth = moment(localStorage.getItem('searchDate')).format('YYYY/MM');
    const searchYear = moment(localStorage.getItem('searchDate')).format('YYYY');

    function pickAllReason(inputReason) {
        if (inputReason && Object.keys(inputReason).length > 0) {
            const reasonKeys = Object.keys(inputReason);
            const reasons = {};

            for (let i = 0; i < reasonKeys.length; i++) {
                const reasonKey = reasonKeys[i];
                const reasonValue = inputReason[reasonKey];

                if (reasonValue !== null) {
                    reasons[reasonKey] = reasonValue;
                }
            }

            return reasons;
        } else {
            return [];
        }
    }


    function pickMaxValue(inputReason) {
        if (inputReason && Object.keys(inputReason).length > 0) {
            const reason = Object.keys(inputReason)[0];
            return reason;
        } else {
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/information');
                const { information } = await response.json();

                const filteredInformation = information[searchDate] || [];
                const filteredByCenter = filteredInformation.filter(
                    (entry) => entry.Center === searchCenter
                );

                const monthInformation = Object.entries(information).reduce((filtered, [date, entries]) => {
                    if (date.startsWith(searchMonth)) {
                        return [...filtered, ...entries];
                    }
                    return filtered;
                }, []);

                const yearInformation = Object.entries(information).reduce((filtered, [date, entries]) => {
                    if (date.startsWith(searchYear)) {
                        const formattedEntries = entries.map(entry => {
                            return {
                                ...entry,
                                Feedback_Date: date // Agregar la propiedad "Feedback_Date" con el valor de la fecha
                            };
                        });
                        return [...filtered, ...formattedEntries];
                    }
                    return filtered;
                }, []);

                const monthFilteredByCenter = monthInformation.filter(
                    (entry) => entry.Center === searchCenter
                );

                const yearFilteredByCenter = yearInformation.filter(
                    (entry) => entry.Center === searchCenter
                );

                setInformation(filteredByCenter);
                setMonthInformation(monthFilteredByCenter);
                setYearInformation(yearFilteredByCenter);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchDate, searchCenter, searchMonth, searchYear]);

    if (information.length > 0 && information[0].Center) {
        const excellent = information[0].Excellent || 0;
        const good = information[0].Good || 0;
        const poor = information[0].Poor || 0;

        const excellentReason = information[0].excellentReason || 0;
        const poorReason = information[0].poorReason || 0;

        const total = excellent + good + poor;

        const data = {
            labels: ['Excellent', 'Good', 'Poor'],
            datasets: [
                {
                    label: 'Information',
                    data: [(excellent / total * 100).toFixed(0), (good / total * 100).toFixed(0), (poor / total * 100).toFixed(0)],
                    backgroundColor: ['rgb(127, 255, 21)', 'rgb(255, 252, 41)', 'rgb(255, 24, 24)'],
                    hoverOffset: 4
                },
            ],
        };

        const excellentMonth = monthInformation.reduce((total, entry) => total + (entry.Excellent || 0), 0);
        const goodMonth = monthInformation.reduce((total, entry) => total + (entry.Good || 0), 0);
        const poorMonth = monthInformation.reduce((total, entry) => total + (entry.Poor || 0), 0);

        const allExcellentReasonsMonth = monthInformation.map(item => item.excellentReason);
        const excellentReasonMonth = {};

        for (const obj of allExcellentReasonsMonth) {
            const keys = Object.keys(obj);

            for (const key of keys) {
                if (excellentReasonMonth.hasOwnProperty(key)) {
                    excellentReasonMonth[key] += obj[key];
                } else {
                    excellentReasonMonth[key] = obj[key];
                }
            }
        }

        const sortedExcellentEntries = Object.entries(excellentReasonMonth).sort((a, b) => b[1] - a[1]);

        const sortedExcellentReasonMonth = sortedExcellentEntries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        const allPoorReasonsMonth = monthInformation.map(item => item.poorReason);

        const poorReasonMonth = {};


        for (const obj of allPoorReasonsMonth) {
            const keys = Object.keys(obj);

            for (const key of keys) {
                if (poorReasonMonth.hasOwnProperty(key)) {
                    poorReasonMonth[key] += obj[key];
                } else {
                    poorReasonMonth[key] = obj[key];
                }
            }
        }

        const sortedPoorEntries = Object.entries(poorReasonMonth).sort((a, b) => b[1] - a[1]);

        const sortedPoorReasonMonth = sortedPoorEntries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        const totalMonth = excellentMonth + goodMonth + poorMonth


        const monthData = {
            labels: ['Excellent', 'Good', 'Poor'],
            datasets: [
                {
                    label: 'Information',
                    data: [(excellentMonth / totalMonth * 100).toFixed(0), (goodMonth / totalMonth * 100).toFixed(0), (poorMonth / totalMonth * 100).toFixed(0)],
                    backgroundColor: ['rgb(127, 255, 21)', 'rgb(255, 252, 41)', 'rgb(255, 24, 24)'],
                    hoverOffset: 4
                },
            ],
        };

        const excellentYear = yearInformation.reduce((total, entry) => total + (entry.Excellent || 0), 0);
        const goodYear = yearInformation.reduce((total, entry) => total + (entry.Good || 0), 0);
        const poorYear = yearInformation.reduce((total, entry) => total + (entry.Poor || 0), 0);

        const allExcellentReasonsYear = yearInformation.map(item => item.excellentReason);
        const excellentReasonYear = {};

        for (const obj of allExcellentReasonsYear) {
            const keys = Object.keys(obj);

            for (const key of keys) {
                if (excellentReasonYear.hasOwnProperty(key)) {
                    excellentReasonYear[key] += obj[key];
                } else {
                    excellentReasonYear[key] = obj[key];
                }
            }
        }

        const sortedExcellentEntriesYear = Object.entries(excellentReasonYear).sort((a, b) => b[1] - a[1]);

        const sortedExcellentReasonYear = sortedExcellentEntriesYear.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        const allGoodReasonsYear = yearInformation.map(item => item.goodReason);
        const goodReasonsYear = {};

        for (const obj of allGoodReasonsYear) {
            const keys = Object.keys(obj);

            for (const key of keys) {
                if (goodReasonsYear.hasOwnProperty(key)) {
                    goodReasonsYear[key] += obj[key];
                } else {
                    goodReasonsYear[key] = obj[key];
                }
            }
        }

        const sortedGoodEntriesYear = Object.entries(goodReasonsYear).sort((a, b) => b[1] - a[1]);

        const sortedGoodReasonYear = sortedGoodEntriesYear.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        const allPoorReasonsYear = yearInformation.map(item => item.poorReason);
        const poorReasonsYear = {};

        for (const obj of allPoorReasonsYear) {
            const keys = Object.keys(obj);

            for (const key of keys) {
                if (poorReasonsYear.hasOwnProperty(key)) {
                    poorReasonsYear[key] += obj[key];
                } else {
                    poorReasonsYear[key] = obj[key];
                }
            }
        }

        const sortedPoorEntriesYear = Object.entries(poorReasonsYear).sort((a, b) => b[1] - a[1]);

        const sortedPoorReasonYear = sortedPoorEntriesYear.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        const totalYear = excellentYear + goodYear + poorYear

        // Agrupar la data por mes
        const monthlyData = yearInformation.reduce((result, entry) => {
            const date = new Date(entry.Feedback_Date);
            const month = date.getMonth();
            const categoryTotal = entry.Excellent + entry.Good + entry.Poor;

            if (!result[month]) {
                result[month] = {
                    month,
                    count: 1,
                    totals: {
                        Excellent: entry.Excellent,
                        Good: entry.Good,
                        Poor: entry.Poor,
                        total: categoryTotal
                    }
                };
            } else {
                result[month].count++;
                result[month].totals.Excellent += entry.Excellent;
                result[month].totals.Good += entry.Good;
                result[month].totals.Poor += entry.Poor;
                result[month].totals.total += categoryTotal;
            }

            return result;
        }, {});

        // Calcular el porcentaje para cada mes
        const monthlyPercentages = Object.values(monthlyData).map(month => {
            const { totals, count } = month;
            const { Excellent, Good, Poor, total } = totals;

            return {
                month: getMonthName(month.month), // Obtener el nombre del mes
                percentages: {
                    Excellent: ((Excellent / total) * 100).toFixed(0),
                    Good: ((Good / total) * 100).toFixed(0),
                    Poor: ((Poor / total) * 100).toFixed(0)
                },
                count
            };
        });

        // Función para obtener el nombre del mes
        function getMonthName(month) {
            const options = { month: 'long' };
            return new Intl.DateTimeFormat('en-US', options).format(new Date(0, month));
        }

        console.log(monthlyPercentages);


        ChartJS.register(ArcElement, Tooltip, Legend);

        return (
            <>
                <Header />
                <div className="content">
                    <SearchBar />

                    <div className="information-container">
                        <div className="left-information">
                            <div className='chart-container'>
                                <div className="chart-top">
                                    <Title blueTitle={'Daily'} />
                                    <Doughnut data={data} />
                                </div>

                                <div className="chart-medium">
                                    <div className="chart-detail">
                                        <img src={images.excellent} alt="" />
                                        <p>{excellent}</p>
                                    </div>
                                    <div className="chart-detail">
                                        <img src={images.fair} alt="" />
                                        <p>{good}</p>
                                    </div>
                                    <div className="chart-detail">
                                        <img src={images.poor} alt="" />
                                        <p>{poor}</p>
                                    </div>
                                </div>

                                <div className="chart-bottom">
                                    <div className="table-container">
                                        <h3 className='excellent-title'>Excellent</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='data-cell'>Reason</th>
                                                    <th className='data-cell'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[0]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[1]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[2]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[2]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[3]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[3]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[4]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[4]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(excellentReason))[5]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(excellentReason))[5]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="table-container">
                                        <h3 className='poor-title'>Poor</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='data-cell'>Reason</th>
                                                    <th className='data-cell'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[0]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[1]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[2]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[2]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[3]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[3]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[4]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[4]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(poorReason))[5]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(poorReason))[5]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            <div className='chart-container'>
                                <div className="chart-top">
                                    <Title blueTitle={'Monthly'} />
                                    <Doughnut data={monthData} />
                                </div>

                                <div className="chart-medium">
                                    <div className="chart-detail">
                                        <img src={images.excellent} alt="" />
                                        <p>{excellentMonth}</p>
                                    </div>
                                    <div className="chart-detail">
                                        <img src={images.fair} alt="" />
                                        <p>{goodMonth}</p>
                                    </div>
                                    <div className="chart-detail">
                                        <img src={images.poor} alt="" />
                                        <p>{poorMonth}</p>
                                    </div>
                                </div>

                                <div className="chart-bottom">
                                    <div className="table-container">
                                        <h3 className='excellent-title'>Excellent</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='data-cell'>Reason</th>
                                                    <th className='data-cell'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedExcellentReasonMonth))[0]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedExcellentReasonMonth))[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedExcellentReasonMonth))[1]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedExcellentReasonMonth))[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedExcellentReasonMonth))[2]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedExcellentReasonMonth))[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedExcellentReasonMonth))[3]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedExcellentReasonMonth))[3]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedExcellentReasonMonth))[4]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedExcellentReasonMonth))[4]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedExcellentReasonMonth))[5]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedExcellentReasonMonth))[5]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="table-container">
                                        <h3 className='poor-title'>Poor</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='data-cell'>Reason</th>
                                                    <th className='data-cell'>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedPoorReasonMonth))[0]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedPoorReasonMonth))[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedPoorReasonMonth))[1]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedPoorReasonMonth))[1]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedPoorReasonMonth))[2]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedPoorReasonMonth))[2]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedPoorReasonMonth))[3]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedPoorReasonMonth))[3]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedPoorReasonMonth))[4]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedPoorReasonMonth))[4]}</td>
                                                </tr>
                                                <tr>
                                                    <td>{Object.keys(pickAllReason(sortedPoorReasonMonth))[5]}</td>
                                                    <td className='data-cell'>{Object.values(pickAllReason(sortedPoorReasonMonth))[5]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }

    return null;
}

export default RequireAuth(Detail);
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import config from '../config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Statystyki użytkowników',
        },
    },
};


const labels = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj'];
const data = {
    labels,
    datasets: [
        {
            label: 'Aktywni użytkownicy',
            data: [120, 190, 300, 500, 200], // przykładowe dane
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
};


const Statistics = () => {
    const [gameSessions, setGameSessions] = useState([]);
    const getGamingSessions = () => {
        axios
            .get(config.api.url + "/gamingsessions")
            .then((res) => {
                setGameSessions(res.data)
                console.log("Dane z backendu:", res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        getGamingSessions();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Statistics</h1>
            <Bar options={options} data={data} />
        </div>
    );
};

export default Statistics;

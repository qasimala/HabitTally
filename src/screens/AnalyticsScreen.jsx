import React, { useState, useEffect } from 'react';
    import { Bar, Pie } from 'react-chartjs-2';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

    function AnalyticsScreen() {
      const [habits, setHabits] = useState([]);
      const [tallies, setTallies] = useState([]);
      const [dateRange, setDateRange] = useState('lifetime');
      const [customStartDate, setCustomStartDate] = useState(new Date());
      const [customEndDate, setCustomEndDate] = useState(new Date());

      useEffect(() => {
        const savedHabits = localStorage.getItem('habits');
        const savedTallies = localStorage.getItem('tallies');
        setHabits(savedHabits ? JSON.parse(savedHabits) : []);
        setTallies(savedTallies ? JSON.parse(savedTallies) : []);
      }, []);

      const calculateDateRange = () => {
        const now = new Date();
        let startDate;
        let endDate = new Date();

        switch (dateRange) {
          case 'past-week':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case 'past-month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          case 'past-year':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
          case 'custom':
            startDate = customStartDate;
            endDate = customEndDate;
            break;
          default:
            startDate = new Date(0); // Lifetime
        }

        return { startDate, endDate };
      };

      const { startDate, endDate } = calculateDateRange();

      const filterDataByDate = (data) => {
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      };

      const filteredHabits = filterDataByDate(habits);
      const filteredTallies = filterDataByDate(tallies);

      const totalHabits = filteredHabits.length;
      const completedHabits = filteredHabits.filter(habit => habit.completed).length;
      const totalTallies = filteredTallies.length;
      const averageTallyCount = totalTallies > 0 ? (filteredTallies.reduce((sum, tally) => sum + tally.count, 0) / totalTallies).toFixed(2) : 0;

      const habitData = {
        labels: ['Completed', 'Incomplete'],
        datasets: [
          {
            data: [completedHabits, totalHabits - completedHabits],
            backgroundColor: ['#4CAF50', '#F44336'],
          },
        ],
      };

      const tallyData = {
        labels: filteredTallies.map(tally => tally.name),
        datasets: [
          {
            label: 'Tally Counts',
            data: filteredTallies.map(tally => tally.count),
            backgroundColor: '#2196F3',
          },
        ],
      };

      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <div className="mb-4">
            <label className="block mb-2">Select Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="lifetime">Lifetime</option>
              <option value="past-week">Past Week</option>
              <option value="past-month">Past Month</option>
              <option value="past-year">Past Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          {dateRange === 'custom' && (
            <div className="flex justify-between mb-4">
              <div>
                <label className="block mb-2">Start Date</label>
                <DatePicker selected={customStartDate} onChange={(date) => setCustomStartDate(date)} />
              </div>
              <div>
                <label className="block mb-2">End Date</label>
                <DatePicker selected={customEndDate} onChange={(date) => setCustomEndDate(date)} />
              </div>
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Habit Completion</h3>
            <Pie data={habitData} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Tally Counts</h3>
            <Bar data={tallyData} />
          </div>
        </div>
      );
    }

    export default AnalyticsScreen;

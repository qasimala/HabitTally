import React, { useState } from 'react';

    function HabitTracker({ habits, addHabit, toggleHabit }) {
      const [habitInput, setHabitInput] = useState('');
      const [frequency, setFrequency] = useState('daily');

      const handleAddHabit = () => {
        if (habitInput.trim()) {
          addHabit({ name: habitInput.trim(), frequency });
          setHabitInput('');
        }
      };

      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Habits</h2>
          <div className="flex mb-4">
            <input
              type="text"
              value={habitInput}
              onChange={(e) => setHabitInput(e.target.value)}
              placeholder="Add a new habit"
              className="flex-grow p-2 border rounded-l-lg"
            />
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="p-2 border-t border-b"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <button
              onClick={handleAddHabit}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
              Add Habit
            </button>
          </div>
          <ul>
            {habits.map((habit, index) => (
              <li key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(index)}
                  className="mr-2"
                />
                <span className={`flex-grow ${habit.completed ? 'line-through' : ''}`}>
                  {habit.name} ({habit.frequency})
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default HabitTracker;

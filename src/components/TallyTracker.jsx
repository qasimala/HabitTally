import React, { useState } from 'react';

    function TallyTracker({ tallies, addTally, incrementTally, resetTally }) {
      const [tallyInput, setTallyInput] = useState('');

      const handleAddTally = () => {
        if (tallyInput.trim()) {
          addTally(tallyInput);
          setTallyInput('');
        }
      };

      return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tallies</h2>
          <div className="flex mb-4">
            <input
              type="text"
              value={tallyInput}
              onChange={(e) => setTallyInput(e.target.value)}
              placeholder="Add a new tally item"
              className="flex-grow p-2 border rounded-l-lg"
            />
            <button
              onClick={handleAddTally}
              className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600"
            >
              Add Tally
            </button>
          </div>
          <ul>
            {tallies.map((tally, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="flex-grow">{tally.name}: {tally.count}</span>
                <button
                  onClick={() => incrementTally(index)}
                  className="bg-yellow-500 text-white p-1 rounded-lg mr-2 hover:bg-yellow-600"
                >
                  Increment
                </button>
                <button
                  onClick={() => resetTally(index)}
                  className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600"
                >
                  Reset
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default TallyTracker;

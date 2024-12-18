import React, { useState, useEffect } from 'react';
    import TallyTracker from '../components/TallyTracker';

    function TallyScreen() {
      const [tallies, setTallies] = useState(() => {
        const savedTallies = localStorage.getItem('tallies');
        return savedTallies ? JSON.parse(savedTallies) : [];
      });

      useEffect(() => {
        localStorage.setItem('tallies', JSON.stringify(tallies));
      }, [tallies]);

      const addTally = (tally) => {
        setTallies([...tallies, { name: tally, count: 0 }]);
      };

      const incrementTally = (index) => {
        const newTallies = [...tallies];
        newTallies[index].count += 1;
        setTallies(newTallies);
      };

      const resetTally = (index) => {
        const newTallies = [...tallies];
        newTallies[index].count = 0;
        setTallies(newTallies);
      };

      return (
        <TallyTracker tallies={tallies} addTally={addTally} incrementTally={incrementTally} resetTally={resetTally} />
      );
    }

    export default TallyScreen;

import React, { useState, useEffect } from 'react';
    import HabitTracker from '../components/HabitTracker';

    function HabitScreen() {
      const [habits, setHabits] = useState(() => {
        const savedHabits = localStorage.getItem('habits');
        return savedHabits ? JSON.parse(savedHabits) : [];
      });

      useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
      }, [habits]);

      const addHabit = (habit) => {
        if (habit.name && habit.frequency) {
          setHabits([...habits, { ...habit, completed: false }]);
        }
      };

      const toggleHabit = (index) => {
        const newHabits = [...habits];
        newHabits[index].completed = !newHabits[index].completed;
        setHabits(newHabits);
      };

      return (
        <HabitTracker habits={habits} addHabit={addHabit} toggleHabit={toggleHabit} />
      );
    }

    export default HabitScreen;

import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import HabitScreen from './screens/HabitScreen';
    import TallyScreen from './screens/TallyScreen';
    import AnalyticsScreen from './screens/AnalyticsScreen';

    function App() {
      return (
        <Router>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Habit Tracker and Tally App</h1>
            <nav className="flex justify-center space-x-4 mb-6">
              <Link to="/" className="text-blue-500 hover:underline">Habits</Link>
              <Link to="/tallies" className="text-blue-500 hover:underline">Tallies</Link>
              <Link to="/analytics" className="text-blue-500 hover:underline">Analytics</Link>
            </nav>
            <Routes>
              <Route path="/" element={<HabitScreen />} />
              <Route path="/tallies" element={<TallyScreen />} />
              <Route path="/analytics" element={<AnalyticsScreen />} />
            </Routes>
          </div>
        </Router>
      );
    }

    export default App;

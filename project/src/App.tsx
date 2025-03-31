import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { useDreamStore } from './store';

function App() {
  const { user } = useDreamStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Landing />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" /> : <Auth />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            user ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
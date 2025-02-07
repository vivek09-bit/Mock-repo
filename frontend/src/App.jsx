import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import TestList from "./components/TestList";
import TakeTest from "./pages/TakeTest";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/tests" element={<TestList />} />
            <Route path="/take-test/:testId" element={<TakeTest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

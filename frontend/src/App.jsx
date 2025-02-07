import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Quiz from './pages/Quiz';
import QuizResult from "./pages/QuizResult";

const App = () => {
    return (

        <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/quiz/:testId" element={<Quiz />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            
             {/* Public Profile Page */}
            {/* <Route path="/quiz/:username}" element={<Quiz />} /> */}
     
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
    );
};

export default App;

import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Task Manager</h1>
      <p>Stay organized, track tasks, and boost your productivity!</p>

      {/* New Users */}
      <div className="section">
        <h2>New here?</h2>
        <p>Create an account to start managing your tasks.</p>
        <button className="btn signup" onClick={() => navigate('/signup')}>
          Create Account
        </button>
      </div>

      {/* Existing Users */}
      <div className="section">
        <h2>Already have an account?</h2>
        <p>Login to continue where you left off.</p>
        <button className="btn login" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Welcome;

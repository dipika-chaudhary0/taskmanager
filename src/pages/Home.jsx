import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero">
        <h1>✨ Take Control of Your Day with Task Manager Web App!</h1>
        <p>Organize, prioritize, and accomplish more—effortlessly.</p>
        <button className="btn-primary" onClick={() => navigate('/signup')}>Get Started Now →</button>
      </header>

      <section className="why-choose">
        <h2>Why Choose Task Manager?</h2>
        <ul>
          <li>Stay on top of deadlines</li>
          <li>Focus on what matters most</li>
          <li>Boost your productivity and motivation</li>
        </ul>
      </section>

      <section className="features">
        <h2>Key Features & Benefits</h2>
        <ul>
          <li>📝 Add Tasks Instantly</li>
          <li>✏️ Edit & Delete Easily</li>
          <li>📊 Track Your Progress</li>
          <li>⚡ Prioritize Effectively</li>
          <li>📅 Daily, Weekly & Monthly Views</li>
        </ul>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Add a Task – Type your task and set a deadline.</li>
          <li>Organize – Categorize by priority or project.</li>
          <li>Track & Complete – Check off tasks and watch your progress grow.</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>Testimonials</h2>
        <p>“I finally feel in control of my day! Task Manager keeps me organized and productive.” – Sarah M.</p>
        <p>“Simple, intuitive, and effective. My workflow has never been smoother!” – Raj P.</p>
      </section>

      <section className="cta">
        <h2>🚀 Ready to Boost Your Productivity?</h2>
        <button className="btn-primary" onClick={() => navigate('/signup')}>Get Started Today →</button>
      </section>

      <footer>
        © 2025 Task Manager Web App. All rights reserved. Your productivity, your way!
      </footer>
    </div>
  );
}

export default Home;
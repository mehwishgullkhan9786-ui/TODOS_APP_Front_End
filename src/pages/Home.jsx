import React from 'react';
import '../Style Css/LandingPage.css';
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        
        
        <div className="hero-image-container">
          <div className="illustration-wrapper">
         
            <div className="clock-element">
                <div className="clock-face"></div>
                <img src="https://www.freepik.com/free-photos-vectors/clock" alt=""/>
            </div>
            
         
            <div className="phone-frame">
              <div className="checklist-card">
                <h3>TO DO LIST</h3>
                <ul className="checklist-items">
                  <li><span className="check active">✔</span></li>
                  <li><span className="check active">✔</span></li>
                  <li><span className="check"></span></li>
                  <li><span className="check"></span></li>
                </ul>
              </div>
          
              <div className="target-icon">🎯</div>
            </div>

          
            <div className="character-placeholder">
               <div className="pencil"></div>
               <div className="person"></div>
            </div>
            
        
            <div className="gears">⚙️⚙️</div>
          </div>
        </div>

    
        <div className="hero-text-container">
          <h1 className="hero-title">
            To Do List <br />
            <span>Web App</span>
          </h1>
          <p className="hero-subtitle">Welcome to Your Smart Task Manager</p>
          <p className="hero-description">
           This To-Do List application helps you organize your daily tasks, track deadlines, and stay productive. 
           With secure user accounts and role-based access, you can manage tasks efficiently, monitor progress,
            and ensure nothing gets missed. Plan smarter, work faster, and stay in control of your schedule.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-outline">Free Trial 30 Days</button>
           <Link to="/Login">
            <button className="btn-primary">Get Started</button>
            </Link>
          </div>

          <div className="slider-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot active"></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
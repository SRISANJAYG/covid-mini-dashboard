import React from "react";

const Card = ({ TotalCases, Deaths, Recovered }) => {
  return (
    <div className="cards-container">
      <div className="stat-card card-cases">
        <div className="card-icon">🦠</div>
        <h3 className="card-label">Total Cases</h3>
        <p className="card-value">{TotalCases}</p>
      </div>

      <div className="stat-card card-recovered">
        <div className="card-icon">💚</div>
        <h3 className="card-label">Recovered</h3>
        <p className="card-value">{Recovered}</p>
      </div>

      <div className="stat-card card-deaths">
        <div className="card-icon">💀</div>
        <h3 className="card-label">Deaths</h3>
        <p className="card-value">{Deaths}</p>
      </div>
    </div>
  );
};

export default Card;

import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Table } from "./Table";

export const DashBoard = () => {
  const [countries, setCountries] = useState([]);
  const [countryObj, setCountryObj] = useState({});
  const [flag, setflag] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));

    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => setGlobalStats(data));
  }, []);

  function handleSelectedCountry(e) {
    setSelectedCountry(e.target.value);
    let countryData = countries.filter((c) => c.country === e.target.value)[0];
    setCountryObj(countryData);
  }

  return (
    <div className="dashboard-wrapper">

      {/* ── Header ── */}
      <header className="dashboard-header">
        <h1>COVID<span>-19</span> Dashboard</h1>
        <p className="header-subtitle">
          Track COVID-19 statistics country by country
        </p>
      </header>

      {/* ── Global Summary (Bonus) ── */}
      <section className="global-summary-section">
        <h2 className="section-title">Global Summary</h2>

        {!globalStats ? (
          <div className="global-loading">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span>Fetching live data…</span>
          </div>
        ) : (
          <div className="global-grid">
            <div className="global-card gc-cases">
              <span className="gc-icon">🦠</span>
              <span className="gc-label">Total Cases</span>
              <span className="gc-value">{globalStats.cases}</span>
              <span className="gc-sub">+{globalStats.todayCases} today</span>
            </div>
            <div className="global-card gc-recovered">
              <span className="gc-icon">💚</span>
              <span className="gc-label">Recovered</span>
              <span className="gc-value">{globalStats.recovered}</span>
              <span className="gc-sub">+{globalStats.todayRecovered} today</span>
            </div>
            <div className="global-card gc-deaths">
              <span className="gc-icon">💀</span>
              <span className="gc-label">Deaths</span>
              <span className="gc-value">{globalStats.deaths}</span>
              <span className="gc-sub">+{globalStats.todayDeaths} today</span>
            </div>
          </div>
        )}
      </section>

      {/* ── Controls ── */}
      <section className="controls-section">
        <div className="select-wrapper">
          <span className="select-icon">🌐</span>
          <select
            value={selectedCountry}
            onChange={handleSelectedCountry}
            name="dropdown"
            id="dropdown"
            className="country-select"
          >
            <option value="">Select a Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`toggle-btn ${flag ? "btn-card" : "btn-table"}`}
          onClick={() => setflag(!flag)}
        >
          {flag ? "📋 Table View" : "🃏 Card View"}
        </button>
      </section>

      {/* ── Country Data ── */}
      <section className="data-section">
        {!selectedCountry && (
          <div className="placeholder">
            <span className="placeholder-icon">🔍</span>
            <p>Select a country above to view its statistics</p>
          </div>
        )}

        {countryObj && countryObj.cases && (
          <div className="country-data">

            {/* Country identity */}
            <div className="country-header">
              {countryObj.countryInfo?.flag && (
                <img
                  src={countryObj.countryInfo.flag}
                  alt={countryObj.country}
                  className="country-flag"
                />
              )}
              <h2 className="country-name">{countryObj.country}</h2>
            </div>

            {flag ? (
              <Card
                TotalCases={countryObj.cases}
                Deaths={countryObj.deaths}
                Recovered={countryObj.recovered}
              />
            ) : (
              <Table
                TotalCases={countryObj.cases}
                Deaths={countryObj.deaths}
                Recovered={countryObj.recovered}
              />
            )}
          </div>
        )}
      </section>


      {/* ── Footer ── */}
      <footer className="dashboard-footer">
        <p>&ldquo;No one is safe until everyone is safe.&rdquo; <span style={{color:"#a78bfa"}}>— WHO Director-General, Tedros Adhanom Ghebreyesus</span></p>
      </footer>
    </div>
  );
};

import React from "react";

export const Table = ({ TotalCases, Deaths, Recovered }) => {
  const rows = [
    { label: "Total Cases", value: TotalCases, className: "row-cases",     icon: "🦠" },
    { label: "Recovered",   value: Recovered,  className: "row-recovered",  icon: "💚" },
    { label: "Deaths",      value: Deaths,     className: "row-deaths",     icon: "💀" },
  ];

  return (
    <div className="table-wrapper">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Statistic</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className={`table-row ${row.className}`}>
              <td className="row-icon">{row.icon}</td>
              <td className="row-label">{row.label}</td>
              <td className="row-value">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

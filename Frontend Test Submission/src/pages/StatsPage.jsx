import { useEffect, useState } from "react";
import { log } from "../logger";


const StatsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/stats"); 
      const json = await res.json();
      setData(json);
      await log("frontend", "info", "stats", "Fetched stats data");
    } catch (error) {
      await log("frontend", "error", "stats", "Failed to fetch stats");
    }
  };

  return (
    <div className="stats-container">
      <h2>Shortened URL Stats</h2>
      {data.length === 0 ? (
        <p>No stats available.</p>
      ) : (
        data.map((item, index) => (
          <div className="stats-card" key={index}>
            <p><strong>Original:</strong> {item.originalUrl}</p>
            <p>
              <strong>Short URL:</strong>{" "}
              <a href={`/${item.shortcode}`} target="_blank" rel="noreferrer">
                {window.location.origin}/{item.shortcode}
              </a>
            </p>
            <p><strong>Expires:</strong> {item.expiresAt}</p>
            <p><strong>Total Clicks:</strong> {item.clicks.length}</p>
            <div className="click-log">
              <strong>Click Logs:</strong>
              {item.clicks.length === 0 ? (
                <p>No clicks yet.</p>
              ) : (
                <ul>
                  {item.clicks.map((click, i) => (
                    <li key={i}>
                      <p>Time: {click.timestamp}</p>
                      <p>Referrer: {click.referrer || "Unknown"}</p>
                      <p>Location: {click.location || "Unknown"}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StatsPage;

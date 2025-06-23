import { useState } from "react";
import { log } from "../logger";
// import "./App.css";

const ShortenPage = () => {
  const [urlData, setUrlData] = useState([
    { originalUrl: "", validity: "", customCode: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const newData = [...urlData];
    newData[index][field] = value;
    setUrlData(newData);
  };

  const handleAddField = () => {
    if (urlData.length < 5) {
      setUrlData([...urlData, { originalUrl: "", validity: "", customCode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const allResults = [];

    for (const item of urlData) {
      const { originalUrl, validity, customCode } = item;
      if (!originalUrl || !originalUrl.startsWith("http")) {
        alert("Please enter a valid URL (must start with http/https)");
        await log("frontend", "error", "form", "Invalid URL format");
        continue;
      }

      const payload = {
        url: originalUrl,
        validity: parseInt(validity) || 30,
        shortcode: customCode || undefined,
      };

      try {
        const res = await fetch("http://localhost:8080/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        allResults.push(data);
        await log("frontend", "info", "shorten", "URL shortened successfully");
      } catch (error) {
        await log("frontend", "error", "shorten", "Error shortening URL");
      }
    }

    setResults(allResults);
  };

  return (
    <div className="shorten-container">
      <h2>Shorten URLs</h2>
      {urlData.map((item, index) => (
        <div className="input-group" key={index}>
          <input
            type="text"
            placeholder="Long URL"
            value={item.originalUrl}
            onChange={(e) => handleInputChange(index, "originalUrl", e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (minutes)"
            value={item.validity}
            onChange={(e) => handleInputChange(index, "validity", e.target.value)}
          />
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={item.customCode}
            onChange={(e) => handleInputChange(index, "customCode", e.target.value)}
          />
        </div>
      ))}
      {urlData.length < 5 && (
        <button onClick={handleAddField}>+ Add More</button>
      )}
      <button onClick={handleSubmit}>Shorten</button>

      <div className="results">
        <h3>Shortened Links:</h3>
        {results.map((res, i) => (
          <div key={i}>
            <a href={`/${res.shortcode}`} target="_blank" rel="noreferrer">
              {window.location.origin}/{res.shortcode}
            </a>
            <p>Expires at: {res.expiresAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortenPage;

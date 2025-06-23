import React from "react";


const URLInputGroup = ({ index, data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  return (
    <div className="url-input-group">
      <label>
        Long URL:
        <input
          type="text"
          name="longUrl"
          value={data.longUrl}
          onChange={handleChange}
          placeholder="https://example.com"
          required
        />
      </label>

      <label>
        Validity (mins):
        <input
          type="number"
          name="validity"
          value={data.validity}
          onChange={handleChange}
          placeholder="Defaults to 30"
          min="1"
        />
      </label>

      <label>
        Custom Code:
        <input
          type="text"
          name="customCode"
          value={data.customCode}
          onChange={handleChange}
          placeholder="Optional (e.g. my-link)"
        />
      </label>
    </div>
  );
};

export default URLInputGroup;

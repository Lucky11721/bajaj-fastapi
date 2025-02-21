import React, { useState } from "react";

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const backendUrl = "https://your-backend-url.com/bfhl"; // Update this when backend is ready

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            if (!parsedData.data) throw new Error("Invalid JSON format");

            const res = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedData),
            });

            const result = await res.json();
            setResponse(result);
            setError(null);
        } catch (err) {
            setError("Invalid JSON input");
            setResponse(null);
        }
    };

    return (
        <div style={{ textAlign: "center", margin: "50px" }}>
            <h1>BFHL Challenge</h1>
            <textarea
                rows="5"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON: {"data": ["A", "1", "B", "2"]}'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {response && (
                <div>
                    <h3>Response:</h3>
                    <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <pre>
                        {JSON.stringify(
                            Object.fromEntries(Object.entries(response).filter(([key]) => selectedFilters.includes(key))),
                            null,
                            2
                        )}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default App;

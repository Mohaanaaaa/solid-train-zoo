// src/App.js
import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios
import './App.css'; // Importing your CSS

const App = () => {
    const [catData, setCatData] = useState([]); // State to hold fetched cat data
    const [selectedCat, setSelectedCat] = useState(null); // State for selected cat
    const [error, setError] = useState(null); // State to hold error messages
    const [catName, setCatName] = useState(''); // State to hold user input
    const [loading, setLoading] = useState(false); // Loading state
    
    // Fetch cat data based on name
    const fetchCatData = async (name) => {
        const apiUrl = `https://api.api-ninjas.com/v1/cats?name=${name}`;

        setLoading(true);
        setError(null); // Clear previous error
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'X-Api-Key': 'V6acywBV8zWqimywYB1NSO6cP1LpF0soxnP5xVps' }
            });

            console.log('Response data:', response.data); // Debugging line

            if (response.status === 200 && response.data.length > 0) {
                setCatData(response.data); // Set fetched cat data
                setSelectedCat(null); // Reset selected cat
            } else {
                setCatData([]);
                setError('No data found for the given cat name.');
            }
        } catch (err) {
            setCatData([]);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Handle submission of the form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (catName.trim()) {
            fetchCatData(catName.trim());
        } else {
            setError("Please enter a valid cat name.");
        }
    };

    // Handle selecting of a cat from the dropdown
    const handleSelectChange = (e) => {
        const selected = catData.find(cat => cat.name === e.target.value);
        setSelectedCat(selected); // Set selected cat data
    };

    return (
        <div className="App">
            <h1>Cat Information</h1>

            {/* Input field for cat name */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter cat name"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>} {/* Loading indicator */}
            
            {error && <p className="error">{error}</p>} {/* Error message */}

            {/* Dropdown for selecting a cat if any fetched */}
            {catData.length > 0 && (
                <div>
                    <select onChange={handleSelectChange} defaultValue="">
                        <option value="" disabled>Select a Cat</option>
                        {catData.map((cat) => (
                            <option key={cat.name} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display cat information if selected */}
            {selectedCat && (
                <div>
                    <h2>{selectedCat.name}</h2>
                    <img src={selectedCat.image_link} alt={selectedCat.name} />
                    <h3>Details:</h3>
                    <table>
                        <tbody>
                            <tr><td>Length</td><td>{selectedCat.length}</td></tr>
                            <tr><td>Origin</td><td>{selectedCat.origin}</td></tr>
                            <tr><td>Family Friendly</td><td>{selectedCat.family_friendly}</td></tr>
                            <tr><td>Shedding</td><td>{selectedCat.shedding}</td></tr>
                            <tr><td>General Health</td><td>{selectedCat.general_health}</td></tr>
                            <tr><td>Playfulness</td><td>{selectedCat.playfulness}</td></tr>
                            <tr><td>Children Friendly</td><td>{selectedCat.children_friendly}</td></tr>
                            <tr><td>Grooming</td><td>{selectedCat.grooming}</td></tr>
                            <tr><td>Intelligence</td><td>{selectedCat.intelligence}</td></tr>
                            <tr><td>Other Pets Friendly</td><td>{selectedCat.other_pets_friendly}</td></tr>
                            <tr><td>Min Weight</td><td>{selectedCat.min_weight}</td></tr>
                            <tr><td>Max Weight</td><td>{selectedCat.max_weight}</td></tr>
                            <tr><td>Min Life Expectancy</td><td>{selectedCat.min_life_expectancy}</td></tr>
                            <tr><td>Max Life Expectancy</td><td>{selectedCat.max_life_expectancy}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
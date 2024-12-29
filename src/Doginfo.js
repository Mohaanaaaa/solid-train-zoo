// src/App.js
import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios
import './App.css'; // Importing your CSS

const App = () => {
    const [dogData, setDogData] = useState([]); // State to hold fetched dog data
    const [selectedDog, setSelectedDog] = useState(null); // State for selected dog
    const [error, setError] = useState(null); // State to hold error messages
    const [dogName, setDogName] = useState(''); // State to hold user input
    const [loading, setLoading] = useState(false); // Loading state
    
    // Fetch dog data based on name
    const fetchDogData = async (name) => {
        const apiUrl = `https://api.api-ninjas.com/v1/dogs?name=${name}`;

        setLoading(true);
        setError(null); // Clear previous error
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'X-Api-Key': 'V6acywBV8zWqimywYB1NSO6cP1LpF0soxnP5xVps' }
            });

            console.log('Response data:', response.data); // Debugging line

            if (response.status === 200 && response.data.length > 0) {
                setDogData(response.data); // Set fetched dog data
                setSelectedDog(null); // Reset selected dog
            } else {
                setDogData([]);
                setError('No data found for the given dog name.');
            }
        } catch (err) {
            setDogData([]);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Handle submission of the form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (dogName.trim()) {
            fetchDogData(dogName.trim());
        } else {
            setError("Please enter a valid dog name.");
        }
    };

    // Handle selecting of a dog from the dropdown
    const handleSelectChange = (e) => {
        const selected = dogData.find(dog => dog.name === e.target.value);
        setSelectedDog(selected); // Set selected dog data
    };

    return (
        <div className="App">
            <h1>Dog Information</h1>

            {/* Input field for dog name */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter dog name"
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>} {/* Loading indicator */}
            
            {error && <p className="error">{error}</p>} {/* Error message */}

            {/* Dropdown for selecting a dog if any fetched */}
            {dogData.length > 0 && (
                <div>
                    <select onChange={handleSelectChange} defaultValue="">
                        <option value="" disabled>Select a Dog</option>
                        {dogData.map((dog) => (
                            <option key={dog.name} value={dog.name}>
                                {dog.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display dog information if selected */}
            {selectedDog && (
                <div>
                    <h2>{selectedDog.name}</h2>
                    <img src={selectedDog.image_link} alt={selectedDog.name} />
                    <h3>Details:</h3>
                    <table>
                        <tbody>
                            <tr><td>Good with Children</td><td>{selectedDog.good_with_children}</td></tr>
                            <tr><td>Good with Other Dogs</td><td>{selectedDog.good_with_other_dogs}</td></tr>
                            <tr><td>Shedding</td><td>{selectedDog.shedding}</td></tr>
                            <tr><td>Grooming</td><td>{selectedDog.grooming}</td></tr>
                            <tr><td>Drooling</td><td>{selectedDog.drooling}</td></tr>
                            <tr><td>Coat Length</td><td>{selectedDog.coat_length}</td></tr>
                            <tr><td>Good with Strangers</td><td>{selectedDog.good_with_strangers}</td></tr>
                            <tr><td>Playfulness</td><td>{selectedDog.playfulness}</td></tr>
                            <tr><td>Protectiveness</td><td>{selectedDog.protectiveness}</td></tr>
                            <tr><td>Trainability</td><td>{selectedDog.trainability}</td></tr>
                            <tr><td>Energy</td><td>{selectedDog.energy}</td></tr>
                            <tr><td>Barking</td><td>{selectedDog.barking}</td></tr>
                            <tr><td>Min Life Expectancy</td><td>{selectedDog.min_life_expectancy}</td></tr>
                            <tr><td>Max Life Expectancy</td><td>{selectedDog.max_life_expectancy}</td></tr>
                            <tr><td>Max Height (Male)</td><td>{selectedDog.max_height_male}</td></tr>
                            <tr><td>Max Height (Female)</td><td>{selectedDog.max_height_female}</td></tr>
                            <tr><td>Max Weight (Male)</td><td>{selectedDog.max_weight_male}</td></tr>
                            <tr><td>Max Weight (Female)</td><td>{selectedDog.max_weight_female}</td></tr>
                            <tr><td>Min Height (Male)</td><td>{selectedDog.min_height_male}</td></tr>
                            <tr><td>Min Height (Female)</td><td>{selectedDog.min_height_female}</td></tr>
                            <tr><td>Min Weight (Male)</td><td>{selectedDog.min_weight_male}</td></tr>
                            <tr><td>Min Weight (Female)</td><td>{selectedDog.min_weight_female}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
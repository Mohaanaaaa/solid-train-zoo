// src/App.js
import React, { useState } from 'react';
import axios from 'axios'; // Importing Axios
import './App.css'; // Importing your CSS

const App = () => {
    const [animalData, setAnimalData] = useState([]); // State to hold fetched animal data
    const [selectedAnimal, setSelectedAnimal] = useState(null); // State for selected animal
    const [error, setError] = useState(null); // State to hold error messages
    const [animalName, setAnimalName] = useState(''); // State to hold user input
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch animal data based on name
    const fetchAnimalData = async (name) => {
        const apiUrl = `https://api.api-ninjas.com/v1/animals?name=${name}`;

        setLoading(true);
        setError(null); // Clear previous error
        try {
            const response = await axios.get(apiUrl, {
                headers: { 'X-Api-Key': 'V6acywBV8zWqimywYB1NSO6cP1LpF0soxnP5xVps' }
            });

            console.log('Response data:', response.data); // Debugging line

            if (response.status === 200 && response.data.length > 0) {
                setAnimalData(response.data); // Set fetched animal data
                setSelectedAnimal(null); // Reset selected animal
            } else {
                setAnimalData([]);
                setError('No data found for the given animal name.');
            }
        } catch (err) {
            setAnimalData([]);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Handle submission of the form
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (animalName.trim()) {
            fetchAnimalData(animalName.trim());
        } else {
            setError("Please enter a valid animal name.");
        }
    };

    // Handle selecting of an animal from the dropdown
    const handleSelectChange = (e) => {
        const selected = animalData.find(animal => animal.name === e.target.value);
        setSelectedAnimal(selected); // Set selected animal data
    };

    return (
        <div className="App">
            <h1>Animal Information</h1>

            {/* Input field for animal name */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter animal name"
                    value={animalName}
                    onChange={(e) => setAnimalName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>} {/* Loading indicator */}
            
            {error && <p className="error">{error}</p>} {/* Error message */}

            {/* Dropdown for selecting an animal if any fetched */}
            {animalData.length > 0 && (
                <div>
                    <select onChange={handleSelectChange} defaultValue="">
                        <option value="" disabled>Select an Type</option>
                        {animalData.map((animal) => (
                            <option key={animal.name} value={animal.name}>
                                {animal.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display animal information in table if selected */}
            {selectedAnimal && (
                <div>
                    <h2>{selectedAnimal.name}</h2>
                    <h3>Details:</h3>

                    {/* Characteristics Table */}
                    <table>
                        <thead>
                            <tr>
                                <th>Characteristic</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Type</td>
                                <td>{selectedAnimal.characteristics?.type}</td>
                            </tr>
                            <tr>
                                <td>Color</td>
                                <td>{selectedAnimal.characteristics?.color}</td>
                            </tr>
                            <tr>
                                <td>Diet</td>
                                <td>{selectedAnimal.characteristics?.diet}</td>
                            </tr>
                            <tr>
                                <td>Lifespan</td>
                                <td>{selectedAnimal.characteristics?.lifespan}</td>
                            </tr>
                            <tr>
                                <td>Habitat</td>
                                <td>{selectedAnimal.characteristics?.habitat}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{selectedAnimal.characteristics?.weight}</td>
                            </tr>
                            <tr>
                                <td>Top Speed</td>
                                <td>{selectedAnimal.characteristics?.top_speed}</td>
                            </tr>
                            <tr>
                                <td>Average Litter Size</td>
                                <td>{selectedAnimal.characteristics?.average_litter_size}</td>
                            </tr>
                            <tr>
                                <td>Distinctive Feature</td>
                                <td>{selectedAnimal.characteristics?.distinctive_feature}</td>
                            </tr>
                            <tr>
                                <td>Favorite Food</td>
                                <td>{selectedAnimal.characteristics?.favorite_food}</td>
                            </tr>
                            <tr>
                                <td>Predators</td>
                                <td>{selectedAnimal.characteristics?.predators}</td>
                            </tr>
                            <tr>
                                <td>Skin Type</td>
                                <td>{selectedAnimal.characteristics?.skin_type}</td>
                            </tr>
                            <tr>
                                <td>Lifestyle</td>
                                <td>{selectedAnimal.characteristics?.lifestyle}</td>
                            </tr>
                            <tr>
                                <td>Main Prey</td>
                                <td>{selectedAnimal.characteristics?.main_prey}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{selectedAnimal.characteristics?.height}</td>
                            </tr>
                            <tr>
                                <td>Slogan</td>
                                <td>{selectedAnimal.characteristics?.slogan}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Locations Table */}
                    <h3>Locations:</h3>
                    <ul>
                        {selectedAnimal.locations?.map((location, index) => (
                            <li key={index}>{location}</li>
                        ))}
                    </ul>

                    {/* Taxonomy Table */}
                    <h3>Taxonomy:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Kingdom</td>
                                <td>{selectedAnimal.taxonomy?.kingdom}</td>
                            </tr>
                            <tr>
                                <td>Phylum</td>
                                <td>{selectedAnimal.taxonomy?.phylum}</td>
                            </tr>
                            <tr>
                                <td>Class</td>
                                <td>{selectedAnimal.taxonomy?.class}</td>
                            </tr>
                            <tr>
                                <td>Order</td>
                                <td>{selectedAnimal.taxonomy?.order}</td>
                            </tr>
                            <tr>
                                <td>Family</td>
                                <td>{selectedAnimal.taxonomy?.family}</td>
                            </tr>
                            <tr>
                                <td>Genus</td>
                                <td>{selectedAnimal.taxonomy?.genus}</td>
                            </tr>
                            <tr>
                                <td>Scientific Name</td>
                                <td>{selectedAnimal.taxonomy?.scientific_name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
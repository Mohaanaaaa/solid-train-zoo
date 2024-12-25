// src/AnimalInfo.js
import React, { useState } from 'react';
import axios from 'axios';

const AnimalInfo = () => {
    const [animalData, setAnimalData] = useState(null);
    const [error, setError] = useState(null);
    const [animalName, setAnimalName] = useState(''); // State to hold user input
    const [loading, setLoading] = useState(false); // Loading state

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
                setAnimalData(response.data[0]); // Get the first animal data
            } else {
                setAnimalData(null);
                setError('No data found for the given animal name.');
            }
        } catch (err) {
            setAnimalData(null);
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (animalName.trim()) {
            fetchAnimalData(animalName.trim());
        } else {
            setError("Please enter a valid animal name.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={animalName}
                    onChange={(e) => setAnimalName(e.target.value)}
                    placeholder="Enter animal name"
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {animalData && (
                <div>
                    <h1>{animalData.characteristics.common_name}</h1>
                    <p><strong>Scientific Name:</strong> {animalData.taxonomy.scientific_name}</p>
                    <p><strong>Group:</strong> {animalData.characteristics.group}</p>
                    <p><strong>Habitat:</strong> {animalData.characteristics.habitat}</p>
                    <p><strong>Diet:</strong> {animalData.characteristics.diet}</p>
                    <p><strong>Life Span:</strong> {animalData.characteristics.lifespan}</p>
                    <p><strong>Top Speed:</strong> {animalData.characteristics.top_speed}</p>
                    <p><strong>Weight:</strong> {animalData.characteristics.weight}</p>
                    <p><strong>Height:</strong> {animalData.characteristics.height}</p>
                    <p><strong>Color:</strong> {animalData.characteristics.color}</p>
                    <p><strong>Skin Type:</strong> {animalData.characteristics.skin_type}</p>
                    <p><strong>Average Litter Size:</strong> {animalData.characteristics.average_litter_size}</p>
                    <p><strong>Gestation Period:</strong> {animalData.characteristics.gestation_period}</p>
                    <p><strong>Age of Sexual Maturity:</strong> {animalData.characteristics.age_of_sexual_maturity}</p>
                    <p><strong>Age of Weaning:</strong> {animalData.characteristics.age_of_weaning}</p>
                    <p><strong>Prey:</strong> {animalData.characteristics.prey}</p>
                    <p><strong>Name of Young:</strong> {animalData.characteristics.name_of_young}</p>
                    <p><strong>Group Behavior:</strong> {animalData.characteristics.group_behavior}</p>
                    <p><strong>Estimated Population Size:</strong> {animalData.characteristics.estimated_population_size}</p>
                    <p><strong>Biggest Threat:</strong> {animalData.characteristics.biggest_threat}</p>
                    <p><strong>Distinctive Feature:</strong> {animalData.characteristics.most_distinctive_feature}</p>
                    <p><strong>Locations:</strong> {animalData.locations.join(', ')}</p>
                    <p><strong>Slogan:</strong> {animalData.characteristics.slogan}</p>
                    <p><strong>Number of Species:</strong> {animalData.characteristics.number_of_species}</p>
                </div>
            )}
        </div>
    );
};

export default AnimalInfo;
// js/manageFlights.js
import { flightsData } from './flightsData.js';  // Correct import statement

document.addEventListener('DOMContentLoaded', () => {
    const flightsTableBody = document.querySelector("#flights-table tbody");

    // Make sure flightsData is available
    if (!flightsData || flightsData.length === 0) {
        console.error("No flights data found!");
        return;
    }

    // Loop through each flight and add it to the table
    flightsData.forEach(flight => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${flight.flight_name}</td>
            <td>${flight.departure.split('T')[0]}</td>  <!-- Extract date -->
            <td>${flight.destination}</td>
            <td>${flight.departure.split('T')[1]}</td> <!-- Extract time -->
        `;

        flightsTableBody.appendChild(row);
    });
});

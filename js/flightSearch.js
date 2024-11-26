import { flightsData } from './flightsData.js';

document.addEventListener('DOMContentLoaded', () => {
    const originSelect = document.getElementById("origin");
    const destinationSelect = document.getElementById("destination");
    const flightsTableBody = document.getElementById("flightsTableBody");

    // הפקת רשימת היעדים והמוצאים הייחודיים
    const uniqueOrigins = [...new Set(flightsData.map(flight => flight.origin))];
    const uniqueDestinations = [...new Set(flightsData.map(flight => flight.destination))];

    // הוספת היעדים והמוצאים לשדות הבחירה
    uniqueOrigins.forEach(origin => {
        const option = document.createElement("option");
        option.value = origin;
        option.textContent = origin;
        originSelect.appendChild(option);
    });

    uniqueDestinations.forEach(destination => {
        const option = document.createElement("option");
        option.value = destination;
        option.textContent = destination;
        destinationSelect.appendChild(option);
    });

    // חיפוש טיסות
    const flightSearchForm = document.getElementById("flight-search-form");
    flightSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedOrigin = originSelect.value;
        const selectedDestination = destinationSelect.value;

        // מציאת הטיסות שמתאימות לבחירות
        const filteredFlights = flightsData.filter(flight => 
            flight.origin === selectedOrigin && flight.destination === selectedDestination
        );

        // הצגת הטיסות בטבלה
        flightsTableBody.innerHTML = ''; // נקה קודם את הטבלה
        if (filteredFlights.length === 0) {
            flightsTableBody.innerHTML = `<tr><td colspan="7">No flights found</td></tr>`;
        } else {
            filteredFlights.forEach(flight => {
                const row = flightsTableBody.insertRow();
                row.innerHTML = `
                    <td>${flight.flightCode}</td>
                    <td>${flight.origin}</td>
                    <td>${flight.destination}</td>
                    <td>${flight.departureTime}</td>
                    <td>${flight.airportName}</td>
                    <td><a href="${flight.airportWebsite}" target="_blank">${flight.airportWebsite}</a></td>
                    <td><a href="book-flight.html?flightCode=${flight.flightCode}">Book</a></td>
                `;
            });
        }
    });
});

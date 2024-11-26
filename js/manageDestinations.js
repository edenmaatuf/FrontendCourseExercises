import { flightsData as importedFlightsData } from './flightsData.js';

document.addEventListener('DOMContentLoaded', () => {
    const destinationsTableBody = document.getElementById("destinationsTableTbody");
    const addDestinationBtn = document.getElementById("add-destination-btn");  // ודא שאתה מקשר את הכפתור

    // טוען את הנתונים מה-localStorage
    let flightsData = JSON.parse(localStorage.getItem('flightsData')) || [];

       
    // אם אין טיסות, מציג הודעה מתאימה
    if (flightsData.length === 0) {
        destinationsTableBody.innerHTML = `<tr><td colspan="3">No destinations available</td></tr>`;
        console.warn("No flights data found!");
        return;
    }

    // שימוש ב-set כדי לקבל רק את היעדים הייחודיים
    const uniqueDestinations = [...new Set(flightsData.map(flight => flight.destination))];

    // מעבר על כל היעדים והוספתם לטבלה
    uniqueDestinations.forEach(destination => {
        const matchingFlights = flightsData.filter(flight => flight.destination === destination);

        matchingFlights.forEach(flight => {
            const row = destinationsTableBody.insertRow();
            row.innerHTML = `
                <td>${flight.destination}</td>
                <td>${flight.airportName}</td>
                <td><a href="${flight.airportWebsite}" target="_blank">${flight.airportWebsite}</a></td>
            `;
        });
    });

    // מאזין לאירוע לחיצה על כפתור הוספת יעד
    addDestinationBtn.addEventListener('click', () => {
        window.location.href = 'add-destination.html';  // עובר לדף add-destination
    });
});

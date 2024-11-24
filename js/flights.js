window.addEventListener('DOMContentLoaded', (event) => {
    // שימוש במידע מתוך flightsData.js
    const flightTableBody = document.querySelector('#flights-table tbody');
    
    // הוספת כל טיסה לטבלה
    flightsData.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flight_name}</td>
            <td>${flight.departure}</td>
            <td>${flight.destination}</td>
            <td><img src="${flight.image_url}" alt="${flight.destination}" width="50" height="50"></td>
        `;
        flightTableBody.appendChild(row);
    });
});

// טוען נתוני טיסות
import { flightsData } from './flightsData.js';

document.addEventListener('DOMContentLoaded', function () {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const boardingDateInput = document.getElementById('boarding-date');
    const boardingTimeInput = document.getElementById('boarding-time');
    const arrivalDateInput = document.getElementById('arrival-date');
    const arrivalTimeInput = document.getElementById('arrival-time');
    const addFlightForm = document.getElementById('add-flight-form');

    // מילוי רשימות בחירה של Origin ו-Destination
    flightsData.forEach(flight => {
        const originOption = document.createElement('option');
        originOption.value = flight.destination;
        originOption.textContent = flight.destination;
        originSelect.appendChild(originOption);

        const destinationOption = document.createElement('option');
        destinationOption.value = flight.destination;
        destinationOption.textContent = flight.destination;
        destinationSelect.appendChild(destinationOption);
    });

    // הגדרת מינימום לתאריכים
    const today = new Date().toISOString().split('T')[0];
    boardingDateInput.min = today;

    // האזנה לשינויים בתאריך יציאה
    boardingDateInput.addEventListener('change', function () {
        arrivalDateInput.min = boardingDateInput.value;
    });

    // האזנה לשינויים בתאריך ושעת המראה
    boardingTimeInput.addEventListener('change', function () {
        if (boardingDateInput.value === today) {
            const now = new Date();
            const currentTime = now.toISOString().split('T')[1].slice(0, 5);
            boardingTimeInput.min = currentTime;
        }
    });

    // האזנה לשינויים בתאריך ושעת נחיתה
    arrivalTimeInput.addEventListener('change', function () {
        if (arrivalDateInput.value === boardingDateInput.value) {
            arrivalTimeInput.min = boardingTimeInput.value;
        }
    });

    // טיפול בהגשת הטופס
    addFlightForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newFlight = {
            flight_id: flightsData.length + 1,
            flight_name: document.getElementById('flight-no').value,
            departure: `${boardingDateInput.value}T${boardingTimeInput.value}`,
            destination: destinationSelect.value,
            price: "$0", // ברירת מחדל, אפשר לשנות בהמשך
            link: "book-flight.html" // קישור ברירת מחדל
        };

        // הוספת הטיסה החדשה
        flightsData.push(newFlight);
        alert('Flight added successfully!');
        window.location.href = 'manage-flights.html';
    });
});

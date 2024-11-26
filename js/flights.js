// טוען נתוני טיסות
import { flightsData } from './flightsData.js';

document.addEventListener('DOMContentLoaded', function () {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const boardingDateInput = document.getElementById('boarding_date');
    const boardingTimeInput = document.getElementById('boarding_time');
    const arrivalDateInput = document.getElementById('arrival_date');
    const arrivalTimeInput = document.getElementById('arrival_time');
    const seatsInput = document.getElementById('seats');
    const addFlightForm = document.getElementById('add-flight-form');

    // יצירת מערך של כל היעדים הייחודיים מתוך הטיסות הקיימות
    const uniqueLocations = [...new Set(flightsData.map(flight => flight.origin))];

    // מילוי רשימות הבחירה של מקור ויעד על סמך הנתונים הקיימים
    uniqueLocations.forEach(location => {
        const originOption = document.createElement('option');
        originOption.value = location;
        originOption.textContent = location;
        originSelect.appendChild(originOption);
    });

    originSelect.addEventListener('change', function () {
        destinationSelect.innerHTML = '';
        const selectedOrigin = originSelect.value;

        flightsData.filter(flight => flight.origin === selectedOrigin).forEach(flight => {
            const destinationOption = document.createElement('option');
            destinationOption.value = flight.destination;
            destinationOption.textContent = flight.destination;
            destinationSelect.appendChild(destinationOption);
        });
    });

    // הגדרת מינימום לתאריכים
    const today = new Date().toISOString().split('T')[0];
    boardingDateInput.min = today;

    // ולידציה על תאריכים ושעות
    boardingDateInput.addEventListener('change', function () {
        arrivalDateInput.min = boardingDateInput.value;
    });

    arrivalDateInput.addEventListener('change', function () {
        const boardingDate = new Date(boardingDateInput.value);
        const arrivalDate = new Date(arrivalDateInput.value);
        if (arrivalDate < boardingDate) {
            alert('תאריך הגעה חייב להיות אחרי תאריך עלייה למטוס.');
            arrivalDateInput.value = '';
        }
    });

    // ולידציה על שעות
    boardingTimeInput.addEventListener('input', validateTime);
    arrivalTimeInput.addEventListener('input', validateTime);

    function validateTime(event) {
        const input = event.target;
        const [hours, minutes] = input.value.split(':').map(Number);
        if (hours > 23 || minutes > 59 || isNaN(hours) || isNaN(minutes)) {
            alert('שעה לא תקינה! אנא הזן שעה בפורמט תקין.');
            input.value = '';
        }
    }

    arrivalTimeInput.addEventListener('change', function () {
        if (arrivalDateInput.value === boardingDateInput.value) {
            if (arrivalTimeInput.value <= boardingTimeInput.value) {
                alert('שעת הנחיתה חייבת להיות אחרי שעת ההמראה.');
                arrivalTimeInput.value = '';
            }
        }
    });

    // ולידציה על מספר מושבים (מינימום 1)
    seatsInput.addEventListener('input', function () {
        if (seatsInput.value < 1 || isNaN(seatsInput.value)) {
            alert('מספר המושבים חייב להיות לפחות 1.');
            seatsInput.value = 1;
        }
    });

    // טיפול בהגשת הטופס
    addFlightForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newFlight = {
            flight_id: flightsData.length + 1,
            flight_name: document.getElementById('flight_name').value,
            boarding_date: boardingDateInput.value, // תאריך עלייה למטוס
            boarding_time: boardingTimeInput.value, // שעת עלייה למטוס
            arrival_date: arrivalDateInput.value, // תאריך נחיתה
            arrival_time: arrivalTimeInput.value, // שעת נחיתה
            origin: originSelect.value,
            destination: destinationSelect.value,
            link: "book-flight.html" // קישור ברירת מחדל
        };

        // הוספת הטיסה החדשה
        flightsData.push(newFlight);
        localStorage.setItem('flightsData', JSON.stringify(flightsData));
        alert('Flight added successfully!');
        window.location.href = 'manageFlights.html';
    });
});

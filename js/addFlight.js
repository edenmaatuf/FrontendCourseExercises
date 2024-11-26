// טוען טיסות קיימות מ-localStorage אם יש
let flightsData = JSON.parse(localStorage.getItem('flightsData')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const flightNoInput = document.getElementById('flight_name')
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const boardingDateInput = document.getElementById('boarding_date');
    const boardingTimeInput = document.getElementById('boarding_time');
    const arrivalDateInput = document.getElementById('arrival_date');
    const arrivalTimeInput = document.getElementById('arrival_time');
    const seatsInput = document.getElementById('seats');


    console.log("Loaded flightsData:", flightsData);  // הדפסה לקונסול כדי לוודא שנטענו טיסות

    // יצירת מערך של כל המקומות שממנו יש טיסות
    const origins = [...new Set(flightsData.map(flight => flight.origin))];

    console.log("Origins:", origins);  // הדפסה של המקומות שממנו יש טיסות

    // רשימה של יעדים מכל הטיסות הקיימות
    const destinations = flightsData.map(flight => flight.destination);

    console.log("Destinations:", destinations);  // הדפסה של כל היעדים

    // מילוי רשימת מקור (origin) עם כל המקומות שמהם יש טיסות
    origins.forEach(origin => {
        const originOption = document.createElement('option');
        originOption.value = origin;  // כאן המקור יהיה מקום שממנו יש טיסות
        originOption.textContent = origin;
        originSelect.appendChild(originOption);
    });

    // עדכון רשימת היעדים אחרי בחירת מקור
    originSelect.addEventListener('change', function () {
        // קודם כל ננקה את רשימת היעדים
        destinationSelect.innerHTML = '';

        // הוספת את האפשרות של יעד (destination)
        const destinationOption = document.createElement('option');
        destinationOption.value = "";
        destinationOption.textContent = "Select destination";
        destinationSelect.appendChild(destinationOption);

        // הוספת יעד לכל המקומות שיש לנו טיסות אליהם, אבל לא לאותו מקור
        const selectedOrigin = originSelect.value;
        const availableDestinations = flightsData.filter(flight => flight.origin === selectedOrigin).map(flight => flight.destination);

        console.log("Available destinations after origin select:", availableDestinations);  // הדפסה של היעדים אחרי בחירת מקור

        availableDestinations.forEach(destination => {
            const destinationOption = document.createElement('option');
            destinationOption.value = destination;
            destinationOption.textContent = destination;
            destinationSelect.appendChild(destinationOption);
        });
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
        e.preventDefault(); // מונע את השליחה הדיפולטיבית של הטופס
    
        const newFlight = {
            flight_id: flightsData.length + 1, // מזהה ייחודי לטיסה החדשה
            flight_name: document.getElementById('flight_name').value, // שם הטיסה
            boarding_date: document.getElementById('boarding_date').value, // תאריך המראה
            boarding_time: document.getElementById('boarding_time').value, // שעת המראה
            origin: document.getElementById('origin').value, // מקור הטיסה
            destination: document.getElementById('destination').value, // יעד הטיסה
            arrival_date: document.getElementById('arrival_date').value, // תאריך נחיתה
            arrival_time: document.getElementById('arrival_time').value, // שעת נחיתה
            seats: parseInt(document.getElementById('seats').value, 10), // מספר מושבים (להמיר למספר שלם)
            link: "book-flight.html" // קישור ברירת מחדל להזמנת הטיסה
        };

        // הוספת הטיסה החדשה
        flightsData.push(newFlight);

        // שמירה של הטיסות ב-localStorage
        localStorage.setItem('flightsData', JSON.stringify(flightsData));

        // הצגת הודעה שהטיסה נוספה
        alert('Flight added successfully!');

        // ניווט לעמוד ניהול טיסות
        window.location.href = '../manageFlights.html';
    });
});

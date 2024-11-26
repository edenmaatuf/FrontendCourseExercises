document.addEventListener('DOMContentLoaded', () => {
    const addDestinationForm = document.querySelector('form');

    // טוען את היעדים הקיימים מ-localStorage
    let flightsData = JSON.parse(localStorage.getItem('flightsData')) || [];

    // טיפול בהגשת הטופס
    addDestinationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // אוסף את הנתונים מהטופס
        const newDestination = {
            destinationCode: document.querySelector('[name="destination-code"]').value,
            destination: document.querySelector('[name="destination"]').value,
            airportName: document.querySelector('[name="airportName"]').value,
            airportWebsite: document.querySelector('[name="airportWebsite"]').value,
            imageUrl: document.querySelector('[name="image_url"]').value
        };

        // עדכון טיסות עם היעד החדש
        flightsData.forEach(flight => {
            if (!flight.destination.includes(newDestination.destination)) {
                flight.destination = newDestination.destination; // הוספת היעד החדש לטיסה
            }
        });

        // שמירת היעדים ב-localStorage
        localStorage.setItem('flightsData', JSON.stringify(flightsData));

        // הצגת הודעת הצלחה
        alert('Destination added successfully!');

        // חזרה לדף ניהול היעדים
        window.location.href = 'manage-destinations.html';
    });
});

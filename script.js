const eventTableBody = document.getElementById("eventTableBody");
const eventInput = document.getElementById("eventDate");
const eventDescriptionInput = document.getElementById("eventDescription");

const events = [];

function addEvent() {
const eventDateInput = eventInput.value;
const eventDescription = eventDescriptionInput.value.trim();

if (eventDescription === "") {
  alert("Please enter a description for the event.")
  return
}

// Convert the input date string to a Date object
const eventDate = new Date(eventDateInput);

// Get the current date and time
const now = new Date();

// Calculate the time remaining in milliseconds
const timeRemaining = eventDate - now;

// Check if the event date is valid and in the future
if (isNaN(eventDate.getTime()) || timeRemaining < 0) {
    alert("Please enter a valid future date for the event.");
    return;
}

// Add the event to the events array
events.push({ date: eventDate, description: eventDescription });

// Clear the input fields
eventInput.value = "";
eventDescriptionInput.value = "";

// Display the events in the table
displayEvents();
}

function displayEvents() {
// Clear the existing table
eventTableBody.innerHTML = "";

// Loop through the events array and display each event
events.forEach((event) => {
    // Convert the time remaining from milliseconds to days, hours, minutes, and seconds
    const timeRemaining = event.date - new Date();
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Create a new row for the event in the table
    const row = eventTableBody.insertRow(-1);

    // Add cells for event description and countdown
    const descriptionCell = row.insertCell(0);
    const countdownCell = row.insertCell(1);

    // Set the content of the cells
    descriptionCell.innerText = event.description;
    countdownCell.innerText = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
});
}

// Call displayEvents initially to show any existing events on page load
displayEvents();

// Call displayEvents every second to update the countdowns
setInterval(displayEvents, 1000);
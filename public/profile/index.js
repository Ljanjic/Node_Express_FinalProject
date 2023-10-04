const createEventButton = document.getElementById("createEventButton");
createEventButton.addEventListener('click', async () => {
    window.location.href = "https://node-express-special-day-reminder-app-mm8q.onrender.com/create-event";
});
const logoutUser = async () => {
    const response = await fetch('/api/v1/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Response:', response);
    const data = await response.json();
    console.log('Logout response:', data);

    // Redirect to a login page
    window.location.href = '/api/v1/login';
};

const logOut = document.getElementById("logOut");
logOut.addEventListener('click', async () => {
    logoutUser();
    alert("You are succesfully logged out!");
    window.localStorage.removeItem("token");
    window.location.href = "https://node-express-special-day-reminder-app-mm8q.onrender.com/login";
});

let sDays = [];
const getEvents = async () => {
    var myHeaders = new Headers();
    const test = `Bearer ${window.localStorage.getItem("token")}`
    console.log("test ==> ", test);

    const authToken = `Bearer ${window.localStorage.getItem("token")}`;
    myHeaders.append("Authorization", authToken);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch('/api/v1/sDays/', requestOptions);

        const data = await response.json();
        console.log("data ===> ", data);

        if (response.ok) {
            sDays = data.events
            return data.events;
        } else {
            console.error('getDays failed: ', data.message);
        }
    } catch (error) {
        console.error('An error occurred during getDays: ', error);
    }
};

const fetchEventsAndDisplay = async () => {
    try {
        await getEvents(); // Call the getEvents function to fetch events and update sDays
        console.log("Updated sDays array:", sDays);
        const { pastEvents, eventsToday, upcomingEvents } = sDays;
        console.log("pastEvents ===> ", pastEvents);
        console.log("eventsToday ===> ", eventsToday);
        console.log("upcomingEvents ===> ", upcomingEvents);
        for (i = 0; i < pastEvents.length; i++) {
            console.log("hello");
            addElement(pastEvents[i], "past");
        }
        for (i = 0; i < eventsToday.length; i++) {
            console.log("hello");
            addElement(eventsToday[i], "today");
        }
        for (i = 0; i < upcomingEvents.length; i++) {
            console.log("hello");
            addElement(upcomingEvents[i], "upcoming");
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

function addElement(element, elementParentId) {
    console.log("element ===> ", element);
    // create a new div element
    const newDayElement = document.createElement("div");

    const firstName = document.createElement("p");
    firstName.textContent = "First Name: " + element.firstName;

    const lastName = document.createElement("p");
    lastName.textContent = "Last Name: " + element.lastName;

    const occasion = document.createElement("p");
    occasion.textContent = "Occasion: " + element.occasion;

    const date = document.createElement("p");
    date.textContent = "Date: " + element.date;

    const deleteEventButton = document.createElement("button");
    deleteEventButton.textContent = "Delete event";
    deleteEventButton.addEventListener('click', async (event) => {
        deleteEvent(element.id)
    });

    const updateEventButton = document.createElement("button");
    updateEventButton.textContent = "Update event";
    updateEventButton.addEventListener('click', async (event) => {
        updateEventRedirect(element.id);
    });

    // add the text node to the newly created div
    newDayElement.appendChild(firstName);
    newDayElement.appendChild(lastName);
    newDayElement.appendChild(occasion);
    newDayElement.appendChild(date);
    newDayElement.appendChild(deleteEventButton);
    newDayElement.appendChild(updateEventButton);

    newDayElement.style.border = "1px solid black";
    newDayElement.style.borderRadius = "6px";
    newDayElement.style.width = "fit-content";
    newDayElement.style.padding = "3px";
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById(elementParentId);

    currentDiv.appendChild(newDayElement);
}

const deleteEvent = async (eventId) => {
    console.log("inside deleteEvent()");
    var myHeaders = new Headers();
    const test = `Bearer ${window.localStorage.getItem("token")}`
    console.log("test ==> ", test);

    const authToken = `Bearer ${window.localStorage.getItem("token")}`;
    myHeaders.append("Authorization", authToken);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`/api/v1/sDays/${eventId}`, requestOptions);

        const data = await response.json();

        if (response.ok) {
            alert('Reminder is successfully deleted!');
            window.location.reload();
            return { "deletedEventId": eventId };
        } else {
            console.error('deleteEvent failed: ', data.message);
        }
    } catch (error) {
        console.error('An error occurred during deleteEvent: ', error);
    }
};

const updateEventRedirect = async (eventId) => {
    window.localStorage.setItem("eventId", eventId);
    window.location.href = "https://node-express-special-day-reminder-app-mm8q.onrender.com/update-event";
};

// Call the fetchEventsAndLog function to initiate the fetching of events
fetchEventsAndDisplay();
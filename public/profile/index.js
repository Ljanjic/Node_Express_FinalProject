let sDays = [];
const getEvents = async () => {
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("token")}`);
    // console.log(" window.localStorage.getItem('token') ===> ", window.localStorage.getItem("token"));
    var myHeaders = new Headers();
    const test = `Bearer ${window.localStorage.getItem("token")}`
    console.log("test ==> ", test);
    // const authToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCsdI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTEwYmEwYjE2YjY2ZjZmNTJlMWZkNDEiLCJuYW1lIjoiTGppbGphbmEiLCJpYXQiOjE2OTU3NTY1MjMsImV4cCI6MTY5ODM0ODUyM30.dExW-EWG_ZqzWqQ4wp6xaCq2IlvE7VPLM7bfqHbVK40`;
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
}

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
    })

    const updateEventLink = document.createElement("a");
    updateEventLink.textContent = "Update event";
    updateEventLink.href = `http://localhost:5000/day/${element.id}`;

    // add the text node to the newly created div
    newDayElement.appendChild(firstName);
    newDayElement.appendChild(lastName);
    newDayElement.appendChild(occasion);
    newDayElement.appendChild(date);
    newDayElement.appendChild(deleteEventButton);
    newDayElement.appendChild(updateEventLink);
    newDayElement.style.border = "1px solid black";
    newDayElement.style.borderRadius = "6px";
    newDayElement.style.width = "fit-content";
    newDayElement.style.padding = "3px";
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById(elementParentId);
    // document.body.insertBefore(newDayElement, currentDiv);
    currentDiv.appendChild(newDayElement);
}

const deleteEvent = async (eventId) => {
    console.log("inside deleteEvent()");
    var myHeaders = new Headers();
    const test = `Bearer ${window.localStorage.getItem("token")}`
    console.log("test ==> ", test);
    // const authToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCsdI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTEwYmEwYjE2YjY2ZjZmNTJlMWZkNDEiLCJuYW1lIjoiTGppbGphbmEiLCJpYXQiOjE2OTU3NTY1MjMsImV4cCI6MTY5ODM0ODUyM30.dExW-EWG_ZqzWqQ4wp6xaCq2IlvE7VPLM7bfqHbVK40`;
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
        console.log("data here ===> ", data);

        if (response.ok) {
            alert('Event was successfully deleted!');
            window.location.reload();
            return { "deletedEventId": eventId };
        } else {
            console.error('deleteEvent failed: ', data.message);
        }
    } catch (error) {
        console.error('An error occurred during deleteEvent: ', error);
    }
}

// Call the fetchEventsAndLog function to initiate the fetching of events
fetchEventsAndDisplay();

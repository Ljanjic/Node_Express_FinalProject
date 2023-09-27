const createEventButton = document.getElementById("createEventButton");
createEventButton.addEventListener('click', async () => {
    window.location.href = "http://localhost:5000/create-event/";
})

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
    alert("user was logged out");
    window.localStorage.removeItem("token");
    window.location.href = "http://localhost:5000/login/";
})

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

    // const updateEventLink = document.createElement("a");
    // updateEventLink.textContent = "Update event";
    // updateEventLink.href = `http://localhost:5000/day/${element.id}`;

    // const updateEventButton = document.createElement("button");
    // updateEventButton.textContent = "Update event";
    // updateEventButton.addEventListener('click', async (event) => {
    //     openUpdateEventForm(element.id)
    // })

    const updateEventButton = document.createElement("button");
    updateEventButton.textContent = "Update event";
    updateEventButton.addEventListener('click', async (event) => {
        updateEventRedirect(element.id)
    })

    // add the text node to the newly created div
    newDayElement.appendChild(firstName);
    newDayElement.appendChild(lastName);
    newDayElement.appendChild(occasion);
    newDayElement.appendChild(date);
    newDayElement.appendChild(deleteEventButton);
    newDayElement.appendChild(updateEventButton);
    // newDayElement.appendChild(updateEventLink);
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

const updateEventRedirect = async (eventId) => {
    window.localStorage.setItem("eventId", eventId);
    window.location.href = "http://localhost:5000/update-event/";
}

// const openUpdateEventForm = async (eventId) => {
//     const updateEventFormOuter = document.createElement("div");
//     updateEventFormOuter.style.position = "absolute";
//     updateEventFormOuter.style.width = "100vw";
//     updateEventFormOuter.style.height = "100vh";
//     updateEventFormOuter.style.display = "flex";
//     updateEventFormOuter.style.justifyContent = "center";
//     updateEventFormOuter.style.alignItems = "center";

//     const updateEventForm = document.createElement("form");
//     updateEventFormOuter.appendChild(updateEventForm);

//     const firstNameLabel = document.createElement("label");
//     firstNameLabel.textContent = "First Name:";

//     const firstNameInput = document.createElement("input");

//     // const firstName = document.getElementById('firstName').value;
//     // const lastName = document.getElementById('lastName').value;
//     // const occasion = document.getElementById('occasion').value;
//     // const occasion_date = document.getElementById('occasion_date').value;
//     // const age = document.getElementById('age').value;
//     // const createdBy = document.getElementById('createdBy').value;

//     updateEventForm.appendChild(firstNameLabel);
//     updateEventForm.appendChild(firstNameInput);
//     const currentDiv = document.getElementById('days');
//     currentDiv.appendChild(updateEventForm);

//     console.log("inside updateEvent()");
//     var myHeaders = new Headers();
//     const test = `Bearer ${window.localStorage.getItem("token")}`
//     console.log("test ==> ", test);
//     // const authToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCsdI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTEwYmEwYjE2YjY2ZjZmNTJlMWZkNDEiLCJuYW1lIjoiTGppbGphbmEiLCJpYXQiOjE2OTU3NTY1MjMsImV4cCI6MTY5ODM0ODUyM30.dExW-EWG_ZqzWqQ4wp6xaCq2IlvE7VPLM7bfqHbVK40`;
//     const authToken = `Bearer ${window.localStorage.getItem("token")}`;
//     myHeaders.append("Authorization", authToken);

//     var raw = JSON.stringify({
//         "firstName": firstName,
//         "lastName": lastName,
//         "occasion": occasion,
//         "occasion_date": occasion_date,
//         "age": age,
//         "createdBy": createdBy
//     });

//     var requestOptions = {
//         method: 'PUT',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     try {
//         const response = await fetch(`/api/v1/sDays/${eventId}`, requestOptions);

//         const data = await response.json();
//         console.log("data here ===> ", data);

//         if (response.ok) {
//             alert('Event was successfully updated!');
//             window.location.reload();
//             return { "updatedEventId": eventId };
//         } else {
//             console.error('updateEvent failed: ', data.message);
//         }
//     } catch (error) {
//         console.error('An error occurred during updateEvent: ', error);
//     }
// }

// Call the fetchEventsAndLog function to initiate the fetching of events
fetchEventsAndDisplay();

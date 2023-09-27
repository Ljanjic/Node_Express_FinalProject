const updateEventForm = document.getElementById("updateEventForm");

const updateEvent = async () => {
    const eventId = window.localStorage.getItem("eventId")
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const occasion = document.getElementById('occasion').value;
    const occasion_date = document.getElementById('occasion_date').value;
    const age = document.getElementById('age').value;
    const createdBy = document.getElementById('createdBy').value;
    console.log("firstName ===> ", firstName);
    console.log("lastName ===> ", lastName);
    console.log("occasion ===> ", occasion);
    console.log("occasion_date ===> ", occasion_date);
    console.log("age ===> ", age);
    console.log("createdBy ===> ", createdBy);

    var myHeaders = new Headers();
    // const test = `Bearer ${window.localStorage.getItem("token")}`
    // console.log("test ==> ", test);
    // const authToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCsdI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTEwYmEwYjE2YjY2ZjZmNTJlMWZkNDEiLCJuYW1lIjoiTGppbGphbmEiLCJpYXQiOjE2OTU3NTY1MjMsImV4cCI6MTY5ODM0ODUyM30.dExW-EWG_ZqzWqQ4wp6xaCq2IlvE7VPLM7bfqHbVK40`;
    const authToken = `Bearer ${window.localStorage.getItem("token")}`;
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authToken);

    var raw = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "occasion": occasion,
        "occasion_date": occasion_date,
        "age": age,
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    try {
        console.log("here");
        const response = await fetch(`/api/v1/sDays/${eventId}`, requestOptions);

        const data = await response.json();
        console.log("data ===> ", data);

        if (response.ok) {
            alert("event was updated");
            window.localStorage.removeItem("eventId");
            window.location.href = "http://localhost:5000/profile/";
        } else {
            console.error('Update event failed: ', data.message);
        }
    } catch (error) {
        console.error('An error occurred during update event: ', error);
    }
}

// LOGIN USER
updateEventForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // document.getElementById('logoutButton').addEventListener('click', logoutUser);

    updateEvent();

    // Set up event listener for the Login button
    // const loginButton = document.getElementById('loginButton');
    // loginButton.addEventListener('click', loginUser);
});
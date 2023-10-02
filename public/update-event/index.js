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
        const response = await fetch(`/api/v1/sDays/${eventId}`, requestOptions);

        const data = await response.json();
        console.log("data ===> ", data);

        if (response.ok) {
            alert("event was updated");
            window.localStorage.removeItem("eventId");
            window.location.href = `${process.env.BASE_URL}/profile/`;
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

    updateEvent();

});
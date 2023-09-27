const newEventForm = document.getElementById("newEventForm");

const createEvent = async () => {
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
    const test = `Bearer ${window.localStorage.getItem("token")}`
    console.log("test ==> ", test);
    const authToken = `Bearer ${window.localStorage.getItem("token")}`;
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authToken);

    var raw = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "occasion": occasion,
        "occasion_date": occasion_date,
        "age": age,
        "createdBy": createdBy
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    try {
        console.log("here");
        const response = await fetch('/api/v1/sDays', requestOptions);

        const data = await response.json();
        console.log("data ===> ", data);

        if (response.ok) {
            alert("event was created")
            window.location.href = "http://localhost:5000/profile/";
        } else {
            console.error('Create event failed: ', data.message);
        }
    } catch (error) {
        console.error('An error occurred during create event: ', error);
    }
}

// LOGIN USER
newEventForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    createEvent();
});
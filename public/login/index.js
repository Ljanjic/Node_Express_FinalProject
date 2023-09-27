const loginForm = document.getElementById("loginForm");

const loginUser = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful!');
            console.log('User: ', data.user);
            console.log('Token: ', data.token);
            const token = data.token;
            // const token = data.token.slice(1, -1);
            console.log("token ==> ", token);
            // Store the token in localStorage or a cookie for future authenticated requests
            // window.localStorage.setItem("token", JSON.stringify(data.token)); // this is wrong
            window.localStorage.setItem("token", data.token);
            console.log(" window.localStorage.getItem('token') ===> ", window.localStorage.getItem("token"));
            alert('Login successful! You will be now redirected to Profile page');
            window.location.href = "http://localhost:5000/profile/";
        } else {
            console.error('Login failed: ', data.message);
        }
    } catch (error) {
        console.error('An error occurred during login: ', error);
    }
}

// LOGIN USER
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // document.getElementById('logoutButton').addEventListener('click', logoutUser);

    loginUser();

    // Set up event listener for the Login button
    // const loginButton = document.getElementById('loginButton');
    // loginButton.addEventListener('click', loginUser);
});
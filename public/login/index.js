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
        console.log("data ====> ", data);

        if (response.ok) {
            console.log('Login successful!');
            console.log('User: ', data.user);
            console.log('Token: ', data.token);
            const token = data.token;
            console.log("token ==> ", token);
            // Storing the token in localStorage or a cookie for future authenticated requests
            window.localStorage.setItem("token", data.token);
            console.log(" window.localStorage.getItem('token') ===> ", window.localStorage.getItem("token"));
            alert('Login successful! You will be now redirected to Profile page');
            window.location.href = `${process.env.BASE_URL}/profile`;
        } else {
            alert("Login failed! You entered Invalid Credentials");
            console.error('Login failed: ', data.msg);
        }
    } catch (error) {
        console.error('An error occurred during login: ', error);
    }
}

// LOGIN USER
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    loginUser();
});
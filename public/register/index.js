const registerForm = document.getElementById("registerForm");

const registerUser = async () => {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        console.log('Registration response:', data);

        if (response.ok) {
            console.log('Registration successful!');
            // Storing the token in localStorage or a cookie for future authenticated requests
            alert('Registration successful!');
            window.location.href = "http://localhost:5000/login/";
        } else {
            console.error('Registration failed:', data.message);
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
    }
}

// REGISTER USER
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    registerUser();
});
const form = document.getElementById("logoutButton");
// LOGOUT USER
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
form.addEventListener('click', logoutUser);
console.log('Event listener added');

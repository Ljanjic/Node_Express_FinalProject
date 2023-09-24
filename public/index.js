// REGISTER USER
const registerUser = async () => {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    const response = await fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
  
    const data = await response.json();
    console.log('Registration response:', data);
  };
  
// LOGIN USER  
  const loginUser = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const response = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
  
    const data = await response.json();
    console.log('Login response:', data);
  };

// LOGOUT USER  
  const logoutUser = async () => {
    // Perform any necessary logout actions on the client-side
    // For example, clear any tokens or session-related data
  
    const response = await fetch('/api/v1/logout', {
      method: 'POST', // Adjust the method based on your server's logout route
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
    console.log('Logout response:', data);
  
    // Redirect to a suitable page or perform any other actions after logout
    window.location.href = '/login.html'; // Replace with your actual logout redirect page
  };
  
  document.getElementById('registerButton').addEventListener('click', registerUser);
  document.getElementById('loginButton').addEventListener('click', loginUser);
  document.getElementById('logoutButton').addEventListener('click', logoutUser);
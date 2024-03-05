var userdetails = JSON.parse(localStorage.getItem('userdetails')) || [];

function Register() {
    let username = document.getElementById('user-name').value;
    let password = document.getElementById('user-password').value;
    let email = document.getElementById('email').value;

    let user = {
        "Username": username,
        "Password": password,
        "Email": email
    };
    userdetails.push(user);
    localStorage.setItem('userdetails', JSON.stringify(userdetails));

    alert('Registration successful!');
    return false; // Prevent form submission
}

function Login() {
    let username = document.getElementById('login-user-name').value;
    let password = document.getElementById('login-user-password').value;

    for (var i = 0; i < userdetails.length; i++) {
        if (userdetails[i].Username === username && userdetails[i].Password === password) {
            alert('Login successful!');

            window.location.href='index.html';
            return false; // Prevent form submission
        }
    }
    alert('Invalid username or password.');
    return false; // Prevent form submission
}
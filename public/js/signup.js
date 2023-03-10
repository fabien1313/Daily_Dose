const registerFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }); console.log(username, password);

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create account');
        }
    }
}

document
    .querySelector('#signup-register-btn')
    .addEventListener('click', registerFormHandler);
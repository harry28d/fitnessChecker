// Sign-up function
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;
    const dob = document.getElementById('signup-dob').value;
    const contact = document.getElementById('signup-contact').value;
    const email = document.getElementById('signup-email').value;
    const signupMessage = document.getElementById('signup-message');

    if (username && password && name && dob && contact && email) {
        const userProfile = {
            username,
            password,
            name,
            dob,
            contact,
            email
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        signupMessage.innerText = 'Sign-up successful! Please log in.';
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
    } else {
        signupMessage.innerText = 'Please fill in all fields.';
    }
}

// Login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loginMessage = document.getElementById('login-message');
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (userProfile && username === userProfile.username && password === userProfile.password) {
        loginMessage.innerText = 'Login successful!';
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        loadProfile();
    } else {
        loginMessage.innerText = 'Invalid username or password.';
    }
}

// Logout function
function logout() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Show section function
function showSection(sectionId) {
    const sections = document.querySelectorAll('#main-content > section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// BMI calculation function
function calculateBMI() {
    const weight = document.getElementById('bmi-weight').value;
    const height = document.getElementById('bmi-height').value;

    if (weight > 0 && height > 0) {
        const bmi = weight / ((height / 100) ** 2);
        let category = '';

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

        document.getElementById('bmi-result').innerText = `Your BMI is ${bmi.toFixed(2)} (${category}).`;
        saveHistory('BMI', `Weight: ${weight}kg, Height: ${height}cm, BMI: ${bmi.toFixed(2)} (${category})`);
    } else {
        alert('Please enter valid values for weight and height.');
    }
}

// Calorie calculation function
function calculateCalories() {
    const age = document.getElementById('calorie-age').value;
    const gender = document.getElementById('calorie-gender').value;
    const weight = document.getElementById('calorie-weight').value;
    const height = document.getElementById('calorie-height').value;
    const activityLevel = document.getElementById('activity-level').value;

    if (age > 0 && weight > 0 && height > 0) {
        let bmr;

        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        const calories = bmr * activityLevel;
        document.getElementById('calorie-result').innerText = `Your daily calorie requirement is ${calories.toFixed(2)} calories.`;
        saveHistory('Calorie', `Age: ${age}, Gender: ${gender}, Weight: ${weight}kg, Height: ${height}cm, Calories: ${calories.toFixed(2)}`);
    } else {
        alert('Please enter valid values for all fields.');
    }
}

// Save history function
function saveHistory(type, details) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({ type, details, date: new Date().toLocaleString() });
    localStorage.setItem('history', JSON.stringify(history));
    loadHistory();
}

// Load history function
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyContent = document.getElementById('history-content');
    historyContent.innerHTML = '';

    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `<p>${item.date}</p><p>${item.type}: ${item.details}</p>`;
        historyContent.appendChild(historyItem);
    });
}

// Load profile function
function loadProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const profileContent = document.getElementById('profile-content');
    profileContent.innerHTML = `
        <p>Username: ${userProfile.username}</p>
        <p>Name: ${userProfile.name}</p>
        <p>Date of Birth: ${userProfile.dob}</p>
        <p>Contact: ${userProfile.contact}</p>
        <p>Email: ${userProfile.email}</p>
    `;
    document.getElementById('profile-name').value = userProfile.name;
    document.getElementById('profile-dob').value = userProfile.dob;
    document.getElementById('profile-contact').value = userProfile.contact;
    document.getElementById('profile-email').value = userProfile.email;
}

// Update profile function
function updateProfile() {
    const name = document.getElementById('profile-name').value;
    const dob = document.getElementById('profile-dob').value;
    const contact = document.getElementById('profile-contact').value;
    const email = document.getElementById('profile-email').value;

    if (name && dob && contact && email) {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        userProfile.name = name;
        userProfile.dob = dob;
        userProfile.contact = contact;
        userProfile.email = email;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        loadProfile();
        alert('Profile updated successfully!');
    } else {
        alert('Please fill in all fields.');
    }
}

// On load, show login or main content based on login status
document.addEventListener('DOMContentLoaded', () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.username && userProfile.password) {
        document.getElementById('login-section').style.display = 'block';
    } else {
        document.getElementById('signup-section').style.display = 'block';
    }
    loadHistory();
});

import { auth } from "./firebase_config.js";
import { readDoc } from "./firestore.js"

export const getUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve({
                    status: true,
                    data: user,
                });
            } else {
                resolve({
                    status: false,
                });
            }
        }, (error) => {
            reject(error);
        });
    });
};

const getUserData = async () => {
    // Get user data
    const userResponse = await getUser();

    if (!userResponse.status) {
        throw new Error("User is not signed in");
    }

    // Get user's email
    const email = userResponse.data.email;

    // Fetch user document from the database using email
    const userDoc = await readDoc("users", email);

    // Get the username from the user document
    const username = userDoc.data().username;
    console.log(username);

    const usernameContainer = document.getElementById('username');

    // Clear the container (optional, if you want to start fresh each time)
    usernameContainer.innerHTML = '';

    const titleElement = document.createElement('p');
    titleElement.className = "text-3xl font-bold mt-4";
    titleElement.textContent = username;

    usernameContainer.appendChild(titleElement);
}

// Call the function when the document is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    getUserData();
});
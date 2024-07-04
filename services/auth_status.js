import { auth } from "./firebase_config.js";

const checkSignedUser = () => {
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

window.addEventListener('load', () => {
    checkSignedUser().then(result => {
        if (!result.status) {
            window.location.href = '../index.html';
        } else {
            console.log('User is signed in:', result.data);
        }
    }).catch(error => {
        console.error('Error checking signed-in user:', error);
    });
});
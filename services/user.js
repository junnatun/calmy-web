import { auth } from "./firebase_config.js";

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

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth } from "./firebase_config.js";
import { readDoc } from "./firestore.js"



const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed up successfully
    const user = userCredential.user;

    const docRef = await readDoc("users", email);

    return docRef;
  } catch (error) {
    // Handle errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`Error ${errorCode}: ${errorMessage}`);
  }
};



document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signin").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email == "" && password == "") {
      Swal.fire({
        title: "Error!",
        text: "Data tidak lengkap",
        icon: "error",
        confirmButtonText: "Tutup",
      });
      return false;
    }

    try {
      const user = await signIn(email, password);
      Swal.fire({
        title: "Success!",
        text: `Anda berhasil masuk dengan email ${email}`,
        icon: "success",
        confirmButtonText: "Selanjutnya",
      }).then(() => {
        window.location.href = "beranda.html";
      });
      console.log("User signed in:", user);
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: "Error!",
        text: "Gagal masuk ke aplikasi!",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  });
});

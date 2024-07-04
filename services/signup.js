import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth } from "./firebase_config.js";
import { createDoc } from "./firestore.js"

const signUpWithEmailAndPassword = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed up successfully
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Update username
    // await updateDisplayName(user, username);


    // Create user data on firestore
    const data = {
      "email": email,
      "username": username,
      "imgProfile": "profile_male_1",
      "jenisKelamin": "Laki-laki",
      "telp": "+62"
    };

    const docRef = await createDoc("users", email, data);

    return docRef;
  } catch (error) {
    // Handle errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`Error ${errorCode}: ${errorMessage}`);
  }
};



document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signup").addEventListener("click", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cPassword = document.getElementById("cPassword").value;

    if (username == "" && email == "" && password == "" && cPassword == "") {
      Swal.fire({
        title: "Error!",
        text: "Data tidak lengkap",
        icon: "error",
        confirmButtonText: "Tutup",
      });
      return false;
    }

    if (password != cPassword) {
      Swal.fire({
        title: "Error!",
        text: "Password tidak cocok",
        icon: "error",
        confirmButtonText: "Tutup",
      });
      return false;
    }

    try {
      const user = await signUpWithEmailAndPassword(username, email, password);
      Swal.fire({
        title: "Success!",
        text: `Akun ${user.id} berhasil terdaftar. Periksa email untuk verifikasi akun!`,
        icon: "success",
        confirmButtonText: "Selanjutnya",
      }).then(() => {
        window.location.href = "signin.html";
      });
      console.log("User signed up:", user);
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: "Error!",
        text: "Akun gagal terdaftar",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  });
});



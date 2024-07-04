// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   signInWithEmailAndPassword
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// import { auth } from "./firebase_config.js";
// import { createDoc, readDoc } from "./firestore.js"

// const signUpWithEmailAndPassword = async (username, email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     // Signed up successfully
//     const user = userCredential.user;

//     // Send email verification
//     await sendEmailVerification(user);

//     // Update username
//     // await updateDisplayName(user, username);


//     // Create user data on firestore
//     const data = {
//       "email": email,
//       "username": username,
//       "imgProfile": "profile_male_1",
//       "jenisKelamin": "Laki-laki",
//       "telp": "+62"
//     };

//     const docRef = await createDoc("users", email, data);

//     return docRef;
//   } catch (error) {
//     // Handle errors here
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     throw new Error(`Error ${errorCode}: ${errorMessage}`);
//   }
// };

// const signIn = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     // Signed up successfully
//     const user = userCredential.user;

//     const docRef = await readDoc("users", email);

//     return docRef;
//   } catch (error) {
//     // Handle errors here
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     throw new Error(`Error ${errorCode}: ${errorMessage}`);
//   }
// };

// const signOut = () => {
//   return new Promise((resolve, reject) => {
//     auth.signOut().then(() => {
//       return resolve({
//         status: true,
//       });
//     }).catch((error) => {
//       return resolve({
//         status: false,
//         message: error,
//       });
//     });
//   });

// }

// const checkSignedUser = () => {
//   return new Promise((resolve, reject) => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         resolve({
//           status: true,
//           data: user,
//         });
//       } else {
//         resolve({
//           status: false,
//         });
//       }
//     }, (error) => {
//       reject(error);
//     });
//   });
// };


// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("signup").addEventListener("click", async (event) => {
//     event.preventDefault();
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const cPassword = document.getElementById("cPassword").value;

//     if (username == "" && email == "" && password == "" && cPassword == "") {
//       Swal.fire({
//         title: "Error!",
//         text: "Data tidak lengkap",
//         icon: "error",
//         confirmButtonText: "Tutup",
//       });
//       return false;
//     }

//     if (password != cPassword) {
//       Swal.fire({
//         title: "Error!",
//         text: "Password tidak cocok",
//         icon: "error",
//         confirmButtonText: "Tutup",
//       });
//       return false;
//     }

//     try {
//       const user = await signUpWithEmailAndPassword(username, email, password);
//       Swal.fire({
//         title: "Success!",
//         text: `Akun ${user.id} berhasil terdaftar. Periksa email untuk verifikasi akun!`,
//         icon: "success",
//         confirmButtonText: "Selanjutnya",
//       }).then(() => {
//         window.location.href = "signin.html";
//       });
//       console.log("User signed up:", user);
//     } catch (error) {
//       console.error(error.message);
//       Swal.fire({
//         title: "Error!",
//         text: "Akun gagal terdaftar",
//         icon: "error",
//         confirmButtonText: "Tutup",
//       });
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("signin").addEventListener("click", async (event) => {
//     event.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     if (email == "" && password == "") {
//       Swal.fire({
//         title: "Error!",
//         text: "Data tidak lengkap",
//         icon: "error",
//         confirmButtonText: "Tutup",
//       });
//       return false;
//     }

//     try {
//       const user = await signIn(email, password);
//       Swal.fire({
//         title: "Success!",
//         text: `Anda berhasil masuk dengan email ${email}`,
//         icon: "success",
//         confirmButtonText: "Selanjutnya",
//       }).then(() => {
//         window.location.href = "beranda.html";
//       });
//       console.log("User signed in:", user);
//     } catch (error) {
//       console.error(error.message);
//       Swal.fire({
//         title: "Error!",
//         text: "Gagal masuk ke aplikasi!",
//         icon: "error",
//         confirmButtonText: "Tutup",
//       });
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("check-auth").addEventListener("click", async (event) => {
//     event.preventDefault();
//     try {
//       const result = await checkSignedUser();
//       console.log(result["data"]);

//       if (result["status"]) {
//         // User is signed in
//         Swal.fire({
//           title: "Success!",
//           text: `User Signed in`,
//           icon: "success",
//           confirmButtonText: "Selanjutnya",
//         }).then(() => {
//           window.location.href = "index.html";
//         });
//       } else {
//         // User is signed out
//         console.log('User signed out');
//         Swal.fire({
//           title: "Failed!",
//           text: `User signed out`,
//           icon: "error",
//           confirmButtonText: "Selanjutnya",
//         }).then(() => {
//           window.location.href = "index.html";
//         });
//       }
//     } catch (error) {
//       console.error("Error checking sign-in status:", error);
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("signout").addEventListener("click", async (event) => {
//     event.preventDefault();

//     const result = await signOut();
//     console.log(result["status"]);


//     if (result["status"]) {
//       // User signout
//       Swal.fire({
//         title: "Success!",
//         text: `Signout berhasil`,
//         icon: "success",
//         confirmButtonText: "Selanjutnya",
//       }).then(() => {
//         window.location.href = "index.html";
//       });
//     } else {
//       // User is signed out
//       Swal.fire({
//         title: "Failed!",
//         text: `Signout gagal`,
//         icon: "failed",
//         confirmButtonText: "Selanjutnya",
//       }).then(() => {
//         window.location.href = "index.html";
//       });
//     }

//   });
// });

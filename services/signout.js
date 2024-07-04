import { auth } from "./firebase_config.js";



const signOut = () => {
  return new Promise((resolve, reject) => {
    auth.signOut().then(() => {
      return resolve({
        status: true,
      });
    }).catch((error) => {
      return reject({
        status: false,
        message: error,
      });
    });
  });

}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signout").addEventListener("click", async (event) => {
    event.preventDefault();

    const result = await signOut();
    console.log(result["status"]);


    if (result["status"]) {
      // User signout
      Swal.fire({
        title: "Success!",
        text: `Signout berhasil`,
        icon: "success",
        confirmButtonText: "Selanjutnya",
      }).then(() => {
        window.location.href = "../index.html";
      });
    } else {
      // User is signed out
      Swal.fire({
        title: "Failed!",
        text: `Signout gagal`,
        icon: "failed",
        confirmButtonText: "Selanjutnya",
      }).then(() => {
        window.location.href = "index.html";
      });
    }

  });
});

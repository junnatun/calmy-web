import { createDoc } from "./firestore.js"
import { getUser } from "./user.js"
import { readDocsWithQuery } from "./firestore.js"
import { Timestamp } from "./firebase_config.js";



const addJournal = async (title, desc) => {
    // Get user data
    const userResponse = await getUser();

    // Get current date
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;

    if (!userResponse.status) {
        throw new Error("User is not signed in");
    }

    const email = userResponse.data.email;

    // Create Doc ID
    const id = `${email.split('@')[0]}@${formattedDate}`;

    console.log(email);
    console.log(date);

    // Create user data on Firestore
    const data = {
        "email": email,
        "date": date,
        "title": title,
        "desc": desc,
    };

    const docRef = await createDoc("journals_web", id, data);

    return docRef;
};

const getJournals = async () => {
    // Get user data
    const userResponse = await getUser();

    if (!userResponse.status) {
        throw new Error("User is not signed in");
    }

    const email = userResponse.data.email;

    const result = await readDocsWithQuery("journals_web", "email", email);

    // Process the results
    const journals = [];
    result.forEach((doc) => {
        journals.push({ id: doc.id, ...doc.data() });
    });

    console.log(journals);

    // Get the container element
    const journalContainer = document.getElementById('journals-col');

    // Clear the container (optional, if you want to start fresh each time)
    journalContainer.innerHTML = '';

    // Loop through journals and create HTML elements
    if (journals.length > 0) {

        journals.forEach(journal => {
            const journalElement = document.createElement('a');
            journalElement.href = "#";
            journalElement.id = "open-modal-view";
            journalElement.className = "flex flex-col p-6 h-42 bg-white rounded-3xl text-xl text-left mb-6 mx-4 justify-between";

            const dateElement = document.createElement('p');
            dateElement.className = "text-normal italic mt-4";
            if (journal.date instanceof Timestamp) {
                journal.date = journal.date.toDate();
            }

            dateElement.textContent = formatDate(journal.date);

            console.log(journal.date);


            const titleElement = document.createElement('p');
            titleElement.className = "text-3xl font-bold mt-4";
            titleElement.textContent = journal.title;

            const descElement = document.createElement('p');
            descElement.className = "text-normal mt-4";
            descElement.textContent = journal.desc;

            // white bg
            const whiteBg = document.createElement('div');
            if (journals.length < 2) {
                whiteBg.className = "w-full h-96";
            }

            journalElement.appendChild(dateElement);
            journalElement.appendChild(titleElement);
            journalElement.appendChild(descElement);
            journalContainer.appendChild(journalElement);
            journalContainer.appendChild(whiteBg);
        });
    } else {
        const journalElement = document.createElement('div');
        journalElement.className = "w-full h-96 bg-main-bg";
        journalContainer.appendChild(journalElement);

    }

}


// Function to format date to "Day Month Year"
const formatDate = (date) => {
    if (!(date instanceof Date)) return '';

    const day = date.getDate();
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

// Call getJournals when the page loads
window.addEventListener('load', getJournals);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("save").addEventListener("click", async (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const desc = document.getElementById("desc").value;

        if (title == "" && desc == "") {
            Swal.fire({
                title: "Error!",
                text: "Data tidak lengkap",
                icon: "error",
                confirmButtonText: "Tutup",
            });
            return false;
        }

        try {
            const user = await addJournal(title, desc);
            Swal.fire({
                title: "Success!",
                text: `Journal Berhasil Disimpan`,
                icon: "success",
                confirmButtonText: "Selanjutnya",
            }).then(() => {
                window.location.href = "dailyjournal.html";
            });
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                title: "Error!",
                text: "Journal Gagal Tersimpan",
                icon: "error",
                confirmButtonText: "Tutup",
            });
        }
    });
});



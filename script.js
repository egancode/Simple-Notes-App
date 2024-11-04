// Load saved notes on page load
window.onload = function() {
    loadNotes();
};

function addNote() {
    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please write a note!");
        return;
    }

    const notes = getNotes();
    notes.push(noteText);
    saveNotes(notes);

    noteInput.value = ""; // Clear the input
    displayNotes();
}

function displayNotes() {
    const notes = getNotes();
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = ""; // Clear the current list

    notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = note;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteNote(index);
        listItem.appendChild(deleteButton);

        noteList.appendChild(listItem);
    });
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1); // Remove the note at the index
    saveNotes(notes);
    displayNotes();
}

function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    displayNotes();
}

alert("JS UPDATED AND RUNNING");
console.log("NEW VERSION LOADED");
const API = "http://127.0.0.1:8000";
// ========================
// CONTACT FORM
// ========================
function sendContact() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  fetch(`${API}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Message sent successfully!");
    console.log("Contact response:", data);
  })
  .catch(err => {
    console.error("Contact error:", err);
    alert("Failed to send message");
  });
}

// ========================
// FILE UPLOAD
// ========================
function uploadFile() {
  const fileInput = document.getElementById("file");

  if (!fileInput.files.length) {
    alert("Please select a file");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch(`${API}/upload`, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert("File uploaded successfully!");
    console.log("Upload response:", data);
  })
  .catch(err => {
    console.error("Upload error:", err);
    alert("Upload failed");
  });
}

// ========================
// LOAD CONTENT
// ========================
function loadContent() {
  fetch(`${API}/content`)
    .then(res => res.json())
    .then(data => {
      const output = document.getElementById("output");
      if (output) {
        output.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(err => {
      console.error("Content error:", err);
      alert("Failed to load content");
    });
}

// ========================
// DEBUG (optional test)
// ========================
// console.log("app.js loaded successfully");

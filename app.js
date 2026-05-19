console.log("🔥 NEW JS FILE LOADED");
alert("JS IS NOW RUNNING (NO CACHE)");

const API = "http://127.0.0.1:8000";

// ========================
// CONTACT FORM
// ========================
function sendContact() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Safeguard: Check if elements exist in the DOM first
  if (!nameInput || !emailInput || !messageInput) {
    console.error("❌ Contact form elements missing from HTML.");
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  console.log("📤 Sending contact data to backend...");

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
  .then(async (res) => {
    // Check if the server returned an error code (400, 422, 500, etc.)
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(JSON.stringify(errorData) || `Server responded with status ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    alert("Message sent successfully!");
    console.log("✅ Contact response:", data);
    
    // Clear inputs on success
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  })
  .catch(err => {
    console.error("❌ Contact error detailed breakdown:", err.message);
    alert("Failed to send message. Check browser console for network or CORS errors.");
  });
}

// ========================
// FILE UPLOAD
// ========================
function uploadFile() {
  const fileInput = document.getElementById("file");

  if (!fileInput || !fileInput.files.length) {
    alert("Please select a file");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  console.log("📤 Uploading file...");

  fetch(`${API}/upload`, {
    method: "POST",
    body: formData
  })
  .then(async (res) => {
    if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
    return res.json();
  })
  .then(data => {
    alert("File uploaded successfully!");
    console.log("✅ Upload response:", data);
  })
  .catch(err => {
    console.error("❌ Upload error:", err);
    alert("Upload failed");
  });
}

// ========================
// LOAD CONTENT
// ========================
function loadContent() {
  console.log("📥 Fetching dynamic content...");
  
  fetch(`${API}/content`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`Content fetch failed with status ${res.status}`);
      return res.json();
    })
    .then(data => {
      const output = document.getElementById("output");
      if (output) {
        output.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(err => {
      console.error("❌ Content error:", err);
      alert("Failed to load content");
    });
}

// Automatically trigger loadContent if an output div exists on page load
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("output")) {
    loadContent();
  }
});

let shareCount = parseInt(localStorage.getItem("shareCount")) || 0;
let isSubmitted = localStorage.getItem("submitted") === "true";

const shareBtn = document.getElementById("whatsappShareBtn");
const shareText = document.getElementById("shareCountText");
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

function updateShareText() {
  shareText.innerText = `Click count: ${shareCount}/5`;
}

function disableForm() {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  successMessage.style.display = "block";
}

if (isSubmitted) {
  disableForm();
}

updateShareText();

shareBtn.onclick = () => {
  if (shareCount < 5) {
    const message = encodeURIComponent(
      "Hey Buddy, Join Tech For Girls Community at https://your-username.github.io/tech-for-girls-registration/"
    );
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");

    shareCount++;
    localStorage.setItem("shareCount", shareCount);
    updateShareText();

    if (shareCount >= 5) {
      alert("Sharing complete. Please continue.");
    }
  }
};

form.onsubmit = async function (e) {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete WhatsApp sharing first (5/5)");
    return;
  }

  const formData = new FormData(form);
  const file = document.getElementById("screenshotUpload").files[0];
  formData.append("screenshot", file);

  try {
    const response = await fetch("https://YOUR_SCRIPT_URL_HERE", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      localStorage.setItem("submitted", "true");
      disableForm();
    } else {
      alert("Something went wrong. Try again later.");
    }
  } catch (error) {
    console.error("Submission Error:", error);
    alert("Error submitting form.");
  }
};

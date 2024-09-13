document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const videoElement = document.querySelector("video");
    const sourceElement = videoElement.querySelector("source");

    // Browser detection function
    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.indexOf("Chrome") > -1 && ua.indexOf("Safari") > -1 && ua.indexOf("Edge") === -1) {
            return "Chrome";
        } else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) {
            return "Safari";
        } else {
            return "Other";
        }
    }

    // Set video source and attributes based on the browser
    const browser = getBrowser();

    if (browser === "Chrome") {
        sourceElement.src = "./media/video1.mp4";
        videoElement.removeAttribute("muted");
        videoElement.removeAttribute("controls");
        videoElement.removeAttribute("playsinline");
        videoElement.setAttribute("autoplay", "autoplay");
        videoElement.setAttribute("loop", "loop");
    } else if (browser === "Safari") {
        sourceElement.src = "./media/video2.mp4"; // Default to Safari video setup
        videoElement.setAttribute("muted", "muted");
        videoElement.setAttribute("playsinline", "playsinline");
        videoElement.setAttribute("autoplay", "autoplay");
        videoElement.setAttribute("loop", "loop");
    } else {
        // Default case for other browsers
        videoElement.src = "./media/video1.mp4";
        videoElement.removeAttribute("muted");
        videoElement.setAttribute("playsinline", "playsinline");
        videoElement.setAttribute("autoplay", "autoplay");
        videoElement.setAttribute("loop", "loop");
    }

    videoElement.load(); // Load the selected video

    // Form submission handling
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value,
            energy_bill: form.energy_bill.value
        };

        saveFormData(formData);
        form.reset(); // Clear the form fields
        displayThankYouMessage();
    });

    // Save form data as JSON file
    function saveFormData(data) {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.name}_quote.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Display thank you message and scroll to it
    function displayThankYouMessage() {
        const thankYouSection = document.getElementById('thank-you'); // Ensure this matches the ID in your HTML
        thankYouSection.style.display = 'block';
        thankYouSection.scrollIntoView({ behavior: 'smooth' });
    }
});
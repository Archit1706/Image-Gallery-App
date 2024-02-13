// Function to handle login
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var savedUser = localStorage.getItem(username);

    if (savedUser && JSON.parse(savedUser).password === password) {
        showGallery();
    } else {
        alert("Invalid credentials. Please try again or signup.");
    }
}

function signup() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different one.");
    } else {
        localStorage.setItem(username, JSON.stringify({ password: password }));
        showGallery();
    }
}

function showGallery() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("gallery-container").style.display = "block";
    displayImages();
}

function displayImages() {
    var gallery = document.getElementById("imageGallery");
    gallery.innerHTML = "";

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key !== "currentUser") {
            var imageUrl = localStorage.getItem(key);
            displayImageInGallery(imageUrl);
        }
    }
}

function displayImageInGallery(imageUrl) {
    var gallery = document.getElementById("imageGallery");
    var img = new Image();
    img.src = imageUrl;
    img.alt = "Uploaded Image";

    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.display = "block";

    gallery.appendChild(img);
}

function uploadImage() {
    var input = document.getElementById("imageInput");
    var file = input.files[0];

    if (file) {
        var imageUrl = URL.createObjectURL(file);

        localStorage.setItem(new Date().getTime().toString(), imageUrl);

        alert("Image uploaded successfully!");
        displayImages();
    } else {
        alert("Please select an image to upload.");
    }
}

function logout() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("gallery-container").style.display = "none";
}

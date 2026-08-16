// Map gender to avatar attributes
const genderAttributes = {
    male: {
        hair: ["short1", "short2", "short3", "short4", "short5"],
        facialHair: ["beardMedium", "beardLight", "beardMajestic", "mustacheFancy", "mustacheMagnum"],
        clothing: ["shirtCrewNeck", "shirtScoopNeck", "shirtVNeck"],
    },
    female: {
        hair: ["long1", "long2", "long3", "long4", "long5"],
        facialHair: ["none"],
        clothing: ["shirtCrewNeck", "shirtScoopNeck", "shirtVNeck", "dress"],
    },
    "non-binary": {
        hair: ["short1", "short2", "long1", "long2"],
        facialHair: ["none", "beardLight"],
        clothing: ["shirtCrewNeck", "shirtScoopNeck", "hoodie"],
    },
    other: {
        hair: ["short1", "short2", "long1", "long2", "long3"],
        facialHair: ["none", "beardLight"],
        clothing: ["shirtCrewNeck", "shirtScoopNeck", "hoodie"],
    },
};

// Map ethnicity to skin tone
const ethnicityToSkinTone = {
    light: "light",
    medium: "medium",
    dark: "dark",
};

// Function to generate the DiceBear avatar URL
function generateAvatarUrl(gender, ethnicity) {
    // Select random attributes based on gender
    const genderAttrs = genderAttributes[gender];
    const hair = genderAttrs.hair[Math.floor(Math.random() * genderAttrs.hair.length)];
    const facialHair = genderAttrs.facialHair[Math.floor(Math.random() * genderAttrs.facialHair.length)];
    const clothing = genderAttrs.clothing[Math.floor(Math.random() * genderAttrs.clothing.length)];

    // Select skin tone based on ethnicity
    const skinTone = ethnicityToSkinTone[ethnicity];

    // Randomly select other features
    const eyes = ["normal", "happy", "content", "squint", "surprised"];
    const mouth = ["smile", "frown", "serious", "tongue", "twinkle"];
    const brows = ["normal", "angry", "happy", "sad", "surprised"];

    const randomEye = eyes[Math.floor(Math.random() * eyes.length)];
    const randomMouth = mouth[Math.floor(Math.random() * mouth.length)];
    const randomBrow = brows[Math.floor(Math.random() * brows.length)];

    // Construct the URL with selected options
    const url = new URL("https://api.dicebear.com/7.x/avataaars/svg");
    url.searchParams.append("hair", hair);
    url.searchParams.append("facialHair", facialHair);
    url.searchParams.append("clothing", clothing);
    url.searchParams.append("skinTone", skinTone);
    url.searchParams.append("eyes", randomEye);
    url.searchParams.append("mouth", randomMouth);
    url.searchParams.append("brows", randomBrow);

    console.log("Generated Avatar URL:", url.toString()); // Log the URL for debugging
    return url.toString();
}

// Function to update the avatar image
function updateAvatar() {
    const gender = document.getElementById("gender-select").value;
    const ethnicity = document.getElementById("ethnicity-select").value;
    const avatarUrl = generateAvatarUrl(gender, ethnicity);

    const avatarImage = document.getElementById("avatar-image");
    if (avatarImage) {
        avatarImage.src = avatarUrl;
        console.log("Avatar updated to:", avatarUrl); // Log the update
    } else {
        console.error("Avatar image element not found!");
    }
}

// Add event listeners for gender and ethnicity dropdowns
function setupEventListeners() {
    const genderSelect = document.getElementById("gender-select");
    const ethnicitySelect = document.getElementById("ethnicity-select");

    if (genderSelect && ethnicitySelect) {
        genderSelect.addEventListener("change", updateAvatar);
        ethnicitySelect.addEventListener("change", updateAvatar);
        console.log("Event listeners added for gender and ethnicity dropdowns.");
    } else {
        console.error("Gender or ethnicity dropdown not found!");
    }
}

// Initialize the avatar and event listeners when the DOM is loaded
window.addEventListener("DOMContentLoaded", function() {
    updateAvatar();
    setupEventListeners();
});

// Confirm avatar and start the game
document.getElementById("confirm-avatar")?.addEventListener("click", function() {
    const gender = document.getElementById("gender-select").value;
    const ethnicity = document.getElementById("ethnicity-select").value;
    const field = document.getElementById("field-select").value;

    // Update the player object
    player.gender = gender;
    player.ethnicity = ethnicity;
    player.fieldOfStudy = field;
    player.avatarUrl = document.getElementById("avatar-image").src;

    // Update the traits display
    player.updateTraitsDisplay();

    // Load the next phase (e.g., Orientation)
    loadOrientationPhase();
});

// Function to load the orientation phase
function loadOrientationPhase() {
    const gameContainer = document.getElementById("game-container");
    if (gameContainer) {
        gameContainer.innerHTML = `
            <h1>Year 1: Orientation</h1>
            <p>Welcome to your PhD journey in ${player.fieldOfStudy}!</p>
            <img src="${player.avatarUrl}" alt="Your Avatar" width="100" height="100">
            <p>Your first task is to complete a literature review.</p>
            <button id="start-literature-review">Start Literature Review</button>
            <div id="phase-output"></div>
        `;

        // Load the orientation phase script
        const script = document.createElement("script");
        script.src = "scripts/phases/orientation.js";
        document.body.appendChild(script);
    } else {
        console.error("Game container not found!");
    }
}
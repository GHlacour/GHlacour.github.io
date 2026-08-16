// Map gender to avatar attributes
const genderAttributes = {
    male: {
        hair: ["short1", "short2", "short3", "short4", "short5"],
        facialHair: ["beardMedium", "beardLight", "beardMajestic", "mustacheFancy", "mustacheMagnum"],
        clothing: ["shirtCrewNeck", "shirtScoopNeck", "shirtVNeck"],
    },
    female: {
        hair: ["long1", "long2", "long3", "long4", "long5", "short1", "short2"],
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
    light: ["light", "pale"],
    medium: ["mediumLight", "medium"],
    dark: ["mediumDark", "dark", "darkest"],
};

// Function to generate the DiceBear avatar URL
function generateAvatarUrl(gender, ethnicity) {
    // Select random attributes based on gender
    const genderAttrs = genderAttributes[gender];
    const hair = genderAttrs.hair[Math.floor(Math.random() * genderAttrs.hair.length)];
    const facialHair = genderAttrs.facialHair[Math.floor(Math.random() * genderAttrs.facialHair.length)];
    const clothing = genderAttrs.clothing[Math.floor(Math.random() * genderAttrs.clothing.length)];

    // Select random skin tone based on ethnicity
    const skinTones = ethnicityToSkinTone[ethnicity];
    const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];

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

    return url.toString();
}

// Update the avatar image when gender or ethnicity changes
document.getElementById("gender-select").addEventListener("change", updateAvatar);
document.getElementById("ethnicity-select").addEventListener("change", updateAvatar);

// Function to update the avatar image
function updateAvatar() {
    const gender = document.getElementById("gender-select").value;
    const ethnicity = document.getElementById("ethnicity-select").value;
    const avatarUrl = generateAvatarUrl(gender, ethnicity);
    document.getElementById("avatar-image").src = avatarUrl;
}

// Initialize the avatar on page load
window.onload = function() {
    updateAvatar();
};

// Confirm avatar and start the game
document.getElementById("confirm-avatar").addEventListener("click", function() {
    const gender = document.getElementById("gender-select").value;
    const ethnicity = document.getElementById("ethnicity-select").value;
    const field = document.getElementById("field-select").value;

    // Initialize player object with the selected avatar URL
    const player = {
        avatarUrl: document.getElementById("avatar-image").src,
        gender: gender,
        ethnicity: ethnicity,
        fieldOfStudy: field,
        skills: { writing: 2, coding: 2, teaching: 1 },
        hiddenTraits: { resilience: 3, creativity: 2, networking: 1, imposterSyndrome: 1 }
    };

    // Hide character creation and show game phases
    document.getElementById("character-creation").style.display = "none";
    document.getElementById("game-phases").style.display = "block";
    document.getElementById("start-phase-1").style.display = "inline-block";

    // Display the selected avatar in the game phases section
    document.getElementById("game-output").innerHTML = `
        <p>Your PhD journey in ${player.fieldOfStudy} begins!</p>
        <img src="${player.avatarUrl}" alt="Your Avatar" width="100" height="100">
    `;
});
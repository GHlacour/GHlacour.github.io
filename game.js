// Function to generate the DiceBear avatar URL
function generateAvatarUrl(gender, ethnicity) {
    // Use the 'avataaars' style for customizable avatars
    // The seed combines gender and ethnicity to create a unique avatar
    const seed = `${gender}-${ethnicity}-${Math.random().toString(36).substring(2, 8)}`;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
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
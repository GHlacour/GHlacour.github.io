// Character data
const names = ["Alex", "Jamie", "Taylor", "Morgan", "Casey"];
const genders = ["Male", "Female", "Non-binary", "Other"];
const ethnicities = ["Caucasian", "Asian", "African", "Hispanic", "Middle Eastern"];
const characterImages = ["images/situation1.jpg", "images/situation2.jpg"];

// Game state
let gameState = {
    character: {},
    researchProgress: 0,
    publications: 0,
    thesisWritten: false,
    traits: {
        writingSkill: 5,
        stressLevel: 2,
    }
};

// DOM elements
const characterScreen = document.getElementById("character-screen");
const eventScreen = document.getElementById("event-screen");
const characterName = document.getElementById("character-name");
const characterGender = document.getElementById("character-gender");
const characterEthnicity = document.getElementById("character-ethnicity");
const characterImage = document.getElementById("character-image");
const generateCharacterBtn = document.getElementById("generate-character");
const acceptCharacterBtn = document.getElementById("accept-character");
const eventStory = document.getElementById("event-story");
const eventImage = document.getElementById("event-image");
const eventChoices = document.getElementById("event-choices");
const researchProgress = document.getElementById("research-progress");
const researchBar = document.getElementById("research-bar");
const writingSkill = document.getElementById("writing-skill");
const writingBar = document.getElementById("writing-bar");
const stressLevel = document.getElementById("stress-level");
const stressBar = document.getElementById("stress-bar");
const publications = document.getElementById("publications");
const publicationsBar = document.getElementById("publications-bar");

// Generate random character
generateCharacterBtn.addEventListener("click", () => {
    gameState.character = {
        name: names[Math.floor(Math.random() * names.length)],
        gender: genders[Math.floor(Math.random() * genders.length)],
        ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
        image: characterImages[Math.floor(Math.random() * characterImages.length)]
    };

    characterName.textContent = `Name: ${gameState.character.name}`;
    characterGender.textContent = `Gender: ${gameState.character.gender}`;
    characterEthnicity.textContent = `Ethnicity: ${gameState.character.ethnicity}`;
    characterImage.src = gameState.character.image;
    acceptCharacterBtn.disabled = false;
});

// Accept character and start the game
acceptCharacterBtn.addEventListener("click", () => {
    characterScreen.style.display = "none";
    eventScreen.style.display = "block";
    triggerEvent();
});

// Dynamically load an event based on publication count
async function loadEvent(publicationCount) {
    const letters = ["A", "B", "C", "D"];
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const eventNumber = publicationCount + 1;
    const eventFile = `events/${randomLetter}${eventNumber}.js`;

    try {
        const eventModule = await import(`./${eventFile}`);
        return eventModule[`event${randomLetter}${eventNumber}`];
    } catch (error) {
        console.error(`Failed to load event ${eventFile}:`, error);
        return null;
    }
}

// Trigger an event based on publication count
async function triggerEvent() {
    const event = await loadEvent(gameState.publications);
    if (!event) {
        alert("No event found. Game over.");
        return;
    }

    eventStory.textContent = event.story;
    eventImage.src = event.image;

    // Clear previous choices
    eventChoices.innerHTML = "";

    // Add new choices
    event.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.addEventListener("click", () => {
            choice.outcome(gameState);
            updateProgress();
            triggerEvent();
        });
        eventChoices.appendChild(button);
    });
}

// Update progress bars
function updateProgress() {
    researchProgress.textContent = `${gameState.researchProgress}%`;
    researchBar.value = gameState.researchProgress;
    writingSkill.textContent = gameState.traits.writingSkill;
    writingBar.value = gameState.traits.writingSkill;
    stressLevel.textContent = gameState.traits.stressLevel;
    stressBar.value = gameState.traits.stressLevel;
    publications.textContent = gameState.publications;
    publicationsBar.value = gameState.publications;

    // Check for game end conditions
    if (gameState.publications >= 4 && !gameState.thesisWritten) {
        alert("You can now write your thesis!");
        gameState.thesisWritten = true;
    } else if (gameState.thesisWritten && gameState.researchProgress >= 100) {
        alert("Congratulations! You graduated and received a job offer.");
    }
}
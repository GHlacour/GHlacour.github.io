// Load the character creation phase
function loadCharacterCreation() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = `
        <h1>PhD Simulation Game</h1>
        <div id="character-creation">
            <h2>Create Your Avatar</h2>
            <div id="avatar-preview">
                <img id="avatar-image" src="" alt="Your Avatar" width="150" height="150">
            </div>
            <div>
                <label>Gender Presentation:</label>
                <select id="gender-select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Ethnicity:</label>
                <select id="ethnicity-select">
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div>
                <label>Field of Study:</label>
                <select id="field-select">
                    <option value="physics">Physics</option>
                    <option value="biology">Biology</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="chemistry">Chemistry</option>
                </select>
            </div>
            <button id="confirm-avatar">Confirm Avatar</button>
        </div>
    `;

    // Load the character creation script
    const script = document.createElement("script");
    script.src = "scripts/phases/character-creation.js";
    document.body.appendChild(script);
}

// Initialize the game
window.onload = function() {
    loadCharacterCreation();
};
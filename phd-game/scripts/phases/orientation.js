// Start the literature review task
document.getElementById("start-literature-review").addEventListener("click", function() {
    const output = document.getElementById("phase-output");
    output.innerHTML = `
        <p>You found 3 relevant papers. Progress: 30%</p>
        <button id="continue-review">Continue Review</button>
    `;

    // Add event listener for the continue button
    document.getElementById("continue-review").addEventListener("click", function() {
        output.innerHTML = `
            <p>You completed the literature review! Your Writing skill improved.</p>
            <button id="next-phase">Proceed to Research Phase</button>
        `;

        // Improve the Writing skill
        player.improveSkill("writing", 2);

        // Add event listener for the next phase button
        document.getElementById("next-phase").addEventListener("click", function() {
            // Load the next phase (e.g., Research)
            loadResearchPhase();
        });
    });
});

// Function to load the research phase
function loadResearchPhase() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = `
        <h1>Year 2: Research</h1>
        <p>Now it's time to design and conduct experiments.</p>
        <button id="start-experiment">Start Experiment</button>
        <div id="phase-output"></div>
    `;

    // Load the research phase script
    const script = document.createElement("script");
    script.src = "scripts/phases/research.js";
    document.body.appendChild(script);
}
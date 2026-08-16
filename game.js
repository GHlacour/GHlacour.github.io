document.getElementById("confirm-avatar").addEventListener("click", function() {
    const gender = document.getElementById("gender-select").value;
    const ethnicity = document.getElementById("ethnicity-select").value;
    const field = document.getElementById("field-select").value;

    // Initialize player object
    const player = {
        avatar: `${gender}_${ethnicity}`,
        fieldOfStudy: field,
        skills: { writing: 2, coding: 2, teaching: 1 },
        hiddenTraits: { resilience: 3, creativity: 2, networking: 1, imposterSyndrome: 1 }
    };

    // Hide character creation and show game phases
    document.getElementById("character-creation").style.display = "none";
    document.getElementById("game-phases").style.display = "block";
    document.getElementById("start-phase-1").style.display = "inline-block";
});
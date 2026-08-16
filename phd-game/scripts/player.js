// Player class to manage player attributes and traits
class Player {
    constructor() {
        this.avatarUrl = "";
        this.gender = "";
        this.ethnicity = "";
        this.fieldOfStudy = "";
        this.skills = {
            writing: 2,
            coding: 2,
            teaching: 1
        };
        this.hiddenTraits = {
            resilience: 3,
            creativity: 2,
            networking: 1,
            imposterSyndrome: 1
        };
    }

    // Method to update a skill
    improveSkill(skill, amount) {
        if (this.skills.hasOwnProperty(skill)) {
            this.skills[skill] = Math.min(10, this.skills[skill] + amount);
            this.updateTraitsDisplay();
        }
    }

    // Method to update the traits display
    updateTraitsDisplay() {
        for (const [skill, value] of Object.entries(this.skills)) {
            const bar = document.getElementById(`${skill}-bar`);
            const valueDisplay = bar.parentElement.nextElementSibling;
            if (bar && valueDisplay) {
                bar.style.width = `${value * 10}%`;
                bar.setAttribute("data-value", value);
                valueDisplay.textContent = `${value}/10`;
            }
        }
    }
}

// Initialize the player object
const player = new Player();
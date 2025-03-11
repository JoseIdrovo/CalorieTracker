// Load stored sum and last date 
let savedTotal = localStorage.getItem("dailyCalories");
let total = savedTotal !== null ? parseFloat(savedTotal) : 0;
let lastDate = localStorage.getItem("lastDate") || new Date().toDateString();

let maintenanceCals = localStorage.getItem("maintenanceCalories") || 0;
let difference = localStorage.getItem("remainingCals") || 0; 


// Date Display 
document.getElementById("date-display").innerText = `Date: ${new Date().toDateString()}`;
document.getElementByID("total").innerText = total;
document.getElementByID("maintenanceCalories").innerText = maintenanceCals;


// Reset upon new day 
if (new Date().toDateString() !== lastDate) {
    total = 0; // Reset 
    localStorage.setItem("dailyCalories",total);
    localStorage.setItem("lastDate", new Date().toDateString());
    difference = maintenanceCals; 
}

function addNumber() {
    let input = document.getElementById("numberInput").value;
    let number = parseFloat(input);
    if (!isNaN(number)){
        total += number; 
        difference = maintenanceCals - total; 

        localStorage.setItem("dailyCalories",total);
        document.getElementById("total").innerText = total;

        document.getElementById("numberInput").value = ""; // Clear Input 
    }
}

function calculateCalories() {
    let ageInput = document.getElementById("ageInput").value;
    let age = parseFloat(ageInput);

    let weightInput = document.getElementById("weightInput").value;
    let weight = parseFloat(weightInput);

    let feetInput = document.getElementById("feetInput").value;
    let feet = parseFloat(feetInput);

    let inchesInput = document.getElementById("inchesInput").value;
    let inches = parseFloat(inchesInput);

    let feet_cm = feet * 30.48;
    let inches_cm = inches * 2.54;

    if (!isNaN(age) && !isNaN(weight) && !isNaN(feet_cm) && !isNaN(inches_cm)){
        maintenanceCals =  (10 * weight) + (6.25 * (feet_cm + inches_cm))  - (5 * age) + 5;
        localStorage.setItem("maintenanceCalories", maintenanceCals);
        document.getElementById("maintenanceCalories").innerText = maintenanceCals;

        document.getElementById("ageInput").value = ""; // Clear Input 
        document.getElementById("weightInput").value = ""; // Clear Input  
        document.getElementById("feetInput").value = ""; // Clear Input 
        document.getElementById("inchesInput").value = ""; // Clear Input 
        
        localStorage.setItem("remainingCals", maintenanceCals);
        document.getElementById("remainingCals").innerText = maintenanceCals;

    }
}

// Manually Reset Sum Option
function resetSum() {
    total = 0;
    localStorage.setItem("dailyCalories",total);
    document.getElementById("total").innerText = total;

    difference = maintenanceCals;
    localStorage.setItem("remainingCals",difference);
    document.getElementById("remainingCals").innerText = difference;
}
// Set the date we're counting down to
var countdownPrimary = new Date("Aug 9, 2026 9:50:00").getTime();
var countdownPrimary2 = new Date("Aug 9, 2026 7:00:00").getTime();


// Update the count down every 1 second
var x = setInterval(function () {

    var now = new Date().getTime();

    // Distance calculations
    var distances = {
        prm: countdownPrimary - now,
        prm2: countdownPrimary2 - now,
    };

    // Prevent negative countdowns (Option A)
    for (let key in distances) {
        if (distances[key] < 0) distances[key] = 0;
    }

    // Helper function
    function calc(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }

    // Calculate all countdowns
    var prm = calc(distances.prm);
    var prm2 = calc(distances.prm2);


    // Display
    document.getElementById("countdownPrimary").innerHTML =
        `Kekin let sleće za:<br>${prm.days}d ${prm.hours}h ${prm.minutes}m ${prm.seconds}s`;
    document.getElementById("countdownPrimary2").innerHTML =
        `Kekin let poleće za:<br>${prm2.days}d ${prm2.hours}h ${prm2.minutes}m ${prm2.seconds}s`;



    // Custom messages for finished events
    if (countdownPrimary - now < 0)
        document.getElementById("countdownPrimary").innerHTML = "Kekin let je sleteoo!!!";
    if (countdownPrimary - now < 0)
        document.getElementById("countdownPrimary2").innerHTML = "Kekin let je poleteoo!!!";
}, 1000);

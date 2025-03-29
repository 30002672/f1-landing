async function query() {
    // Retrieve input values from the form
    const lapNumber = document.getElementById("Lapnumber1").value;
    const avgLapTime = document.getElementById("Lapnumber2").value;
    const pitStopTime = document.getElementById("Lapnumber3").value;
    const avgLapDiff = document.getElementById("Lapnumber4").value;
    const avgSpeed = document.getElementById("AvgSpeed").value;
    const airTemp = document.getElementById("AirTemp").value;
    const trackTemp = document.getElementById("TrackTemp").value;
    const humidity = document.getElementById("Humidity").value;
    const windSpeed = document.getElementById("WindSpeed").value;

    // Prepare the payload data in JSON format
    const payload = {
        Lapnumber: lapNumber,
        LapTimes: avgLapTime,
        PitStopTimes: pitStopTime,
        PrevLap: avgLapDiff,
        AvgSpeed: avgSpeed,
        AirTemp_Cel: airTemp,
        TrackTemp_Cel: trackTemp,
        Humidity: humidity,
        WindSpeed_km_h: windSpeed
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the response JSON
        console.log("Response from server:", data); // Log the data to the console
        alert(`Predicted Position: ${data.prediction}`); // Show prediction in alert
    } catch (error) {
        console.error("Error occurred:", error);
        alert("Error occurred: " + error.message);
    }
}

// Event listener for form submission
document.getElementById("predictionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    query(); // Call the query function when form is submitted
});
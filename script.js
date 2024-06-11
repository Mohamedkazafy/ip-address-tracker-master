document.getElementById("search-button").addEventListener("click", function() {
    const userInput = document.getElementById("input").value.trim();
    if (userInput) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_VypHnKpAflatnsBWywSQKgk4DjG5g&ipAddress=${userInput}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                displayResults(data);
                updateMap(data.location.lat, data.location.lng);
            })
            .catch(e => {
                console.error(e);
                alert("Failed to fetch data. Please check the IP address or domain and try again.");
            });
    } else {
        alert("Please enter a valid IP address or domain.");
    }
});

const displayResults = (data) => {
    document.getElementById("iP").textContent = data.ip;
    document.getElementById("location").textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    document.getElementById("timezone").textContent = data.location.timezone;
    document.getElementById("UTC").textContent = `UTC ${data.location.timezone}`;
    document.getElementById("ISP").textContent = data.isp;
}

let map = L.map('map').setView([0, 0], 2); // Initialize the map with a default view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const updateMap = (lat, lng) => {
    map.setView([lat, lng], 13); // Update the map view to the new location
    L.marker([lat, lng]).addTo(map)
        .bindPopup('Location based on IP')
        .openPopup();
}

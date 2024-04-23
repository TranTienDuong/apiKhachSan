let cTemparature, fTemparature;
let time;

function updateTemperatures() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=21.028511&lon=105.804817&appid=c3abcf32f4dbf8c3303b88c2c4aa57c2')
    .then(response => response.json())
    .then(data => {
        cTemperature = Math.round(data.main.temp - 273.15);
        fTemperature = Math.round((cTemperature * 9/5) + 32);
        document.getElementById('cTemp').innerHTML = cTemperature;
        document.getElementById('fTemp').innerHTML = fTemperature;
    })
    .catch(error => console.log(error));
}

function getFormattedTime() {
    const today = new Date();
  
    const month = today.toLocaleString('en-US', { month: 'short' });
    const day = today.getDate();
    const year = today.getFullYear();
    const hour = today.getHours().toString().padStart(2, '0'); // Adding leading zero if necessary
    const minute = today.getMinutes().toString().padStart(2, '0'); // Adding leading zero if necessary

    const finalTime = `${month} ${day}, ${year} ${hour} : ${minute}`;

    return finalTime;
}

const currentTime = getFormattedTime();
document.getElementById('time').innerHTML = currentTime;
window.onload = updateTemperatures;

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3lheHgiLCJhIjoiY2x2MmYyd3E1MGd5MjJucGlhbm51OHJhbyJ9.kqlzG9FXjk4gvyVPvvgMzw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [105.812368, 21.074797],
    zoom: 16
});

var marker = new mapboxgl.Marker({
    color: "red",
    draggable: true,
    anchor: 'bottom'
})
.setLngLat([105.81236224907471, 21.07448128644576])
.addTo(map);

map.addControl(new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true
}));

// Create the button element
const directionDiv = document.createElement('div');

const directionsText = document.createElement('p');
directionsText.textContent = 'Địa điểm: Ngõ 683 Đường Lạc Long Quân, Phường Phú Thượng, Quận Tây Hồ, Hà Nội, Việt Nam';
directionsText.className = 'directions-text';

const directionsButton = document.createElement('button');
directionsButton.textContent = 'Chỉ đường';
directionsButton.className = 'directions-button';

// Add an event listener to open Google Maps with directions when the button is clicked
directionsButton.addEventListener('click', () => {
    const markerLngLat = marker.getLngLat();
    const destinationURL = `https://www.google.com/maps?daddr=${markerLngLat.lat},${markerLngLat.lng}`;
    window.open(destinationURL, '_blank');
});

// Add the button to the map container
directionDiv.appendChild(directionsText);
directionDiv.appendChild(directionsButton);

// Style the directionDiv
directionDiv.style.position = 'absolute';
directionDiv.style.top = '10px';
directionDiv.style.left = '10px';
directionDiv.style.zIndex = '1';
directionDiv.style.backgroundColor = 'rgba(255,255,255,0.9)';
directionDiv.style.padding = '15px';

// Add the directionDiv to the map container
map.getContainer().appendChild(directionDiv);

document.addEventListener("DOMContentLoaded", function() {
    fetch("html/header.html")
        .then(response => response.text())
        .then(html => document.getElementById("header").innerHTML = html);

    fetch("html/footer.html")
        .then(response => response.text())
        .then(html => document.getElementById("footer").innerHTML = html);

});


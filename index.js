const searchBox = document.querySelector(".searchTerm");
const submitButton = document.querySelector(".searchButton");
var zoom = 2;

const ip = document.querySelector("#ip");
const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const isp = document.querySelector("#isp");
const city = document.querySelector("#city");
var latitude = "";
var longitude = "";
const apiKey = "1e86012b1041b1ead4745c3d3614cc3c";
var mapCity = "";

submitButton.onclick = (e) => {
  e.preventDefault();
  const query = searchBox.value;
  fetch(`http://ip-api.com/json/${query}`)
    .then((response) => response.json())
    .then((data) => {
      mapCity = data.city;
      ip.innerHTML = data.query;
      city.innerHTML = data.city + "," + data.countryCode;
      isp.innerHTML = data.isp;
      lat.innerHTML = data.lat;
      lon.innerHTML = data.lon;
      latitude = data.lat;
      longitude = data.lon;
      mapCity = data.city;
    });

  // markMap();
  var marker = L.marker([latitude, longitude]).addTo(mymap);
  zoom = 13;
  marker.bindPopup("<h3>" + mapCity + "</h3>");
};
var mymap = L.map("mapid").setView([28, 84], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiaW5kcmExMjM0IiwiYSI6ImNrZWs0dmFqNDF6ZnoyeW95NmR5Nm1sZ2QifQ.E-Ir84dL6pVm_v18Pg4_kw",
  }
).addTo(mymap);

// function markMap() {
//   mymap.closePopup();
//   marker = L.marker([latitude, longitude]).addTo(layerGroup);
//   marker.bindpopup(mapCity).openPopup();
// }

// The below code has been copied from: https://developers.google.com/maps/documentation/javascript/examples/place-search?hl=en_GB#maps_place_search-javascript
// It has been modified for the purpose of this site.

let map;
let service;
let infowindow;
// createMap function has the a search string contianing the club stadium name, city and country passed to it (clubLocation).  The array is also passed in (club).
function createMap(clubLocation, club) {
    // Create a new map in the club-location-map div element.
    map = new google.maps.Map(document.getElementById("club-location-map"), {
        zoom: 15,
    });
    service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();
    // Pass in the clubLocation as the findPlaceFrom Query search.
    let request = {
        query: clubLocation,
        fields: ["name", "geometry"],
    };
    // Search for the clubLocation and show the first result as the center of the map and place marker by calling the createMarker function.
    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Ensure map is not hidden, center map around the first result (result[0]) and call the createMarker function.
            document.getElementById("club-location-map").classList.remove("hide");
            map.setCenter(results[0].geometry.location);
            createMarker(results[0], club);
        } else {
            // If there are no results from the search for the clubLocation, hide the map.
            document.getElementById("club-location-map").classList.add("hide");
        }
    });
}

function createMarker(place, clubResults) {
    // Create a new marker on the map and place it at the center of the first results (results[0]=place).
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });
    // Create a click listener which opens the infowindow when the market is clicked.
    google.maps.event.addListener(marker, "click", function() {
        // Set the infowindow content to show the club logo.
        infowindow.setContent(`
            <img class="small-img" src="${clubResults.logo}" aria-label="Club badge.">
            <p class="my-2"><strong>${nullDataCheck(clubResults.name)}</strong></p>
            <p class="my-2">${nullDataCheck(clubResults.venue_name)}</p>            
            <p class="my-2">${clubLocation(clubResults.venue_city, clubResults.country)}</p>
        `);
        infowindow.open(map, marker);
    });
}
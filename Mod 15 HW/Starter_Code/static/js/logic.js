console.log("Step 2 working");
// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
  {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });


// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);
// Create the 'basemap' tile layer that will be the background of our map.
L.tileLayer( "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'", 
{ attribution: 'Map data: &amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors, &lt;a href="http://viewfinderpanoramas.org"&gt;SRTM&lt;/a&gt; | Map style: &amp;copy; &lt;a href="https://opentopomap.org"&gt;OpenTopoMap&lt;/a&gt; (&lt;a href="https://creativecommons.org/licenses/by-sa/3.0/"&gt;CC-BY-SA&lt;/a&gt;)', });

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map

// Define helper functions globally.
function getColor(depth) {
    return depth > 35 ? '#800026' : 
           depth > 15 ? '#BD0026' : 
           depth > 5  ? '#E31A1C' : 
           depth > 1  ? '#FD8D3C' : 
                        '#FFEDA0';               
}

function getRadius(magnitude) {
    return magnitude * 5;
}

function styleInfo(feature) {
    let depth = feature.geometry.coordinates[2]; // Extract depth from GeoJSON
    let magnitude = feature.properties.mag; // Extract magnitude
    return {
      radius: getRadius(magnitude),
      fillColor: getColor(depth),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7
    };
}

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  
  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our global styleInfo function.
    style: styleInfo,
    // Bind a popup to each marker to display magnitude and depth.
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km`
      );
    }
  }).addTo(map);
  
});

// Create a legend control object.
let legend = L.control({position: "bottomright"});

// Updated legend.onAdd function
legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  let depthLevels = [-10, 1, 5, 15, 35];
  let colors = ["#FFEDA0", "#FD8D3C", "#E31A1C", "#BD0026", "#800026"];

  for (let i = 0; i < depthLevels.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
                     depthLevels[i] + (depthLevels[i + 1] ? "&ndash;" + depthLevels[i + 1] + "<br>" : "+");
  }
  return div;
};

// Finally, add the legend to the map.
legend.addTo(map);


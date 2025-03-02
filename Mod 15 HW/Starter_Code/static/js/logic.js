console.log("Step 2 working");
// Create the 'basemap' tile layer that will be the background of our map.
L.tileLayer( "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'", 
{ attribution: 'Map data: &amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors, &lt;a href="http://viewfinderpanoramas.org"&gt;SRTM&lt;/a&gt; | Map style: &amp;copy; &lt;a href="https://opentopomap.org"&gt;OpenTopoMap&lt;/a&gt; (&lt;a href="https://creativecommons.org/licenses/by-sa/3.0/"&gt;CC-BY-SA&lt;/a&gt;)', });

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map

// Create the map object with center and zoom options.
var map = L.map('map').setView([34.2869987, -116.7304993], 12);

// Then add the 'basemap' tile layer to the map.
L.tileLayer('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson').addTo(map);
// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// // Make a request that retrieves the earthquake geoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

//   // This function returns the style data for each of the earthquakes we plot on
//   // the map. Pass the magnitude and depth of the earthquake into two separate functions
//   // to calculate the color and radius.
//   function styleInfo(feature) {
//     let depth = [];
//   let magnitude = [];

//   };
// )}
  
// Make a request that retrieves the earthquake geoJSON data.
data=d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on the map.
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
});
console.log(data)

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    return depth > 35 ? '#800026' : 
           depth > 15 ? '#BD0026' : 
           depth > 5  ? '#E31A1C' : 
           depth > 1  ? '#FD8D3C' : 
                        '#FFEDA0';               
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return magnitude * 5;
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {

    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo(feature),
    radius: getRadius(quake.magnitude), // Calculate radius based on magnitude
    fillColor: getColor(quake.depth),   // Get color based on depth
    color: '#000',                      // Border color
    weight: 1,                           // Border weight
    opacity: 1,
    fillOpacity: 0.7.addTo(map).bindPopup(
      `Magnitude: ${quake.magnitude}<br>Depth: ${quake.depth} km`
  ),
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
    
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
let legend = L.control({position: "bottomright"});

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depthLevels = [-10, 1, 5, 15, 35];
    let colors = ["#FFEDA0", "#FD8D3C", "#E31A1C", "#BD0026", "#800026"];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    let color;
if (depth > 35) {
  color = '#800026';
} else if (depth > 15) {
  color = '#BD0026';
} else if (depth > 5) {
  color = '#E31A1C';
} else if (depth > 1) {
  color = '#FD8D3C';
}

  return div;
  };
  // Finally, add the legend to the map.
  L.control({ position: 'bottomright' });
  // legend.onAdd = function (myMap) {
  //   let div = L.DomUtil.create('div', 'legend');
  //   let colors = ["#98EE00", "#D4EE00", "#EECC00", "#EE9C00", "#EA822C", "#EA2C2C"];
  //   let labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
    legend.addTo(map);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.


    // Then add the tectonic_plates layer to the map.

  });


// Column headers
var propertyAddressColumn = "Adresse";
var communityAreaColumn = "Arrondissement";
var propertyIndexColumn = "Numéro de lot"; // Property Index Number
var taxpayerColumn = "Nom";
var taxpayerMatchCodeColumn = "Affiliated With"; //"Taxpayer Match Code";
var ownedColumn = "Properties Held by Taxpayer Match Code";
var unitColumn = "Nombre de logements";
var affiliatedWithColumn = "Affiliated With";
var additionalDetailsColumn = "Additional Details";
var relativeSizeColumn = "Nombre de logements"; // "Relative Size";

// Database reference
var databaseCollectionName = "features";
// JSON search
var searchIndex = "/search-index.json";
// Map tiles
var tiles = "http://127.0.0.1:8080/features/{z}/{x}/{y}.pbf";

// Mapbox key
mapboxgl.accessToken = "pk.eyJ1Ijoibm9ydGhhbWVyaWNhbiIsImEiOiJja2V5bWU4aGkwYXlzMnJxY2tteHY5aHg5In0.icsJb73KMz8GEPuuIbY2YA";

// Colors
var dsaRed = "#ec1f27";
var dsaYellow = "#fad434";
var color4 = dsaRed;
var color3 = "#dc7270";
var color2 = "#866b85";
var color1 = "#1e1231";
var black = "#000";
var white = "#fff";
var gray = "#808080";

// Map defaults
var defaultOpacity = .5;
var highlightZoom = 14;

// Change colors based on landlord size
var defaultColors = [
	"case",
	[">=", ["get", ownedColumn], 50],
	color4,
	[">=", ["get", ownedColumn], 10],
	color3,
	[">=", ["get", ownedColumn], 3],
	color2,
	[">", ["get", ownedColumn], 0],
	color1,
	white
];

// Scale radius based on zoom, relative unit size, hover
var defaultRadius = [
	"interpolate",
	["exponential", 1.75],
	["zoom"],
	8, 
	["case",
		["boolean", ["feature-state", "hover"], false],
		["interpolate", ["linear"], ["get", relativeSizeColumn], 0, 10, 100, 20],
		["interpolate", ["linear"], ["get", relativeSizeColumn], 0, 2, 100, 10]
	],
	16, 
	["case",
		["boolean", ["feature-state", "hover"], false],
		["interpolate", ["linear"], ["get", relativeSizeColumn], 0, 12, 100, 24],
		["interpolate", ["linear"], ["get", relativeSizeColumn], 0, 4, 100, 20]
	],
	22, ["case",
		["boolean", ["feature-state", "hover"], false],
		["interpolate", ["linear"], ["get", relativeSizeColumn], 0, 200, 100, 400],
		["interpolate", ["linear"], ["get", relativeSizeColumn], 0, 180, 100, 900]
	]
];

// Custom UI
var selectedBounds = null;
var markerContainer = null;
var marker = null;
var spinner = document.getElementById("spinner");
var searchInputContainer = document.getElementById("search-input-container");
var searchInput = document.getElementById("search-input");
var clearButton = document.getElementById("clear");
var searchResultsContainer = document.getElementById("search-results-container");
var searchResultsCounter = document.getElementById("search-results-counter");
var searchResultsList = document.getElementById("search-results-list");
var selectedContainer = document.getElementById("selected-container");

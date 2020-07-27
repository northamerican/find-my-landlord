function loadProperty(id) {
	var query = featuresRef
		.where("properties."+propertyIndexColumn, "==", String(id))
		.get()
		.then(function(querySnapshot) {
			if (querySnapshot.docs.length == 0) {
				// No database matches found
				resetSearchResults();
				var title = "Database error";
				var message = "Sorry, we couldn't look up that property's details. Try again in an hour, or <a href='mailto:'mailto:tenantscdsa@gmail.com'>contact us</a>."
				showSearchMessage(title, message);
			} else {
				querySnapshot.forEach(function(doc) {
					renderSelectedUI(doc.data());
				});
			};
		})
		.catch(function(error) {
			console.log("Error getting property details: ", error);
			// All other errors
			resetSearchResults();
			var title = "Database error";
			var message = "Sorry, we couldn't connect to our database. Try again in an hour, or <a href='mailto:'mailto:tenantscdsa@gmail.com'>contact us</a>."
			showSearchMessage(title, message);
		});
};

function renderSelectedUI(feature) {
	var address = feature.properties[propertyAddressColumn];
	// Update search input
	searchInput.value = address;
	renderClearButton(address);
	// Center map
	centerMap(feature.geometry.coordinates);
	// Reset UI
	resetSelectedInfo();
	resetSelectedMarker();
	// Render updates
	renderFilteredPoints(feature);
};

function renderFilteredPoints(feature) {
	var propertyIndex = feature.properties[propertyIndexColumn];
	var affiliatedWith = feature.properties[affiliatedWithColumn];

	// Show container
	searchResultsContainer.style.display = "block";

	// Create placeholder arrays
	var allPropertiesOwned = {
	  "type": "FeatureCollection",
	  "features": []
	};
	var otherPropertiesOwned = {
	  "type": "FeatureCollection",
	  "features": []
	};
	var selectedProperty = {
	  "type": "FeatureCollection",
	  "features": []
	};

	selectedProperty.features.push(feature);

	if (affiliatedWith != "") {
		// Hide selected, related properties on base layer
		map.setFilter("features", ["!=", affiliatedWithColumn, affiliatedWith]);
		
		var query = featuresRef
			.where("properties."+affiliatedWithColumn, "==", affiliatedWith)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// Add all matches to the set
					allPropertiesOwned.features.push(doc.data());

					if (doc.data().properties[propertyIndexColumn] != propertyIndex) {
						// Add other properties to a different set
						otherPropertiesOwned.features.push(doc.data());
					};
				});
			})
			.then(function() {
				// Set styles
				map.setPaintProperty("features", "circle-opacity", .25);
				map.setPaintProperty("features", "circle-color", black);

				// Add layers
				addFilteredLayer("otherPropertiesOwned", otherPropertiesOwned, selectedRadius, defaultColors, .5);
				addFilteredLayer("selectedProperty", selectedProperty, selectedRadius, defaultColors, 1);
			
				// Show UI
				renderSelectedInfo(feature, allPropertiesOwned);
				renderSelectedMarker(feature);
			})
			.catch(function(error) {
				console.log("Error getting affiliated properties: ", error);
				// Couldn't get affiliated properties, couldn't show UI
				resetSearchResults();
				var title = "Database error";
				var message = "Sorry, we couldn't connect to our database. Try again in an hour, or <a href='mailto:'mailto:tenantscdsa@gmail.com'>contact us</a>."
				showSearchMessage(title, message);
			});
	} else {
		// Hide selected, related properties on base layer
		map.setFilter("features", ["!=", propertyIndexColumn, propertyIndex]);

		// Set styles
		map.setPaintProperty("features", "circle-opacity", .25);
		map.setPaintProperty("features", "circle-color", black);

		// Add layers
		addFilteredLayer("selectedProperty", selectedProperty, selectedRadius, defaultColors, 1);
	
		// Show UI
		renderSelectedInfo(feature, allPropertiesOwned);
		renderSelectedMarker(feature);
	};
};

function renderSelectedInfo(feature, allPropertiesOwned) {
	var address = feature.properties[propertyAddressColumn];
	var affiliatedWith = feature.properties[affiliatedWithColumn];
	var owned = feature.properties[ownedColumn];
	var taxpayer = feature.properties[taxpayerColumn];
	var additionalDetails = feature.properties[additionalDetailsColumn];

	// Handle stray datapoints
	if (owned < 1 || owned == "") {
		owned = 1;
	};

	// Clear counter and list HTML
	searchResultsCounter.innerHTML = "";
	searchResultsList.innerHTML = "";
	
	// Hide counter
	searchResultsCounter.style.display = "none";
	// Hide list
	searchResultsList.style.display = "none";
	// Show selected container 
	selectedContainer.style.display = "block";

	// Affiliated entity
	var affiliatedWithRow = document.getElementById("affiliated-row");
	// Download button
	var downloadButton = document.getElementById("download-button");
	// Check if data exists
	if (affiliatedWith) {
		// Show row
		affiliatedWithRow.style.display = "block";
		// Set value
		var affiliatedWithValue = document.getElementById("affiliated-value");
		affiliatedWithValue.innerText = affiliatedWith;
		
		// Also show download button
		downloadButton.style.display = "block";		
		// Set button text and style
		downloadButton.innerHTML = "Download all "+affiliatedWith+" data";
		downloadButton.style.backgroundColor = setColors(feature);
		downloadButton.classList.add("button-hover");
		// Add button listener
		downloadButton.onclick = function(){
			createPDF(affiliatedWith, allPropertiesOwned);
		};
	} else {
		// Hide row
		affiliatedWithRow.style.display = "none";
		// Hide button
		downloadButton.style.display = "none";
	};
	
	// Property count
	var ownedRow = document.getElementById("owned-row");
	// Check if data exists
	if (owned) {
		// Show row
		ownedRow.style.display = "block";
		// Set value
		var ownedValue = document.getElementById("owned-value");
		ownedValue.innerText = owned;
	} else {
		// Hide row
		ownedRow.style.display = "none";
	};

	// Taxpayer info
	var taxpayerRow = document.getElementById("taxpayer-row");
	// Check if data exists
	if (taxpayer) {
		// Show row
		taxpayerRow.style.display = "block";
		// Set value
		var taxpayerValue = document.getElementById("taxpayer-value");
		taxpayerValue.innerText = taxpayer;
	} else {
		// Hide row
		ownedRow.style.display = "none";
	};

	// Style row backgronds
	var infoTable = document.getElementById("info-table");
	var rows = infoTable.querySelectorAll("tr[style*='display: block;']");
	for (var r = 0; r < rows.length; r++) {
		if (r % 2 == 0) {
			rows[r].style.backgroundColor = white;
		} else {
			rows[r].style.backgroundColor = setRowColors(feature);
		}
	};

	// Data info
	var dataInfoLink = document.getElementById("data-info-link");
	attachModal(dataInfoLink, "How was this data collected?", dataInfoContent);

	// Additional details
	var additionalDetailsLink = document.getElementById("additional-details-link");
	// Check if data exists
	if (additionalDetails) {
		// Show link
		additionalDetailsLink.style.display = "block";
		// Attach modal
		var additionalDetailsLink = document.getElementById("additional-details-link");
		attachModal(additionalDetailsLink, "Additional property details", additionalDetails);
	} else {
		// Hide link
		additionalDetailsLink.style.display = "none";
	};
};

function renderSelectedMarker(feature) {
	var request = new XMLHttpRequest();
	request.open("GET", "assets/images/marker.svg", true);
	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			var svg = this.response;

			// Create marker
			markerContainer = document.createElement("div");
			markerContainer.id = "marker";

			// Add SVG to marker
			markerContainer.innerHTML = svg;
			markerContainer.children[0].getElementById("outline").setAttribute("stroke", black);
			markerContainer.children[0].getElementById("shape").setAttribute("fill", setColors(feature));
			
			// Add to map
			// Validate coordinates
			if (feature.geometry.coordinates.length == 2) {
				marker = new mapboxgl.Marker(markerContainer)
					.setLngLat(feature.geometry.coordinates)
					.addTo(map);
			};
		};
	};
	request.send();
};
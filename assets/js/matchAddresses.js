var searchResultsLimit = 50;

// i18next ui translations
appTitle.innerHTML = i18next.t('TITLE')
getHelpLinks.innerHTML = i18next.t('GET_HELP')
legalNoticeLink.innerHTML = `<b>${i18next.t('LEGAL_NOTICE_TITLE')}</b>`
affiliatedLabel.innerHTML = i18next.t('AFFILIATED_LABEL')
ownedLabel.innerHTML = i18next.t('OWNED_LABEL')
viewOnMap.innerHTML = i18next.t('VIEW_ON_MAP')
taxpayerLabel.innerHTML = i18next.t('TAXPAYER_LABEL')
unitsLabel.innerHTML = i18next.t('UNITS_LABEL')
dataInfoLink.innerHTML = i18next.t('DATA_INFO_TITLE')
additionalDetailsLink.innerHTML = i18next.t('ADDITIONAL_DETAILS_LABEL')
switchLangLink.innerHTML = i18next.t('SWITCH_LANG_NAME')
switchLangLink.href = location.origin + '?lng=' + i18next.t('SWITCH_LANG_CODE')

searchInputContainer.querySelector('input').placeholder = i18next.t('SEARCH_LABEL')
searchButton.innerHTML = i18next.t('SEARCH_BUTTON')

const netlifyFunctionsBaseUrl = '.netlify/functions'

const netlifyFunction = async (methodName, options = {}) => {
  const response = await fetch(`/${netlifyFunctionsBaseUrl}/${methodName}`, options)
  return await response.json()
}

const matchAddresses = async function (query) {
	// Load search keys
	var value = query.trim().toLowerCase();

	spinner.style.display = "block";
	const { results } = await netlifyFunction('search', {
		body: JSON.stringify({query: value}),
		method: 'POST'
	})
	spinner.style.display = "none";

	// Show "x"
	renderClearButton(value);
	// Reset rendered objects
	resetSearchResults();
	// Reset UI
	resetMap();

	if (value != "") {
		// Render list
		renderResults(results)
	};
};

function renderClearButton(value) {
	if (checkIE() == false) {
		// Show if input has content
		clearButton.style.display = (value.length) ? "block" : "none";

		// Add listener
		clearButton.onclick = function() {
			// Hide button
			this.style.display = "none";

			// Reset UI
			searchInput.value = "";
			resetSearchResults();
			resetMap();
		};
		// Accessibility
		clearButton.addEventListener("keypress",
			function(e) {
				// Enter key
				if (e.keyCode == 13) {
					e.target.click();
				};
			}
		);
	};
};

function renderResults(features) {
	if (features.length) {		
		// Results were found
		// Show container
		searchResultsContainer.style.display = "block";
		// Show counter
		searchResultsCounter.style.display = "block";
		// Show list
		searchResultsList.style.display = "block";

		if (features.length > searchResultsLimit) {
			// More results than limit
			searchResultsCounter.innerHTML = `<h4>${searchResultsLimit} ${i18next.t("SEARCH_RESULTS")}`;

			var refineMessage = document.createElement("li");
			refineMessage.id = "limit-message";
			refineMessage.innerText = i18next.t("SEARCH_HINT", { searchResultsLimit })
			searchResultsList.appendChild(refineMessage);
		} else if (features.length > 1 && features.length <= searchResultsLimit) {
			// Less results than limit
			searchResultsCounter.innerHTML = `<h4>${features.length} ${i18next.t("SEARCH_RESULTS")}`;
		} else if (features.length == 1) {
			// 1 result
			searchResultsCounter.innerHTML = `<h4>${features.length} ${i18next.t("SEARCH_RESULT")}`;
		};

		// Add ListItems
		for (var i = 0; i < searchResultsLimit && i < features.length; i++) {
			// Address at current index
			createListItem(features[i]);
		};
	} else if (features.length == 0 && searchInput.value != "") {
		// No results found
		var title = i18next.t("NO_SEARCH_RESULTS");
		var message = i18next.t("NO_SEARCH_RESULTS_MESSAGE");
		showSearchMessage(title, message);
	};
};

function showSearchMessage(title, message) {
	// Show container
	searchResultsContainer.style.display = "block";
	// Show counter
	searchResultsCounter.style.display = "block";

	// Create elements
	var headline = document.createElement("h4");
	var description = document.createElement("p");

	// Set values
	headline.innerHTML = title;
	description.id = "no-results-container";
	description.innerHTML = message;

	// Add content to containers
	searchResultsCounter.appendChild(headline);
	searchResultsContainer.appendChild(description);
};

function createListItem(feature) {
	var item = document.createElement("li");
	var address = feature[propertyAddressColumn];

	item.className = "search-result";
	item.tabIndex = 0;
	item.innerHTML = address;

	// Highlight part of string that matches input 
	highlightText(searchInput, item);

	if (document.getElementById("limit-message")) {
		// Insert list items before limit message
		searchResultsList.insertBefore(item, document.getElementById("limit-message"))
	} else {
		// Limit doesn't exist
		searchResultsList.appendChild(item);
	};

	// Add click event
	item.onclick = function(){
		async function render() {
			try {
				// Show spinner
				spinner.style.display = "block";

				var selected = await searchProperty(feature[propertyIndexColumn]);
				// Reset UI
				resetMap();
				// Update it
				renderSelectedUI(selected);
				// Log event
				firebase.analytics().logEvent("search-result-clicked", { 
					property_address: selected.properties[propertyAddressColumn],
					taxpayer: selected.properties[taxpayerColumn],
					affiliated_with: selected.properties[affiliatedWithColumn],
				});

				// Hide spinner
				spinner.style.display = "none";
			} catch {
				// Show error message
				resetSearchResults();
				var title = i18next.t('ERROR_DB');
				var message = i18next.t('ERROR_MESSAGE', { supportEmail });
				showSearchMessage(title, message);

				// Hide spinner
				spinner.style.display = "none";
			};	
		};
		render();
	};
	// Accessibility
	item.addEventListener("keypress",
		function(e) {
			// Enter key
			if (e.keyCode == 13) {
				e.target.click();
			};
		}
	);
};

function highlightText(input, destination) {
	var regex = new RegExp(input.value, "gi")
	var response = destination.innerHTML.replace(regex, function(str) {
		return "<b>" + str + "</b>"
	});
	destination.innerHTML = response;
};

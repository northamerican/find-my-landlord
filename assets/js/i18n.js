const searchParams = new URLSearchParams(location.search) || {};
const searchParamsLang = searchParams ? searchParams.get('lng') : null;

i18next.init({
  lng: searchParamsLang === 'en' ? 'en' : 'fr',
  resources: {
    en: {
      translation: {
        "TITLE": "Find My Landlord",
        "CITY": "Montreal",

        "AFFILIATED_LABEL": "Affiliated with:",
        "OWNED_LABEL": "Properties owned:",
        "TAXPAYER_LABEL": "Property taxpayer:",
        "UNITS_LABEL": "Units:",
        "ADDITIONAL_DETAILS_LABEL": "Additional property details",

        "SEARCH_LABEL": "Search by address",

        "BROWSER_WARNING": "Internet Explorer isn't supported. Try Chrome!",

        "LEGAL_NOTICE_TITLE": "Legal notice",
        "LEGAL_NOTICE_CONTENT": `<p>This tool provides publicly accessible information for non-commercial and educational purposes only.</p>
        <p>It is for use as a reference and its authors do not guarantee the information provided is current or accurate.</p>
        <p>The companies, names and trademarks are the property of their respective owners. The authors of this tool do not claim affiliation or ownership with any persons or companies displayed.</p>
        `,

        "DATA_INFO_TITLE": "How was this data collected?",
        "DATA_INFO_CONTENT": `<h5>Note: properties may have changed ownership since the data was initially collected. There may also be some inaccuracies due to the large size of the dataset – to flag an issue, please <a href="mailto:{{ supportEmail }}">email us</a>.</h5>

        <p>The <b>property taxpayer</b> for buildings in the Urban agglomeration of Montreal were <b>scraped</b> from the <a href="https://servicesenligne2.ville.montreal.qc.ca/sel/evalweb/index"><i>Consultation du rôle d'évaluation foncière</i></a> in September 2020. Addresses were supplied by <a href="https://openaddresses.io/">OpenAddresses</a>. Properties were matched based on the name and address of the property taxpayer, to find the <b>number of buildings</b> sharing the same taxpayer.</p>
        
        <p>For owners affiliated with at least 5 properties, matches were researched and <b>affiliated</b> with particular corporations, managers, or landlords based on information in public records.</p>
        `,

        "LEGEND_TITLE": "Owned by a landlord with...",
        "PROPERTIES": "properties",
        "NOT_DETERMINED": "not determined",
        "IMPROVE_OUR_DATA": "Improve our data",

        "SEARCH_RESULT": "search result",
        "SEARCH_RESULTS": "search results",
        "NO_SEARCH_RESULTS": "No search results",
        "NO_SEARCH_RESULTS_MESSAGE": "Sorry, we couldn't find that address. If your building is large, it may have multiple addresses. Try locating it on the map.",
        "SEARCH_HINT": "These are the first {{ searchResultsLimit }} results. Don't see your building? Try typing more of your address.",

        "ERROR_DB": "Database error",
				"ERROR_MESSAGE": "Sorry, we couldn't look up that property's details. Try again in an hour, or <a href='mailto:{{ supportEmail }}'>contact us</a>.",

        // PDF
        "PDF_DOWNLOAD_ALL": "Download all data for {{affiliatedWith}}",
        "PDF_DOWNLOAD_PROPERTIES": "Download data for {{ owned }} taxpayer properties",
        "PDF_DOWNLOAD_PROPERTY": "Download data for {{ owned }} taxpayer property",
        "PDF_FAILED": "Oops, generating a PDF failed. Try again later.",      

        "PROPERTY_ADDRESS": "Property address",
        "COMMUNITY_AREA": "Community area",
        "KNOWN_UNITS": "Known units",
        "AFFILIATED_WITH": "Affiliated with",
        "PROPERTIES_OWNED": "Properties owned",
        "PROPERTY_TAXPAYER": "Property taxpayer",
      }
    },

    fr: {
      translation: {
        "TITLE": "<i>Find My Landlord</i>",
        "CITY": "Montréal",

        "AFFILIATED_LABEL": "Affilié avec:",
        "OWNED_LABEL": "Bâtiments possédés:",
        "TAXPAYER_LABEL": "Nom du contribuable:",
        "UNITS_LABEL": "Unités:",
        "ADDITIONAL_DETAILS_LABEL": "Détails additonels",

        "SEARCH_LABEL": "Recherche par adresse",

        "BROWSER_WARNING": "Internet Explorer n'est pas supporté. Essayez Chrome!",

        "LEGAL_NOTICE_TITLE": "Mentions légales",
        "LEGAL_NOTICE_CONTENT": `<p>Cet outil fournit des informations accessibles au public à des fins non commerciales et éducatives uniquement.</p>
        <p>Il sert comme point de référence et ses auteurs ne garantissent pas que les informations fournies sont actuelles ou exactes.</p>
        <p>Les entreprises, noms et marques commerciales appartiennent à leurs propriétaires respectifs. Les auteurs de cet outil ne revendiquent aucune affiliation avec les personnes ou entreprises affichées.</p>
        `,

        "DATA_INFO_TITLE": "Comment ces données ont-elles été collectées?",
        "DATA_INFO_CONTENT": `<h5>Remarque: les bâtiments affichées peuvent avoir changé de propriétaire depuis la collecte initiale des données. Il peut également y avoir des inexactitudes en raison de la grande taille de l'ensemble de données - pour signaler un problème, veuillez nous contacter <a href="mailto:{{ supportEmail }}">par courriel</a>.</h5>

        <p>Les <b>données des contribuables</b> pour l'Agglomération de Montréal on été récupéré de la <a href="https://servicesenligne2.ville.montreal.qc.ca/sel/evalweb/index"><i>Consultation du rôle d'évaluation foncière</i></a> en septembre 2020. Les adresses étaient fournies par <a href="https://openaddresses.io/">OpenAddresses</a>. Les données ont été comparées en fonction du nom et de l'adresse du contribuable foncier, pour trouver le <b> nombre de bâtiments </b> partageant le même contribuable.</p>
        
        <p>Pour les bâtiments affiliés à au moins cinq propriétés, les infos correspondantes ont été recherchées et <b>affiliées</b> avec des entreprises, des gestionnaires ou des propriétaires particuliers sur la base d'informations contenues dans les archives publiques.</p>
        `,

        "LEGEND_TITLE": "Appartenant à un propriétaire avec...",
        "PROPERTIES": "bâtiments",
        "NOT_DETERMINED": "non déterminé",
        "IMPROVE_OUR_DATA": "Améliorez nos données",

        "SEARCH_RESULT": "résultat de la recherche",
        "SEARCH_RESULTS": "résultats de recherche",
        "NO_SEARCH_RESULTS": "Aucun résultat trouvé",
        "NO_SEARCH_RESULTS_MESSAGE": "Désolé, nous n'avons pas trouvé cette adresse. Pour les grands immeubles, il peut avoir plusieurs adresses. Essayez de le localiser sur la carte.",
        "SEARCH_HINT": "Voici les premiers résultats de {{ searchResultsLimit }} results. Vous ne voyez pas votre bâtiment? Essayez de saisir davantage votre adresse.",

        "ERROR_DB": "Erreur de la base de données",
				"ERROR_MESSAGE": "Désolé, nous n'avons pas pu rechercher les détails de cette propriété. Réessayez dans une heure, ou veuillez nous contacter <a href='mailto:{{ supportEmail }}'>par courriel</a>",

        // PDF
        "PDF_DOWNLOAD_ALL": "Télécharger toutes les données {{affiliatedWith}}",
        "PDF_DOWNLOAD_PROPERTIES": "Télécharger les données pour {{ owned }} bâtiments",
        "PDF_DOWNLOAD_PROPERTY": "Télécharger les données pour {{ owned }} bâtiment",
        "PDF_FAILED": "Désole! La génération d'un PDF a échoué. Réessayez plus tard.",

        "PROPERTY_ADDRESS": "Adresse",
        "COMMUNITY_AREA": "Arrondissement",
        "KNOWN_UNITS": "Unités",
        "AFFILIATED_WITH": "Affilié avec",
        "PROPERTIES_OWNED": "Bâtiments possédés",
        "PROPERTY_TAXPAYER": "Nom du contribuable",
      }
    }
  }
});

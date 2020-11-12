Montreal version of [Chicago DSA](https://github.com/ChicagoDSA)'s [Find My Landlord](https://github.com/ChicagoDSA/find-my-landlord) web app.

http://findmylandlord.qc.to/

# Find My Landlord
This tool allows you to:
- Look up select properties in Montreal
- View the property's owner, browse related properties, and download these as a PDF
- Explore the density of mega-landlord properties across neighborhoods

## Build
- Web app hosted on Netlify.
- Database hosted on Google firebase.
- Mapping hosted on Mapbox.

**Assets are built using tools in a private repo**

### Updating the map tiles
Replace the `features` directory with the newly generated map tiles. 

### Updating the search index
Generate the `search-index.json` file and put it in `functions/search/assets/`.

### Updating the property information db
Put the `property-information-for-firestore.json` file in the root of the project and run `utils/Firestore-uploader/import.js`.

### To build the functions directory
Run `netlify functions:build --src ./functions` and commit the generate netlify function zip file(s).


## Credits
[Lucien Liz-Lepiorz](https://github.com/lucienlizlepiorz) handled mapping and built the site. [Ivy Abid](https://github.com/ivyabid) directed the project and merged assessor data with other public datasets.

[Mapbox](https://www.mapbox.com/) powers the map's tileset, [Google Cloud Firestore](https://firebase.google.com/docs/firestore) hosts our database, and [jsPDF](https://github.com/MrRio/jsPDF) generates PDFs.

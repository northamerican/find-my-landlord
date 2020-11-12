Montreal version of [Chicago DSA](https://github.com/ChicagoDSA)'s [Find My Landlord](https://github.com/ChicagoDSA/find-my-landlord) web app.

http://findmylandlord.qc.to/

# Find My Landlord
This tool allows you to:
- Look up select properties in Montreal
- View the property's owner, browse related properties, and download these as a PDF
- Explore the density of mega-landlord properties across neighborhoods

## Build
- Web app hosted on [Netlify](https://www.netlify.com/).
- Domain registered on [freedns](https://freedns.afraid.org/subdomain/).
- Database hosted on [Google firebase](https://firebase.google.com/).
- Mapping hosted on [Mapbox](https://www.mapbox.com/).

**Assets are built using tools in a private repo**

### Updating the map tiles
Replace the `features` directory with the newly generated map tiles. 

### Updating the search index
Generate the `search-index.json` file and put it in `functions/search/assets/`.

### Updating the property information db
Put the `property-information-for-firestore.json` file in the root of the project and run `utils/Firestore-uploader/import.js`.


## Credits
[Lucien Liz-Lepiorz](https://github.com/lucienlizlepiorz) handled mapping and built the original concept and site.

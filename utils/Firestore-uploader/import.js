// NPM package
const firestoreService = require("firestore-export-import");
// API keys
const firebaseUrl = "https://find-my-landlord-mtl.firebaseio.com"
// Firebase service key
const serviceAccount = require("./service-key.json");

// JSON To Firestore
const jsonToFirestore = async () => {
	try {
		console.log("Initialzing Firebase");
		firestoreService.initializeApp(serviceAccount, firebaseUrl);
		console.log("Firebase Initialized");

		await firestoreService.restore(__dirname + "/../../property-information-for-firestore.json");
		console.log("Upload Success");
	}
	catch (error) {
		console.log(error);
	}
};

jsonToFirestore();

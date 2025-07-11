



import { Client, Databases } from "appwrite"; // ✅ Make sure this line exists

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Your Appwrite endpoint
  .setProject('686e5da2003011e8cf2b'); // ✅ Your Appwrite Project ID

export const databases = new Databases(client);
export const DATABASE_ID = "686e61c50031482b748c"; // Replace with your actual DB ID
export const COLLECTION_ID = "686e61d8002e1048f8d3"; // Replace with your actual Collection ID




















// import { Client, Databases, ID } from "appwrite";

// const client = new Client()
//      .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your endpoint
//   .setProject("686e5da2003011e8cf2b"); // Replace with your project ID

// const databases = new Databases(client);

// const result = await databases.upsertDocument(
//     "686e61c50031482b748c",
//     "686e61d8002e1048f8d3",
//     ID.unique(),
//     {
// 	    'name': 'Document 1',
// 	    'description': 'Description 1'
//     }
// );

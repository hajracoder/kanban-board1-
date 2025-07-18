


import { Client, Account, Databases, ID } from "appwrite"; // ✅ ID bhi yahin import

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Appwrite endpoint
  .setProject('686e5da2003011e8cf2b'); // ✅ Project ID

export const account = new Account(client); // ✅ Only one export
export const databases = new Databases(client);

export const DATABASE_ID = "686e61c50031482b748c"; 
export const COLLECTION_ID = "686e61d8002e1048f8d3"; 

export { ID }; // ✅ Correctly export ID



















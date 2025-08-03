



// import { Client, Account, Databases, ID } from "appwrite"; // ✅ ID bhi yahin import

// const client = new Client()
//   .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Appwrite endpoint
//   .setProject('686e5da2003011e8cf2b'); // ✅ Project ID

// import { Client, Account, Databases } from "appwrite"; // ✅ Make sure this line exists


// const client = new Client()
//   .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Your Appwrite endpoint
//   .setProject('686e5da2003011e8cf2b'); // ✅ Your Appwrite Project ID

  

// export const databases = new Databases(client);
// export const DATABASE_ID = "686e61c50031482b748c"; // Replace with your actual DB ID
// export const COLLECTION_ID = "686e61d8002e1048f8d3"; // Replace with your actual Collection ID
// export const account = new Account(client); // ✅ ADD THIS
// export const account = new Account(client);
// export { ID }; // ID bhi export ho







import { Client, Account, Databases, ID } from "appwrite"; // ✅ ID bhi yahin import

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Appwrite endpoint
  .setProject('686e5da2003011e8cf2b'); // ✅ Project ID

export const account = new Account(client); // ✅ Only one export
export const databases = new Databases(client);

export const DATABASE_ID = "686e61c50031482b748c"; 
export const COLLECTION_ID = "686e61d8002e1048f8d3"; 

export { ID }; // ✅ Correctly export ID













// // src/appwrite/appwrite.ts

// import { Client, Account, Databases, ID } from "appwrite";

// // Setup Appwrite client
// const client = new Client()
//   .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your Appwrite endpoint
//   .setProject('686e5da2003011e8cf2b'); // Your Project ID

// // Initialize Appwrite services
// const account = new Account(client);
// const databases = new Databases(client);

// // Constants
// const DATABASE_ID = "686e61c50031482b748c";
// const COLLECTION_ID = "686e61d8002e1048f8d3";

// // ✅ EXPORT sab kuch yahan se
// export {
//   account,
//   databases,
//   ID,
//   DATABASE_ID,
//   COLLECTION_ID,
// };



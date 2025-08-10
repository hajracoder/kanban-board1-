

// export type TaskStatus = "to-do" | "progress" | "done";


// export type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   date?: string;
//   status: TaskStatus;
//   owner?: string;
//   ownerName?: string; // ✅ Add this line
// };




// export type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   date?: string;
//   status: TaskStatus;
//   owner?: string;
//   ownerName?: string; // ✅ Add this line
// };


// src/types.ts

export type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;

  status: string;  // ya aap enum bhi bana sakte hain
  ownerId: string;   // yeh zaroori hai task ke malik ke liye
  ownerName: string; // task owner ka naam
};

export type User = {
  $id: string;    // document id in Appwrite
  userId: string; // user ka unique id (jo account se milta hai)
  name: string;
  email: string;

};

export type TaskStatus = "to-do" | "progress" | "done";







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




export type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: TaskStatus;
  // ownerId: string;    // Add this line
  ownerName: string;  // Add this line
};

export type TaskStatus = "to-do" | "progress" | "done";

export type User = {
  $id: string;
  userId: string;
  name: string;
  email: string;
};






export type TaskStatus = "to-do" | "progress" | "done";


export type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status: TaskStatus;
  owner?: string;
  ownerName?: string; // ✅ Add this line
};


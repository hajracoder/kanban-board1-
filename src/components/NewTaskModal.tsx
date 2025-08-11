import React, { useState } from "react";
import { User } from "../utils/fetchUsers";

type Props = {
  onAdd: (task: {
    title: string;
    description?: string;
    date?: string;
    ownerId: string;
    ownerName: string;
  }) => void;
  onClose: () => void;
  users: User[];
};

export default function AddTaskModal({ onAdd, onClose, users }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a valid title");
      return;
    }
    if (!selectedUserId) {
      alert("Please select a user to assign this task");
      return;
    }

    const selectedUser = users.find((u) => u.$id === selectedUserId);
    if (!selectedUser) {
      alert("Invalid user selected");
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      date,
      ownerId: selectedUser.$id,
      ownerName: selectedUser.name,
    });

    onClose();
    setTitle("");
    setDescription("");
    setDate("");
    setSelectedUserId("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 shadow-2xl border border-gray-200 backdrop-blur-lg p-6 sm:p-8 space-y-5 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800">📝 Add New Task</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g. Build Kanban Board"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            placeholder="Optional notes or details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none bg-white"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Due Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Assign To</label>
          <select
            required
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.$id} value={user.$id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !selectedUserId}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

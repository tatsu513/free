"use client";

import { useState } from "react";
import { useTaskStore } from "./useTaskStore";

export default function Main() {
  const [text, setText] = useState("");
  const { tasks, addTask, toggleTask, deleteTask } = useTaskStore();

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text);
      setText("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>

      {/* タスク追加フォーム */}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
          placeholder="New task"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* タスク一覧 */}
      <ul className="mt-6">
        {tasks.map((task, i) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-4 border-b shadow ${
              task.completed ? "bg-gray-500" : ""
            } ${i === 0 && "border-t"}`}
          >
            <span
              className={`text-lg ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-green-500 text-lg cursor-pointer hover:text-green-700 transition"
              >
                ✔
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

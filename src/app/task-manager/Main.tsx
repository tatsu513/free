"use client";

import { useState } from "react";
import { useTaskStore } from "./useTaskStore";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { BasicButton } from "@/components/buttons/BasicButton";
import { InputText } from "@/components/form/InputText";

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
        <InputText
          value={text}
          onChange={(e) => setText(e)}
          placeholder="New task"
        />
        <PrimaryButton label="追加" onSubmit={handleAddTask} />
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
              <PrimaryButton
                label="完了"
                onSubmit={() => toggleTask(task.id)}
              />
              <BasicButton label="削除" onSubmit={() => deleteTask(task.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

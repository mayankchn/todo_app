import React from "react";
import TodoList from "./TodoList";

function TodoPage() {
  return (
    <div className="h-screen bg-blue-100">
      <div className="flex flex-col gap-5 max-w-5xl mx-auto pt-10 border px-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text-blue-700">
            Things to get done
          </h1>
          <button className="border rounded-md px-3 py-1 bg-yellow-500 text-white font-semibold">
            Refresh
          </button>
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
export default TodoPage;

import React, { useState } from "react";

const initialTask = {
  title: "",
  description: "",
  assigned: "",
  dueDate: "",
  status: "Pending",
};

const TaskFeild = () => {
  const [todos, setTodos] = useState([]);
  const [Task, setTask] = useState(initialTask);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((t) => ({ ...t, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Task.title.trim()) {
      alert("Title is required");
      return;
    }

    if (editingId) {
      setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...Task } : t))
      );
      setEditingId(null);
      alert("Todo updated");
    } else {
      const newTodo = {
        ...Task,
        createdAt: new Date().toString(),
      };
      setTodos((prev) => [newTodo, ...prev]);
      alert("Todo successfully created");
    }

    setTask(initialTask);
  };

  const handleEdit = (todo) => {
    setTask({
      title: todo.title,
      description: todo.description,
      assigned: todo.assigned,
      dueDate: todo.dueDate,
      status: todo.status,
    });
    setEditingId(todo.id);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this todo?")) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 shadow-md rounded-md m-5 w-full max-w-3xl grid grid-cols-2 gap-5 p-5"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm mb-1">
            Title :
          </label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            value={Task.title}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="assigned" className="text-sm mb-1">
            Assigned Task to:
          </label>
          <input
            type="text"
            placeholder="Assigned to"
            name="assigned"
            id="assigned"
            value={Task.assigned}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="description" className="text-sm mb-1">
            Description :
          </label>
          <textarea
            rows={3}
            name="description"
            id="description"
            placeholder="Enter description"
            value={Task.description}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dueDate" className="text-sm mb-1">
            Due Date :
          </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={Task.dueDate}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm mb-1">
            Status :
          </label>
          <select
            className="border rounded px-4 py-2 border-gray-300 shadow-sm"
            name="status"
            id="status"
            value={Task.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Progress">Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 rounded-md text-white cursor-pointer w-full px-10 py-2 transition"
          >
            {editingId ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5 w-full max-w-6xl">
        {todos.length === 0 ? (
          <div className="text-gray-500">No todos yet. Add one above!</div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="border border-gray-200 shadow-sm rounded-md p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-2xl">{todo.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${todo.status === "Done"
                    ? "bg-green-100 text-green-700"
                    : todo.status === "Progress"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-gray-100 text-yellow-500"
                    }`}
                >
                  Status of the Task {todo.status}
                </span>
              </div>

              {todo.description && (
                <p className="text-xl text-gray-700">
                  description : {todo.description}
                </p>
              )}

              <div className="text-xl text-gray-500 flex gap-3">
                {todo.assigned && <span>Assigned: {todo.assigned}</span>}
                {todo.dueDate && <span>Due: {todo.dueDate}</span>}
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-gray-200 hover:bg-gray-400 text-sm rounded px-10 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm rounded px-10 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default TaskFeild;

import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    name: "",
    date: "",
    desc: ""
  });

  // Add task
  const addTask = (e) => {
    e.preventDefault();

    if (!form.name || !form.date) return;

    const newTask = {
      id: Date.now(), // unique id
      ...form,
      done: false
    };

    setTasks((prev) => [...prev, newTask]);

    setForm({
      name: "",
      date: "",
      desc: ""
    });
  };

  // Toggle done
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // Filter logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "done") return t.done;
    return !t.done;
  });

  return (
    <div className="app">
      <h1>Reminder App</h1>

      {/* Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={form.desc}
          onChange={(e) =>
            setForm({ ...form, desc: e.target.value })
          }
        />

        <button type="submit">Add</button>
      </form>

      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("done")}>Done</button>
        <button onClick={() => setFilter("notdone")}>
          Not Done
        </button>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className={task.done ? "done" : ""}
            >
              <b>{task.name}</b> - {task.date}
              {task.desc && ` | ${task.desc}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
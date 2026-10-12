import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export default function AddTask({ closeModal }) {
  const [formData, setFormData] = useState({
    id:Date.now(),
    title: "",
    priority: "",
    time: "",
    reminder: false,
    status: "",
  });

  const addTask = useTaskStore((state) => state.addTask);

  const handelCreateTask = () => {
    addTask(formData);
    closeModal();
  };
  return (
    <div style={{background:'var(--bg)',text:'var(--text)',border:'var(--border)'}} className=" p-10 w-150 max-h-125  m-auto rounded-2xl">
      <div className="text-center mb-5">
        <h1 className="font-bold text-2xl leading-10">Add New Task</h1>
        <p>Fill in details to schedual and organize your task.</p>
      </div>
      {/* ------form add task ------ */}
      <label htmlFor="addName" className="">
        Task Name
      </label>
      <br />
      <input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        type="text"
        id="addName"
        className="w-full p-2 mt-1 mb-3 rounded-2xl border"
      />
      <br />
      <input 
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        type="time"
        className="w-full p-2 mt-1 mb-2 rounded-2xl border"
      />

      <div className="justify-between flex my-5">
        <h2 className="">Priority :</h2>
        <button
          className="rounded-2xl py-1 px-10 bg-red-500"
          onClick={() => setFormData({ ...formData, priority: "Low" })}
        >
          Low
        </button>
        <button
          className="rounded-2xl py-1 px-10 bg-yellow-500"
          onClick={() => setFormData({ ...formData, priority: "Medium" })}
        >
          Medium
        </button>
        <button
          className="rounded-2xl py-1 px-10 bg-green-500"
          onClick={() => setFormData({ ...formData, priority: "High" })}
        >
          High
        </button>
      </div>
      {/*------------ status------------- */}
      <div className="flex justify-between my-5">
        <h2>Status :</h2>
        <label>
          <input
            type="radio"
            name="status"
            value="Done"
            checked={formData.status === "Done"}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />{" "}
          Done
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="Pending"
            checked={formData.status === "Pending"}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />
            Pending
        </label>

        <label>
          <input
            type="radio"
            name="status"
            value="Canceled"
            checked={formData.status === "Canceled"}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />{" "}
           Canceled
        </label>
      </div>

      {/* ------reminder checkbox----------- */}
      <div className="flex w-50  items-center mb-5">
        <input
          checked={formData.reminder}
          onChange={(e) =>
            setFormData({ ...formData, reminder: e.target.checked })
          }
          type="checkbox"
          className="border"
        />
        <div className="flex items-center p-2">
          <IoMdNotifications />
          <h3> Set reminder</h3>
        </div>
      </div>
      <div className=" flex justify-end">
        <button 
          className="px-5 mr-5 py-1 rounded-2xl bg-black/30"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button style={{backgroundColor:'var(--primary)'}}
          className="px-5 py-1 rounded-2xl bg-white text-black"
          onClick={handelCreateTask}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { createTodo } from "../services/todoService";
import Swal from "sweetalert2";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    try {
      if (newTodo.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Todo cannot be empty!",
        });
        return;
      }

      await createTodo(newTodo);
      setNewTodo("");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New todo added successfully!",
      }).then(() => {
        // Reload the page after the user clicks "Okay" on the SweetAlert
        window.location.reload();
      });
    } catch (error) {
      console.error("Error creating todo:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while creating todo!",
      });
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        placeholder="New To-Do"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button className="add-btn" onClick={handleAddTodo}>
        Add New ToDo
      </button>
    </div>
  );
};

export default AddTodo;

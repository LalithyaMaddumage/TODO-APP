import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../services/todoService";
import Swal from "sweetalert2";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const TodoItem = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  // Keep track of which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleUpdateTodo = async () => {
    try {
      const updatedCompleted = !completed;
      await updateTodo(todo.id, updatedTitle, updatedCompleted);
      setCompleted(updatedCompleted);
      setIsEditing(false); // Close the editing modal after updating
      // Reload the page after successful update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleUpdateTitle = async () => {
    try {
      await updateTodo(todo.id, updatedTitle, completed); // Call the function to update the title
      setIsEditing(false); // Close the editing modal after updating
      window.location.reload(); // Reload the page after successful update
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const handleDeleteTodo = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteTodo(todo.id);
        // You can also add a callback here to remove the item from the list.
        Swal.fire("Deleted!", "Your task has been deleted.", "success");

        // Reload the page after successful deletion
        window.location.reload();
      } catch (error) {
        console.error("Error deleting todo:", error);
        Swal.fire(
          "Oops...",
          "An error occurred while deleting the task.",
          "error"
        );
      }
    }
  };

  const handleEditClick = () => {
    // Close the editing modal for the previously edited task (if any)
    if (editingTaskId !== null) {
      setIsEditing(false);
    }

    // Set the task being edited
    setEditingTaskId(todo.id);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false); // Close the editing modal without updating
    setEditingTaskId(null); // Clear the task being edited
  };

  return (
    <li className={`todo-item ${completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-modal">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button className="update-btn" onClick={handleUpdateTitle}>
            <FaCheck />
          </button>
          <button className="close-btn" onClick={handleEditCancel}>
            <FaTimes />
          </button>
        </div>
      ) : (
        <span onClick={handleEditClick}>{todo.title}</span>
      )}
      <div className="actions">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleUpdateTodo}
          />
          <span className="custom-checkmark"></span>
        </label>
        <button className="delete-button" onClick={handleDeleteTodo}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

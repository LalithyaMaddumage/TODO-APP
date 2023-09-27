// src/services/todoService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (title) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos/add`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (id, title, completed) => {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, { title, completed });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Separate function to update the title
export const updateTitle = async (id, title) => {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Separate function to update the completion status
export const updateCompletionStatus = async (id, completed) => {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, { completed });
    return response.data;
  } catch (error) {
    throw error;
  }
};

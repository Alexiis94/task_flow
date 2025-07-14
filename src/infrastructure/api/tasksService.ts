import axiosInstance from "./axiosInstance";
import type { Task } from "../../domain/task/task";

const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get(`/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await axiosInstance.post("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error al crear un task", error);
    throw error;
  }
};

const deleteTask = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error al eliminar un task", error);
    throw error;
  }
};

const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar un task", error);
    throw error;
  }
};

export { getTasks, createTask, deleteTask, updateTask };

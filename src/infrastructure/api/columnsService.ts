import axiosInstance from "./axiosInstance";
import type { TaskColumn } from "../../domain/task/task";

const getColumns = async (): Promise<TaskColumn[]> => {
  try {
    const response = await axiosInstance.get(`/columns`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export { getColumns };

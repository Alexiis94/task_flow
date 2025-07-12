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

const createColumns = async (title: string): Promise<TaskColumn> => {
  try {
    const response = await axiosInstance.post(`/columns`, { title });
    return response.data;
  } catch (error) {
    console.error("Error al crear un columna:", error);
    throw error;
  }
};

export { getColumns, createColumns };

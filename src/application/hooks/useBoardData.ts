import { useEffect, useState } from "react";
import { getBoardData } from "../task/getBoardData";
import type { TaskColumn } from "../../domain/task/task";

export const useBoardData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataBoard, setDataBoard] = useState<TaskColumn[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBoardData();
        setDataBoard(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataBoard, setDataBoard, isLoading };
};

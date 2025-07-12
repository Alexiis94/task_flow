import { useEffect } from "react";
import { useBoardStore } from "../../../store/task/useBoardStore";

export const useBoardData = () => {
  const dataBoard = useBoardStore((state) => state.dataBoard);
  const isLoading = useBoardStore((state) => state.isLoading);

  useEffect(() => {
    useBoardStore.getState().fetchBoard();
  }, []);

  return { dataBoard, isLoading };
};

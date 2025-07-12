import { useState } from "react";
import { createColumn } from "../../task/createColumns";
import { useBoardStore } from "../../../store/task/useBoardStore";

export const useCreateColumn = () => {
  const [isCreatingColumn, setIsCreatingColumn] = useState<boolean>(false);
  const store = useBoardStore.getState();

  const handleCreateColumn = async (title: string) => {
    setIsCreatingColumn(true);
    try {
      const newColumn = await createColumn(title);
      store.addColumn(newColumn);
    } catch (error) {
      console.log("Error al crear la Columna.");
      throw error;
    } finally {
      setIsCreatingColumn(false);
    }
  };

  return { isCreatingColumn, handleCreateColumn };
};

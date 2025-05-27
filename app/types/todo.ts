export type TodoItemData = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: TodoItemData;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

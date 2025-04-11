export interface Todo {
  title: string;
  id: number;
  type: "hard" | "normal" | "easy";
  description: string;
  completed: boolean;
}

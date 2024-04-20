import { getSSRSession } from "@/lib/get-server-session";
import { CreateTodoButton } from "./_components/create-todo-button";
import { getTodosUseCase } from "@/use-cases/todos";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Todo } from "./_components/todo";

export default async function TodosPage() {
  const { user } = await getSSRSession();

  if (!user) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

  const todos = await getTodosUseCase(user.id);

  const hasTodos = todos.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl">Your Todos</h1>
        <CreateTodoButton />
      </div>

      {hasTodos && (
        <div className="">
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>
      )}

      {!hasTodos && (
        <div className="text-2xl flex items-center justify-center">
          <p>You have no todos</p>
        </div>
      )}
    </div>
  );
}

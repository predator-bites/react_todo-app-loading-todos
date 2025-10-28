import React from "react";
import { Todo } from "../../types/Todo";
import { TodoInfo } from "../TodoInfo/TodoInfo";

interface Props {
  todos: Todo[];
  loading: number;
  editing: number;
  onDelete: () => {};
}

export const TodoList: React.FC<Props> = ({
  todos,
  loading,
  editing,
  onDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          onDelete={onDelete}
          key={todo.id}
          loading={loading !== -1 ? todo.id === loading : false}
          editing={loading !== -1 ? todo.id === editing : false}
        />
      ))}
    </section>
  );
};

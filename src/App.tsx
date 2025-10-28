/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import cn from 'classnames';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Err>('');
  const [title, setTitle] = useState('');
  const [sortType, setSortType] = useState<SortType>('all');
  const [loading, setLoading] = useState(-1);
  const [editing, setEditing] = useState(-1);

  const cleanTitle = () => {
    setTitle('');
    setError('');
  };

  const handlingTitleChange = (ev: FormEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }

    setTitle(ev.target.value);
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const newTodo: Todo = {
      title: title,
      userId: USER_ID,
      completed: false,
    };

    if (!title) {
      setError('Title should not be empty');

      return null;
    }

    addTodo(newTodo)
      .then(res => {
        cleanTitle();

        return setTodos(currentTodos => [...currentTodos, res]);
      })
      .catch(e => {
        setError('Unable to add a todo');
        throw e;
      });
  };

  const handlingSortTypeChange = (newType: SortType) => {
    if (sortType !== newType) {
      setSortType(newType);
    }
  };

  useEffect(() => {
    getTodos()
      .then(tds => {
        cleanTitle();
        setTodos(tds);
      })
      .catch(e => {
        setError(e);
        throw e;
      });
  }, []);

  useEffect(() => {
    const newTds = todos.filter(todo => {
      switch (sortType) {
        case 'active':
          if (!todo.completed) {
            return true;
          }

          return false;

        case 'completed':
          if (!todo.completed) {
            return false;
          }

          return true;

        default:
          return true;
      }
    });

    setTodos(newTds);
  }, [sortType, ]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={onSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handlingTitleChange}
            />
          </form>
        </header>

        <TodoList
          todos={todos}
          onDelete={() => {}}
          loading={loading}
          editing={editing}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <TodoFooter
            todoAmount={todos.length}
            onSortChange={handlingSortTypeChange}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};

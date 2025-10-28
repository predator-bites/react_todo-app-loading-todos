import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  todoAmount: number;
  onSortChange: (sortType: SortType) => void;
}

export const TodoFooter: React.FC<Props> = ({ todoAmount, onSortChange }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todoAmount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href=""
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={() => onSortChange('all')}
        >
          All
        </a>

        <a
          href=""
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={() => onSortChange('active')}
        >
          Active
        </a>

        <a
          href=""
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={() => onSortChange('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

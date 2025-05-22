import React, { type PropsWithChildren } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import type { Task } from '../../../@types/types';

interface Props extends PropsWithChildren {
  tasks: Task[];
  statusForm: boolean;
  openForm: () => void;
  clear: () => void;
}

export const Tasks: React.FC<Props> = ({
  tasks,
  statusForm,
  openForm,
  clear,
  children,
}) => {
  return (
    <div className={statusForm ? 'w-1/2' : 'w-full'}>
      <div className="my-5 flex justify-between">
        <h4 className="text-[32px] font-extrabold">
          Today{' '}
          <span className="border border-gray-500 px-3 py-2 rounded-2xl">
            {tasks.length}
          </span>
        </h4>
        <button
          onClick={clear}
          className="text-[14px] cursor-pointer font-bold border border-gray-500 p-2 rounded-[5px] disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-none"
          disabled={tasks.length === 0}
        >
          Clear tasks
        </button>
      </div>
      <button
        className="cursor-pointer w-full text-[18px] flex items-center gap-3 px-3 py-2 border rounded-[5px] border-gray-500"
        onClick={openForm}
      >
        <PlusIcon size={22} weight="bold" /> Add new task
      </button>
      <div className="my-[15px]">{children}</div>
    </div>
  );
};

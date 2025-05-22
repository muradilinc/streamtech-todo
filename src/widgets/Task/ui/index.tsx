import { CaretRightIcon } from '@phosphor-icons/react';
import * as React from 'react';
import type { Category, Task } from '../../../@types/types';
import { useEffect, useState } from 'react';

interface Props {
  task: Task;
  status: (id: string) => void;
  categories: Category[];
  select: (task: Task) => void;
  deleteItem: (id: string) => void;
}

export const TaskItem: React.FC<Props> = ({
  task,
  status,
  categories,
  select,
  deleteItem,
}) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Math.floor((task.live! - Date.now()) / 1000)),
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      deleteItem(task.id);
      return;
    }

    const interval = setInterval(() => {
      const secondsLeft = Math.max(
        0,
        Math.floor((task.live! - Date.now()) / 1000),
      );
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) {
        clearInterval(interval);
        deleteItem(task.id);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.live, deleteItem, task.id]);

  return (
    <div
      key={task.id}
      className="border-b border-gray-500 flex items-start gap-2 px-3 py-2"
    >
      <input
        className="mt-[4px]"
        type="checkbox"
        checked={task.status}
        onChange={() => status(task.id)}
      />
      <div>
        <h2 className="text-[16px] font-medium">{task.title}</h2>
        <div className="flex gap-3">
          <p>
            {categories.find((category) => category.id === task.category)?.name}
          </p>
          <p>Expire: {timeLeft}</p>
        </div>
      </div>
      <CaretRightIcon
        onClick={() => select(task)}
        className="ml-auto mt-[10px]"
        size={22}
        weight="bold"
      />
    </div>
  );
};

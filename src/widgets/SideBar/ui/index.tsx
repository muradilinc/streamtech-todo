import { ListIcon, PlusIcon, XIcon } from '@phosphor-icons/react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import type { Category, NewCategoryState, Task } from '../../../@types/types';
import React from 'react';

interface Props {
  tasks: Task[];
  close: () => void;
  categories: Category[];
  category: NewCategoryState;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  create: (event: FormEvent) => void;
  selectColor: (color: string) => void;
  selectCategoryItem: (id: string) => void;
  revokeCategory: (id: string) => void;
}

const colors = [
  '#ffadad',
  '#ffd6a5',
  '#fdffb6',
  '#caffbf',
  '#9bf6ff',
  '#9bf6ff',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff',
];

export const SideBar: React.FC<Props> = ({
  tasks,
  close,
  categories,
  create,
  category,
  change,
  selectColor,
  selectCategoryItem,
  revokeCategory,
}) => {
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);

  return (
    <div className="bg-gray-400 w-1/4 p-5 flex flex-col gap-y-5 rounded-[5px]">
      <ListIcon
        className="ml-auto cursor-pointer"
        onClick={close}
        size={32}
        weight="bold"
      />
      <h2 className="text-[22px] font-bold">Categories</h2>
      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-3"
          onClick={() => selectCategoryItem('')}
        >
          <p className="text-[14px] font-medium">All</p>
          <span className="px-[8px] py-[3px] rounded-[5px] bg-gray-500 ml-auto">
            {tasks.length}
          </span>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-3"
            onClick={() => selectCategoryItem(category.id)}
          >
            <input
              type="color"
              className="w-[20px] outline-none border-none"
              value={category.color}
              disabled
            />
            <p className="text-[14px] font-medium cursor-pointer">
              {category.name}
            </p>
            <span className="px-[8px] py-[3px] rounded-[5px] bg-gray-500 ml-auto">
              {tasks.filter((task) => task.category === category.id).length}
            </span>
            <XIcon
              className="cursor-pointer"
              size={16}
              onClick={() => revokeCategory(category.id)}
            />
          </div>
        ))}
        <button
          className="cursor-pointer w-full text-[18px] flex items-center gap-3 py-2 rounded-[5px]"
          onClick={() => setShowCategoryForm((prevState) => !prevState)}
        >
          <PlusIcon size={22} weight="bold" /> Add new category
        </button>
        {showCategoryForm && (
          <form
            onSubmit={create}
            className="border border-gray-600 flex flex-col gap-3 p-2 rounded-[5px]"
          >
            <div className="border border-gray-500 px-2 py-1 rounded-[5px] flex items-center gap-1">
              <input
                name="color"
                disabled
                className="w-[20px]"
                type="color"
                value={category.color || colors[0]}
              />
              <input
                name="name"
                className="outline-none"
                placeholder="Category name"
                type="text"
                value={category.name}
                onChange={change}
                required
              />
            </div>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  onClick={() => selectColor(color)}
                  type="button"
                  style={{ background: `${color}` }}
                  className={`w-[20px] h-[20px] rounded-[5px]`}
                />
              ))}
            </div>
            <button className="cursor-pointer" type="submit">
              Add
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

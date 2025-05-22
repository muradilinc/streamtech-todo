import { XIcon } from '@phosphor-icons/react';
import { type ChangeEvent, type FormEvent } from 'react';
import type { Category, NewTaskState } from '../../../@types/types';
import * as React from 'react';

interface Props {
  task: NewTaskState;
  change: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  create: (event: FormEvent) => void;
  deleteItem: (id: string) => void;
  closeForm: () => void;
  categories: Category[];
}

export const CreateTask: React.FC<Props> = ({
  task,
  change,
  create,
  deleteItem,
  closeForm,
  categories,
}) => {
  return (
    <form
      className="flex flex-col gap-3 items-start w-1/2 bg-amber-50 h-full p-5 rounded-[5px]"
      onSubmit={create}
    >
      <div className="flex justify-between items-center w-full">
        <h4 className="text-[22px] font-bold">Task:</h4>
        <XIcon
          className="cursor-pointer"
          size={22}
          weight="bold"
          onClick={closeForm}
        />
      </div>
      <div className="flex flex-col gap-3 w-full h-[90vh]">
        <input
          className="border border-gray-500 px-[10px] py-[5px] rounded-[5px] w-full outline-none"
          type="text"
          name="title"
          value={task.title}
          onChange={change}
          placeholder="Title"
          required
        />
        <textarea
          className="border border-gray-500 px-[10px] py-[5px] rounded-[5px] w-full outline-none"
          rows={5}
          cols={30}
          name="description"
          value={task.description}
          onChange={change}
          placeholder="Description"
          required
        />
        <div className="flex items-center">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={task.category || 1}
            onChange={change}
            className="border border-gray-500 px-[10px] py-[5px] rounded-[5px] outline-none ml-[100px]"
            required
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-end">
        <button
          type="button"
          onClick={() => deleteItem(localStorage.getItem('id') || 'lol')}
          className="w-1/2 text-[14px] cursor-pointer font-bold border border-gray-500 py-2 rounded-[5px] disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-none"
          disabled={!localStorage.getItem('id')}
        >
          Delete task
        </button>
        <button
          className="w-1/2 text-[14px] cursor-pointer bg-amber-300 font-bold rounded-[5px]"
          type="submit"
        >
          {localStorage.getItem('id') ? 'Save changes' : 'Create'}
        </button>
      </div>
    </form>
  );
};

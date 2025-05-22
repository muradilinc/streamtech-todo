import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import type {
  Category,
  NewCategoryState,
  NewTaskState,
  Task,
} from '../@types/types';
import { ListIcon } from '@phosphor-icons/react';
import { SideBar } from '../widgets/SideBar';
import { CreateTask } from '../features/CreateTask';
import { TaskItem } from '../widgets/Task';
import { Tasks } from '../widgets/Tasks/ui';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<NewTaskState>({
    title: '',
    description: '',
    status: false,
    category: null,
    live: null,
  });
  const [category, setCategory] = useState<NewCategoryState>({
    name: '',
    color: '',
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDraft, setShowDraft] = useState<boolean>(true);
  const [selectCategory, setSelectCategory] = useState<string>('');

  useEffect(() => {
    localStorage.removeItem('id');
    setTasks(JSON.parse(localStorage.getItem('tasks') || '[]'));
    setCategories(JSON.parse(localStorage.getItem('categories') || '[]'));
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories]);

  const changeFields = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setCategory((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setTask((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const createTaskHandle = (event: FormEvent) => {
    event.preventDefault();
    const editId = localStorage.getItem('id');

    if (editId) {
      const updatedTasks = tasks.map((oldTask) =>
        oldTask.id === editId ? { ...task, id: oldTask.id } : oldTask,
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      localStorage.removeItem('id');
    } else {
      const newTask = { ...task, id: uuid(), live: Date.now() + 100000 };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    setTask({
      title: '',
      description: '',
      category: '',
      status: false,
      live: null,
    });
  };

  const selectTask = (task: Task) => {
    setShowForm(true);
    localStorage.setItem('id', task.id);
    setTask((prevState) => ({ ...prevState, ...task }));
  };

  const changeStatus = (id: string) => {
    setTasks((prevState) => {
      return prevState.map((task) => {
        const copyObj = { ...task };
        if (copyObj.id === id) {
          copyObj.status = !copyObj.status;
        }

        return copyObj;
      });
    });
  };

  const deleteTaskHandle = (id: string) => {
    setTasks((prevState) => {
      const updateTasks = prevState.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updateTasks));
      return updateTasks;
    });

    setTask({
      title: '',
      description: '',
      category: '',
      status: false,
      live: null,
    });
    setShowForm(false);
    localStorage.removeItem('id');
  };

  const createCategory = (event: FormEvent) => {
    event.preventDefault();
    setCategories((prevState) => [...prevState, { ...category, id: uuid() }]);
    setCategory({
      name: '',
      color: '',
    });
  };

  const chooseColor = (color: string) => {
    setCategory((prevState) => ({
      ...prevState,
      color,
    }));
  };

  const clearTasksHandle = () => {
    setTasks([]);
  };

  const selectCategoryHandle = (id: string) => {
    setSelectCategory(id);
  };

  const deleteCategoryHandle = (id: string) => {
    setCategories((prevState) => {
      const updateCategories = prevState.filter(
        (category) => category.id !== id,
      );
      localStorage.setItem('categories', JSON.stringify(updateCategories));
      return updateCategories;
    });
    setTasks((prevState) => {
      const updateTasks = prevState.filter((task) => task.category !== id);
      localStorage.setItem('tasks', JSON.stringify(updateTasks));
      return updateTasks;
    });
  };

  return (
    <div className="flex gap-3 my-3 mx-3 h-[95vh]">
      {showDraft ? (
        <SideBar
          tasks={tasks}
          close={() => setShowDraft(false)}
          create={createCategory}
          categories={categories}
          category={category}
          change={changeFields}
          selectColor={chooseColor}
          selectCategoryItem={selectCategoryHandle}
          revokeCategory={deleteCategoryHandle}
        />
      ) : (
        <ListIcon
          className="cursor-pointer mx-5"
          onClick={() => setShowDraft(true)}
          size={32}
          weight="bold"
        />
      )}
      <div className="flex gap-3 w-full">
        <Tasks
          tasks={tasks}
          openForm={() => setShowForm(true)}
          statusForm={showForm}
          clear={clearTasksHandle}
        >
          {(selectCategory !== ''
            ? tasks.filter((task) => task.category === selectCategory)
            : tasks
          ).map((task) => (
            <TaskItem
              task={task}
              status={changeStatus}
              categories={categories}
              select={selectTask}
              deleteItem={deleteTaskHandle}
            />
          ))}
        </Tasks>
        {showForm && (
          <CreateTask
            task={task}
            change={changeFields}
            create={createTaskHandle}
            deleteItem={deleteTaskHandle}
            closeForm={close}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default App;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskNewProps } from '../interface/index';
import { toastifyLoad } from '../function/toastifyLoad';
import TasksDataService from '../services/tasks.services';

export const getTaskNew = createAsyncThunk(
  'task/getTaskNew',
  async ({ id, newTasks }: getTaskNewProps) => {
    try {
      if (id !== undefined && id !== '') {
        await TasksDataService.updateTasks(id, newTasks);
        toastifyLoad('✏️ Задача обновлена');
      } else {
        await TasksDataService.addTasks(newTasks);
        toastifyLoad('✔️ Задача добавлена');
      }
    } catch (error) {
      toastifyLoad('⛔️ Произошла ошибка');
    }
  },
);

export const getTasksDelete = createAsyncThunk(
  'task/getTasksDelete',
  async (id: string) => {
    await TasksDataService.deleteTasks(id);
  },
);

export const getDataTasks = createAsyncThunk('task/getDataTasks', async () => {
  const data = await TasksDataService.getAllTasks();
  const dataTask: any = data.docs.map(item => {
    return { ...item.data(), id: item.id };
  });

  return dataTask;
});

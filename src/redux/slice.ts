import { createSlice } from '@reduxjs/toolkit';
import { IStatus } from '../interface/index';
import { getDataTasks, getTaskNew } from './asyncTasks';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    id: '',
    openModal: false,
    tasks: [],
    loading: false,
    error: false,
    validForm: '',
    status: <IStatus>{
      express: '',
      next: '',
      classic: '',
    },
  },
  reducers: {
    updateTask: (state, action) => {
      state.id = action.payload;
    },
    updateStatus: (state, action) => {
      if (action.payload.name && action.payload.innerText) {
        state.status = { [action.payload.name]: action.payload.innerText };
      } else {
        state.status = action.payload;
      }
    },
    updateValidForm: (state, action) => {
      state.validForm = action.payload;
    },
    taskId: (state, action) => {
      state.id = action.payload;
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
  extraReducers: {
    [getDataTasks.pending.toString()]: state => {
      state.loading = true;
      state.error = false;
    },
    [getDataTasks.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.tasks = action.payload;
    },
    [getDataTasks.rejected.toString()]: state => {
      state.loading = false;
      state.error = true;
    },
    [getTaskNew.pending.toString()]: state => {
      state.loading = true;
      state.error = false;
    },
    [getTaskNew.fulfilled.toString()]: state => {
      state.loading = false;
      state.error = false;
      state.openModal = false;
      state.id = '';
    },
    [getTaskNew.rejected.toString()]: state => {
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  updateTask,
  updateStatus,
  updateValidForm,
  taskId,
  setOpenModal,
} = taskSlice.actions;
export default taskSlice.reducer;

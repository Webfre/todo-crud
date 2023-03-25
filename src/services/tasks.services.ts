import { db } from '../firebase/firebase-config';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

class TasksDataService {
  addTasks = (newTask: any) => {
    return addDoc(tasksCollectionRef, newTask);
  };

  updateTasks = (id: string, newTask: any) => {
    const taskDoc = doc(db, 'tasks', id);
    return updateDoc(taskDoc, newTask);
  };

  deleteTasks = (id: string) => {
    const taskDoc = doc(db, 'tasks', id);
    return deleteDoc(taskDoc);
  };

  getAllTasks = () => {
    return getDocs(tasksCollectionRef);
  };

  getTask = (id: string) => {
    const taskDoc = doc(db, 'tasks', id);
    return getDoc(taskDoc);
  };
}

export default new TasksDataService();

export interface IStatus {
  express?: string;
  next?: string;
  classic?: string;
}

export interface IValue {
  title: string;
  author: string;
}

export interface ITasks {
  id: string;
  title: string;
  status: string;
  author: string;
  time?: {
    timeMinute?: string;
    timeDay?: string;
  };
}

// Redux types
export interface getTaskNewProps {
  id: string;
  newTasks: {};
}

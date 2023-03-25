import { useEffect } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector';
import { updateTask } from '../redux/slice';
import { getDataTasks, getTasksDelete } from '../redux/asyncTasks';
import { ITasks } from '../interface';
import Loader from './Loader';
import '../style/table.scss';

function Table() {
  const tasks: ITasks[] = useAppSelector(store => store.task.tasks);
  const loading = useAppSelector(store => store.task.loading);
  const dispatch = useAppDispatch();

  const taskDelete = (id: string) => {
    dispatch(getTasksDelete(id));
    dispatch(getDataTasks());
  };

  useEffect(() => {
    dispatch(getDataTasks());
  }, []);

  return (
    <>
      <div className='tasks-list'>
        <button
          className='update-tasks-list'
          onClick={() => dispatch(getDataTasks())}
        >
          Обновить
        </button>
        <table className='container'>
          <thead>
            <tr>
              <th>
                <h2>#</h2>
              </th>
              <th>
                <h2>Задача</h2>
              </th>
              <th>
                <h2>Назначен</h2>
              </th>
              <th>
                <h2>Статус</h2>
              </th>
              <th>
                <h2>Действия</h2>
              </th>
              <th>
                <h2>Время</h2>
              </th>
            </tr>
          </thead>
          {tasks.length ? (
            <tbody>
              {tasks.map(({ author, id, status, time, title }, i) => {
                return (
                  <tr key={id}>
                    <td>{i + 1}</td>
                    <td>{title}</td>
                    <td>{author}</td>
                    <td
                      style={{
                        background:
                          status === 'Срочно' ? 'rgb(154, 48, 48)' : '',
                      }}
                    >
                      {status}
                    </td>
                    <td>
                      <button
                        onClick={() => dispatch(updateTask(id))}
                        className='update'
                      >
                        <BiEditAlt />
                      </button>
                      <button onClick={() => taskDelete(id)} className='delete'>
                        <AiFillDelete />
                      </button>
                    </td>
                    <td>{time?.timeMinute}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr style={{ background: 'transparent' }} className='not-tasks'>
                <td style={{ boxShadow: 'none' }}>
                  {loading ? null : 'Задачи отсутствуют'}
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {loading ? <Loader /> : null}
      </div>
    </>
  );
}

export default Table;

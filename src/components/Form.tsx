import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { IStatus, IValue } from '../interface/index';
import { toastifyLoad } from '../function/toastifyLoad';
import { updateStatus, updateValidForm } from '../redux/slice';
import { getTaskNew, getDataTasks } from '../redux/asyncTasks';
import TasksDataService from '../services/tasks.services';
import validateToForm from '../function/validateToForm';
import dateTask from '../function/dateTask';
import '../style/form.scss';

const Form = () => {
  const [value, setValue] = useState<IValue>({ title: '', author: '' });
  const { id, validForm } = useAppSelector(store => store.task);
  const status: IStatus = useAppSelector(store => store.task.status);
  const dispatch = useAppDispatch();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleStatus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, innerText } = e.target as HTMLButtonElement;
    dispatch(updateStatus({ name, innerText }));
  };

  const validData = () => {
    const valid = validateToForm(value, status);

    if (valid) {
      dispatch(updateValidForm(valid));
      return true;
    }

    return {
      title: value.title,
      author: value.author,
      status: status.next || status.express || status.classic,
      time: {
        timeMinute: dateTask(),
      },
    };
  };

  const handleSubmitTask = async (id: string) => {
    const newTasks = validData();
    if (newTasks === true) return;

    dispatch(getTaskNew({ id, newTasks }));
    dispatch(getDataTasks());
    dispatch(updateValidForm(''));
    setValue({ title: '', author: '' });
    dispatch(
      updateStatus({
        express: '',
        next: '',
        classic: '',
      }),
    );
  };

  const editTask = async (id: string) => {
    try {
      const docTasks = await TasksDataService.getTask(id);
      setValue({
        title: docTasks.data()?.title,
        author: docTasks.data()?.author,
      });
    } catch (error) {
      toastifyLoad('⛔️ Произошла ошибка');
    }
  };

  useEffect(() => {
    if (id === '') return;
    editTask(id);
  }, [id]);

  return (
    <div className='form'>
      <div className={validForm === 'title' ? 'on-valid-tasks' : 'none'}>
        <h5>Введите задачу</h5>
      </div>
      <input
        onChange={e => onChangeValue(e)}
        value={value.title}
        name='title'
        type='text'
        placeholder='Введите задачу...'
      />
      <div className={validForm === 'author' ? 'on-valid-autor' : 'none'}>
        <h5>Введите исполнителя</h5>
      </div>
      <input
        onChange={e => onChangeValue(e)}
        value={value.author}
        className='mt'
        name='author'
        type='text'
        placeholder='Кто выполнит задачу...'
      />
      <div className='form__status mt-s'>
        <button
          name='express'
          onClick={e => handleStatus(e)}
          className={status.express === 'Срочно' ? 'active__red' : ''}
        >
          Срочно
        </button>
        <button
          name='next'
          onClick={e => handleStatus(e)}
          className={status.next === 'В очереди' ? 'active__yel' : ''}
        >
          В очереди
        </button>
        <button
          name='classic'
          onClick={e => handleStatus(e)}
          className={status.classic === 'Нейтрально' ? 'active__blue' : ''}
        >
          Нейтрально
        </button>
        <div className={validForm === 'status' ? 'on-valid-status' : 'none'}>
          <h5>Укажите статус</h5>
        </div>
      </div>
      <button onClick={() => handleSubmitTask(id)} className='btn__add'>
        {id ? 'Изменить' : 'Добавить'}
      </button>
    </div>
  );
};

export default Form;

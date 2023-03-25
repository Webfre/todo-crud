import { useEffect } from 'react';
import Form from './Form';
import '../style/modal.scss';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { setOpenModal, taskId } from '../redux/slice';

function ModalWindow() {
  const { id, openModal } = useAppSelector(store => store.task);
  const dispatch = useAppDispatch();

  const closeModalWindow = () => {
    dispatch(setOpenModal(false));
    dispatch(taskId(''));
  };

  useEffect(() => {
    id && dispatch(setOpenModal(true));
  }, [id]);

  useEffect(() => {
    function modalClose(e: MouseEvent | TouchEvent) {
      const { className } = e.target as HTMLDivElement;
      if (className === 'open modal') {
        dispatch(setOpenModal(false));
        dispatch(taskId(''));
      }
    }

    function keydownClose(e: KeyboardEvent) {
      const event = e as KeyboardEvent;
      if (event.key === 'Escape') {
        dispatch(setOpenModal(false));
        dispatch(taskId(''));
      }
    }

    window.addEventListener('click', modalClose);
    window.addEventListener('keydown', keydownClose);

    return () => {
      window.removeEventListener('click', modalClose);
      window.removeEventListener('keydown', keydownClose);
    };
  }, []);

  return (
    <>
      <div className={openModal ? 'open modal' : 'modal'}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title'>Изменить задачу</h3>
              <button onClick={closeModalWindow} className='close'>
                ×
              </button>
            </div>
            <div className='modal-body'>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalWindow;

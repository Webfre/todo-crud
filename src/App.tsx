import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ModalWindow from './components/ModalWindow';
import Form from './components/Form';
import Table from './components/Table';
import Title from './components/Title';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ModalWindow />
      <Title />
      <Form />
      <Table />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </Provider>
  );
}

export default App;

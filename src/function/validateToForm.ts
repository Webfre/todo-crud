import { IStatus, IValue } from '../interface/index';

function validateToForm(value: IValue, status: IStatus) {
  if (value.title === '') {
    return 'title';
  } else if (value.author === '') {
    return 'author';
  } else if (!status.classic && !status.express && !status.next) {
    return 'status';
  } else {
    return '';
  }
}

export default validateToForm;

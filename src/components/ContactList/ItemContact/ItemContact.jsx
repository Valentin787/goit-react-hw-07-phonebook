import PropTypes from 'prop-types';
import s from './ItemContact.module.css';

const ItemContact = ({
  onDeleteContact,
  name,
  number,
  id}) => {

  return (
    <li className={s.item} id={id}>
      {name}: {number}
      <button
        className={s.btnDel}
        onClick={onDeleteContact}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

ItemContact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDeleteContact: PropTypes.func,
  id:PropTypes.string,
};

export default ItemContact;


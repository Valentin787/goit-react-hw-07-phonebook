import PropTypes from 'prop-types';
import ItemContact from './ItemContact';
import s from './ContactList.module.css';

const ContactList = ({onDeleteContact,filterContactsName}) => {

  return (
    <ul className={s.list}>
      {filterContactsName && filterContactsName.map(({ id, name, number }) => {
        return (
          <ItemContact
            id={id}
            key={id}
            name={name}
            number={number}
            onDeleteContact={()=>onDeleteContact(id)}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  filterContactsName: PropTypes.array,
};

export default ContactList;

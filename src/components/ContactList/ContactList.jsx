import PropTypes from 'prop-types';
import ItemContact from './ItemContact';
import s from './ContactList.module.css';
// import { useSelector } from 'react-redux';

const ContactList = ({onDeleteContact,filterContactsName}) => {
  
  // const contactsBook = useSelector((state) => state.contacts.item)
  // const filterBookContacts = useSelector((state) => state.contacts.filter)
  

  // const filterContacts = word => {
   
  //   const arrayFilter = contactsBook.filter(({ name }) =>
  //     name.toLowerCase().includes(word),
  //   );
  //   return arrayFilter;
  // };
  

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
  // normalizeName: PropTypes.func,
};

export default ContactList;

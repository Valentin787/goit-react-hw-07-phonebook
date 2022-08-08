import { useEffect,useState,useCallback,useMemo} from 'react';
import { useDispatch,useSelector } from 'react-redux';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Loader from '../../common/Loader';

import { getContacts,addContact, deleteContact  } from 'redux/phoneBook/operation';
import { filterContacts } from 'redux/phoneBook/phoneBookActions';
import { contactsState, filterPhoneBook, loadingSelector } from '../../redux/phoneBook/phonebook-selectors'

import { ToastContainer,toast } from 'react-toastify/dist/react-toastify';
import "react-toastify/dist/ReactToastify.css";

import s from './App.module.css';

const App = () => {

  const loading = useSelector(loadingSelector);
  const contactsBook = useSelector(contactsState);
  const filterValueName = useSelector(filterPhoneBook);
  const dispatch = useDispatch();

  const [newContact, setNewContact] = useState(null);
  const [deleteContactId, setDeleteContactId] = useState(null);

  //GET_CONTACTS

  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch])
  
  //ADD_CONTACT
  const confirmContact = (contact) => setNewContact(contact);

  useEffect(() => {
    if (!newContact) return;
    const isHaveName = contactsBook.some(({ name }) => name === newContact.name);

    if (isHaveName) {
      toast.error(`Контакт з ${newContact.name} вже існує :((`, { icon: `❌` });
      setNewContact(null);
    }
    if (!isHaveName) {
      dispatch(addContact(newContact));
      toast.success(`Контакт  ${newContact.name} добавлено до списку контактів :))`, {
        icon: `✅`
      });
      setNewContact(null);
    }
  }, [contactsBook, dispatch, newContact]);

  // FILTER CITY

  const filterChangeInput = (value) => dispatch(filterContacts(value))
  
  //Варіант з хуком USE MEMO
  const filterContactsName = useMemo(() => {
    const normalizedFilter = filterValueName.toLowerCase();

    const finalArray = contactsBook && contactsBook.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));

    if (finalArray.length === 0 && filterValueName !== "") {
      toast.info(`Усі контакти по запиту "${filterValueName.toUpperCase()}" були видалені ...✋!!`)
      toast.warning(`Очистіть поле для запиту, щоб побачити усі контакти :)))`)
      // dispatch(filterContacts(""))
    }
    return finalArray;
  }, [contactsBook, filterValueName]);
  
  //DELETE_CONTACT 

  const onDeleteContact = useCallback((id) => setDeleteContactId(id),[]);

  useEffect(() => {
    if (!deleteContactId) return;
    dispatch(deleteContact(deleteContactId));
    toast.success(`Контакт видалений зі списку контактів :))`, {
        icon: `❎`
      });
    setDeleteContactId(null);

  }, [deleteContactId, dispatch])
  
  
 
  const normalizeName = name => name
      .split(' ')
      .map(word => {
        const firstUpCaseLetter = word.charAt(0).toUpperCase();
        const anoterLetter = word.substring(1);
        return `${firstUpCaseLetter}${anoterLetter}`;
      })
      .join(' ');

  return (
    <>
      {loading && <Loader loading={loading}/>}
      <div className={s.app}>
      
      {<ContactForm
        confirmContact={confirmContact}
        normalizeName={normalizeName}
      />}
    {contactsBook.length > 0 && (
        <Filter
          filterChangeInput={filterChangeInput}
          value={filterValueName}
      />
  )}
    {!contactsBook.length && !loading && <p>Please, add contact!</p>}
      <ContactList
        filterContactsName={filterContactsName}
        onDeleteContact={onDeleteContact}
      />
      <ToastContainer theme="dark"/>
    </div>
    </>
    

  );
};


const memoize = fn => {
  const cashe = {};

  return (...args) => {
    console.log(`-------------------------`);
    console.log(`arg->>`, args);
    const stringifiedArgs = JSON.stringify(args);
    console.log(`stringifiedArgs->>>`, stringifiedArgs);
    console.log(`cashe ->>>`, cashe);
    if (cashe[stringifiedArgs]) {
      return cashe[stringifiedArgs];
    }

    cashe[stringifiedArgs] = fn(...args);

    return cashe[stringifiedArgs]
  }
}

const multiply = (a, b, c) => {
  console.log(`multiply`);
  return a * b * c;
}

const add = (a, b, c) => {
  console.log(`add`);
  return a + b + c;
}

const memoizeMultiply = memoize(multiply);
const memoizeAdd = memoize(add);

console.log(memoizeMultiply(1, 2, 3));
console.log(memoizeMultiply(2, 3, 4));

console.log(memoizeAdd(1, 2, 3));
console.log(memoizeAdd(2, 3, 4));

console.log(memoizeMultiply(1, 2, 3));
console.log(memoizeMultiply(2, 3, 4));

console.log(memoizeAdd(1, 2, 3));
console.log(memoizeAdd(2, 3, 4));

export default App;

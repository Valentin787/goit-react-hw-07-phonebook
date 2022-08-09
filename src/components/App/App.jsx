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
  
  
 
  // const normalizeName = name => name
  //     .split(' ')
  //     .map(word => {
  //       const firstUpCaseLetter = word.charAt(0).toUpperCase();
  //       const anoterLetter = word.substring(1);
  //       return `${firstUpCaseLetter}${anoterLetter}`;
  //     })
  //     .join(' ');

  return (
    <>
      {loading && <Loader loading={loading}/>}
      <div className={s.app}>
      
      {<ContactForm
        confirmContact={confirmContact}
        // normalizeName={normalizeName}
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




export default App;

// const salaries1 = {
// Manager: { salary: 1000, tax: "10%" },
// Designer: { salary: 600, tax: "30%" },
// Artist: { salary: 1500, tax: "15%" },}
// const team1 = [
// { name: "Misha", specialization: "Manager" },
// { name: "Max", specialization: "Designer" },
// { name: "Vova", specialization: "Designer"},
// { name: "Leo", specialization: "Artist"},]

// const calculateTeamFinanceReport = (salaries, team) => {

//   // let arr = [];
//   let name = [];
//   let totalBudgetTeam = 0;
//   let totalBudgetManager = 0;
//   let totalBudgetDesigner = 0;
//   let totalBudgetArtist = 0;


//   // arr[objName] = objValue;
  
//   const objValues = Object.keys(salaries1)
//   const arr = objValues.map(item => [item])
//   // console.log(arr);

//   const array = team1.map(item => {
//     console.log(item.specialization === salaries1.Manager);
//     if(item.specialization === "Designer"){
//       return name.push(item.name)
//     }
//     if else()
//     console.log(name);
//   })
  
//   // const manager = team1.map(item => {
//   //   if (item.specialization === arr[0]) {
//   //     salaries1.Manager.salary + salaries1.Manager.salary
//   //   }
//   //   console.log(item);
//   // })
//   const objEntries = Object.entries(salaries1);
//   // console.log(objEntries);

  
  
// }


// const financeReport1 = calculateTeamFinanceReport(salaries1, team1)
// console.log(JSON.stringify(financeReport1))


// {
// totalBudgetTeam: 3398, // total salaries with tax of entire team; should be integer
// (truncate the fractional part after all calculations)
// totalBudgetProgger: 1176, // total salaries with tax for all members by 'Progger'
// specialization; should be integer (truncate the fractional part after all calculations)
// totalBudgetTester: 2222, // total salaries with tax for all members by 'Tester'
// specialization; should be integer (truncate the fractional part after all calculations)
// import {useDispatch, useSelector} from 'react-redux'
// import {contactsState} from '../../redux/phoneBook/phonebook-selectors'
import { useState } from 'react';
import Input from '../../common/Input';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';


const ContactForm = ({confirmContact,normalizeName}) => {
  // const isLoading = useSelector((state) =>  state.contacts.isLoading)
 
  // const contactsBook = useSelector(contactsState);
  // console.log(contactsState());
  // const dispatch = useDispatch()

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const [dataForm, setdataForm] = useState({
  //   name: '',
  //   number: '',
   
  // });
  // const addName = (e) => setName(e.target.value);
  // const addNumber = (e) => setNumber(e.target.value);

  // const addDataForm = e => {
  //   return setdataForm(prevState => {
  //     // console.log('prevState->>',prevState);
  //     // return {
  //     //   ...prevState, [e.target.name]: e.target.value,
  //     return {[e.target.name]: e.target.value,
  //   }});
  // };

  // console.log('dataForm', dataForm);
  const onSubFormData = e => {
    e.preventDefault();

    const objData = {
      id: nanoid(),
      name:normalizeName(name),
      number
    };

    confirmContact(objData);
    resetForm();

  };
  const resetForm = () => {
    setName('');
    setNumber('');
  }
    // setdataForm({
    //   name: '',
    //   number: '',
    // }
  
  // const { name, number } = dataForm;
  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={onSubFormData} className={s.form}>
      <Input
        label="Name"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <Input
        label="Number"
        type="tel"
        name="number"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={s.btnAdd}>
        {' '}
        Add contact
      </button>
      {/* {isLoading && <h3>Loading ...</h3>} */}
      </form>
      <h2>Contacts</h2>
    </>

  );
};

export default ContactForm;


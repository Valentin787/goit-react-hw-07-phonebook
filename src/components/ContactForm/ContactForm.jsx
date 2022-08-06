import { useState } from 'react';
import Input from '../../common/Input';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';


const ContactForm = ({confirmContact,normalizeName}) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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
      </form>
      <h2>Contacts</h2>
    </>

  );
};

export default ContactForm;


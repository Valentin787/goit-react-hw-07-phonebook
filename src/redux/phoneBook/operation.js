import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, saveItem, deleteItem } from '../../utils/api-fetch';

const API_ENDPOINT = "/contacts";

const getContacts = createAsyncThunk('contacts/getContactsStatus', () => getItems(API_ENDPOINT)
);

const addContact = createAsyncThunk('contact/addContactStatus', (newDepartment) => saveItem(API_ENDPOINT, newDepartment));

const deleteContact = createAsyncThunk('contact/deleteContactStatus', (deleteDepartment) => deleteItem(API_ENDPOINT, deleteDepartment)
);
export { getContacts,addContact,deleteContact };


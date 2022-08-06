import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import { filterContacts } from 'redux/phoneBook/phoneBookActions';
// import {contactsState,filterPhoneBook} from '../../redux/phoneBook/phonebook-selectors'

import Input from '../../common/Input';

function Filter({filterChangeInput,value}) {
  // const [filterValue, setFilterValue] = useState("");

  // const zeroContact = useSelector(contactsState);
  // const filterValue = useSelector(filterPhoneBook);

  // const dispatch = useDispatch()
  // const getFilterValue = () => dispatch(filterContacts(filterValue));
  // getFilterValue()
  

  return (
    <Input
      label="Find contacts by name"
      type="text"
      onChange={(event)=>filterChangeInput(event.target.value)}
      // onChange={(event)=>dispatch(filterContacts(event.target.value))}
      name="filter"
      value={value}
    />
  );
}

Filter.propTypes = {
  onChangeDate: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/slice';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import {
  ContactFofmSection,
  Fofm,
  FormLabel,
  FormInput,
  FormBtn,
} from './ContactForm.stysed';

function PhoneBookForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const contactNameId = nanoid();
  const contactTellId = nanoid();

  const findName = name => {
    return contacts.find(contact => {
      const nameInContacts = contact.name.toLocaleLowerCase();
      const newName = name.toLocaleLowerCase();
      return nameInContacts === newName;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const addName = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };
    if (findName(form.elements.name.value)) {
      return Report.failure(
        'Something went wrong',
        'This name is already in the contact list!',
        'Okay'
      );
    } else {
      dispatch(addContact(addName));
      form.reset();
    }
  };

  return (
    <ContactFofmSection>
      <Fofm onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor={contactNameId}>Name</FormLabel>
          <FormInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={contactNameId}
          />
        </div>
        <div>
          <FormLabel htmlFor={contactTellId}>Number</FormLabel>
          <FormInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={contactTellId}
          />
        </div>
        <FormBtn type="submit">Add contact</FormBtn>
      </Fofm>
    </ContactFofmSection>
  );
}

export default PhoneBookForm;

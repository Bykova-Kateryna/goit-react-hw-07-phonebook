import React from 'react';
import PhoneBookForm from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

export default function PhoneBookSection() {
  return (
    <>
      <h1>Phonebook</h1>
      <PhoneBookForm />
      <div>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </>
  );
}

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { useEffect } from 'react';
import {
  ContactListSection,
  ContactListItem,
  DeleteBtn,
} from './ContactList.styled';
import { fetchContacts } from '../../redux/operations';
import { Loader } from '../Loader/Loader';

export const ContactList = () => {
  const contacts = useSelector(state => state.phonebook.items);
  const loading = useSelector(state => state.phonebook.isLoading);
  const error = useSelector(state => state.phonebook.error);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedNameFilter = filter.toLocaleLowerCase();
    const filteredName = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const filterResult = normalizedName.includes(normalizedNameFilter);
      return filterResult;
    });
    return filteredName;
  };

  return (
    <>
      {loading && <Loader />}
      {error && <p>oops, something went wrong</p>}
      <ContactListSection>
        {contacts.length !== 0 &&
          filterContacts().map(item => (
            <ContactListItem key={item.id}>
              {item.name}: {item.phone}
              <DeleteBtn
                type="button"
                onClick={() => {
                  dispatch(deleteContact(item.id));
                }}
              >
                Delete
              </DeleteBtn>
            </ContactListItem>
          ))}
      </ContactListSection>
    </>
  );
};

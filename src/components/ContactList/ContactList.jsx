import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { useEffect } from 'react';
import {
  ContactListSection,
  ContactListItem,
  DeleteBtn,
  ErrorMesage,
  ContactListItemContext,
} from './ContactList.styled';
import { fetchContacts } from '../../redux/operations';
import { Loader } from '../Loader/Loader';
import { LoaderFromButtonDelete } from '../Loader/LoaderFromButtonDelete';

export const ContactList = () => {
  const contacts = useSelector(state => state.phonebook.items);
  const loading = useSelector(state => state.phonebook.isLoading);
  const error = useSelector(state => state.phonebook.error);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const actionType = useSelector(state => state.phonebook.actionTypeStatus);
  console.log(actionType);

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
      {loading && actionType === 'contacts/fetchAll/pending' && <Loader />}
      {error && (
        <ErrorMesage>oops, something went wrong, change the side.</ErrorMesage>
      )}
      <ContactListSection>
        {contacts.length !== 0 &&
          filterContacts().map(item => (
            <ContactListItem key={item.id}>
              <ContactListItemContext>
                {item.name}: {item.phone}
              </ContactListItemContext>
              {loading && actionType === 'contacts/deleteContact/pending' ? (
                <LoaderFromButtonDelete />
              ) : (
                <DeleteBtn
                  type="button"
                  onClick={() => {
                    dispatch(deleteContact(item.id));
                  }}
                >
                  Delete
                </DeleteBtn>
              )}
            </ContactListItem>
          ))}
      </ContactListSection>
    </>
  );
};

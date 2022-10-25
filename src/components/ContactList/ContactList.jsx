import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/slice';

import {
  ContactListSection,
  ContactListItem,
  DeleteBtn,
} from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

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
    <ContactListSection>
      {contacts.length !== 0 &&
        filterContacts().map(item => (
          <ContactListItem key={item.id}>
            {item.name}: {item.number}
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
  );
};

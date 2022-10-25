import { useDispatch } from 'react-redux';
import { filterContact } from '../../redux/slice';
import { nanoid } from 'nanoid';
import {
  FilterSection,
  FilterSectionLabel,
  FilterSectionInput,
} from './Filter.styled';

const contactFindId = nanoid();

export const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = event => {
    dispatch(filterContact(event.currentTarget.value));
  };
  return (
    <FilterSection>
      <FilterSectionLabel htmlFor={contactFindId}>
        Find contacts by name
      </FilterSectionLabel>
      <FilterSectionInput
        type="text"
        name="filter"
        id={contactFindId}
        onChange={handleChange}
      />
    </FilterSection>
  );
};

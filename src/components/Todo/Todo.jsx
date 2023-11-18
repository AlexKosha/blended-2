import { useState } from 'react';
import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, count, onDeleteClick, id, onChange }) => {
  const [changedText, setChangedText] = useState(text);

  const onChangeButtonClick = () => {
    onChange(id, changedText);
  };

  const handelChange = e => {
    setChangedText(e.currentTarget.value);
  };
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{count}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => onDeleteClick(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={onChangeButtonClick}>
        <RiEdit2Line size={24} />
      </EditButton>
      <input type="text" onChange={handelChange} value={changedText} />
    </TodoWrapper>
  );
};

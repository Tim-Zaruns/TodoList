import { useState } from 'react';
import Input from '../components/Input';

type TodoType = {
  title: string,
  complete: boolean,
}

const ToDoes = () => {
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState<TodoType[]>([]);

  const clickHandler = () => {
    setToDoList([...toDoList, { title: inputValue, complete: false }]);
  };

  const removeHandler = (i: number) => {
    const clickedList = toDoList[i];
    const RemoveItemFromToDoes = toDoList.filter((list) => (
      list !== clickedList
    ));
    setToDoList(RemoveItemFromToDoes);
  };

  return (
    <div>
      <button onClick={clickHandler}>ADD</button>
      <Input inputValue={inputValue} onChange={setInputValue} />
      {toDoList.map((item, index) => (
        <div key={item.title}>
          <span>{item.title}</span>
          <button onClick={() => removeHandler(index)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default ToDoes;

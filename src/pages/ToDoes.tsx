import { useState } from 'react';
import Input from '../components/Input';
import Checkbox from '../components/checkbox';
import './todo.scss';

type TodoType = {
  title: string,
  complete: boolean,
  edit: boolean,
  tags: {
    today: boolean,
    thisWeek: boolean,
    thisMonth: boolean
  }
};

const ToDoes = () => {
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState<TodoType[]>([]);
  const [completedTodoList, setCompletedTodoList] = useState<boolean>(false);
  const [editedInputValue, setEditedInputValue] = useState('');
  const [tagValue, setTagValue] = useState('');

  const clickHandler = () => {
    setToDoList([...toDoList, {
      title: inputValue, complete: false, edit: false, tags: { today: false, thisMonth: false, thisWeek: false },
    }]);
    setInputValue('');
  };

  const removeHandler = (index: number) => {
    const filteredToDos = toDoList.filter((_, i) => (
      i !== index
    ));
    setToDoList(filteredToDos);
  };

  const toggleCompletedTask = (index: number) => {
    const clonedList = [...toDoList];
    clonedList[index].complete = !clonedList[index].complete;
    setToDoList(clonedList);
  };

  const editTask = (index: number) => {
    const clonedList = [...toDoList];
    clonedList[index].edit = !clonedList[index].edit;
    setToDoList(clonedList);
  };

  const changeTaskInfo = (index: number) => {
    const clonedList = [...toDoList];
    clonedList[index].title = editedInputValue;
    setToDoList(clonedList);
    setEditedInputValue('');
  };

  return (
    <div>
      <span>show Completed Tasks</span>
      <Checkbox
        checkboxValue={completedTodoList}
        onChange={setCompletedTodoList}
      />
      <Input
        inputValue={inputValue}
        onChange={setInputValue}
      />
      <button
        onClick={clickHandler}
        className="button"
      >
        ADD
      </button>
      <div className="todo__wrapper">
        {toDoList.filter((list) => list.complete || !completedTodoList)
          .map((item, index) => (
            <div key={item.title} className="todo">
              <div>
                {!item.edit ? item.title
                  : (
                    <div>
                      <Input inputValue={editedInputValue} onChange={setEditedInputValue} />
                      <button onClick={() => changeTaskInfo(index)}>Edit</button>
                      <select value={tagValue} onChange={(e) => setTagValue(e.target.value)}>
                        <option value="thisMonth">This Month</option>
                        <option value="today">Today</option>
                        <option value="thisWeek">This Week</option>
                      </select>
                    </div>
                  )}
              </div>
              <div className="todo__completed">
                <span>completed</span>
                <Checkbox
                  checkboxValue={item.complete}
                  onChange={() => toggleCompletedTask(index)}
                />
                <button
                  onClick={() => removeHandler(index)}
                >
                  x
                </button>
                <button onClick={() => editTask(index)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDoes;

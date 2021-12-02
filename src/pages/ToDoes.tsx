import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Progress } from 'antd';
import Input from '../components/Input';
import Checkbox from '../components/checkbox';
import './todo.scss';
import 'antd/dist/antd.css';

type TodoType = {
  title: string,
  complete: boolean,
  edit: boolean,
  tags: string;
};

const ToDoes = () => {
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState<TodoType[]>([]);
  const [completedTodoList, setCompletedTodoList] = useState<boolean>(false);
  const [editedTaskInputValue, setEditedTaskInputValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [search, setSearch] = useState('');

  const addNewTask = () => {
    setToDoList([...toDoList, {
      title: inputValue, complete: false, edit: false, tags: '',
    }]);
    setInputValue('');
  };

  useEffect(() => {
    const Tasks = localStorage.getItem('Tasks');
    if (Tasks) {
      setToDoList(JSON.parse(Tasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(toDoList));
  }, [toDoList]);

  const removeCurrentTask = (index: number) => {
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
    clonedList[index].title = editedTaskInputValue;
    clonedList[index].edit = !clonedList[index].edit;
    clonedList[index].tags = tagValue;
    setTagValue('');
    setToDoList(clonedList);
    setEditedTaskInputValue('');
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
        placeholder="...Add new task"
      />
      <button
        onClick={addNewTask}
        className="button"
      >
        ADD
      </button>
      <button onClick={() => setToDoList([])}>
        Clear All
      </button>
      <div>
        <Input inputValue={search} onChange={setSearch} placeholder="...Search by tag" />
      </div>
      <div className="todo__wrapper">
        <div>
          <Progress
            percent={Math.floor((100 / toDoList.length) * toDoList.filter((list) => list.complete).length)}
            size="small"
          />
        </div>
        {toDoList
          .filter((tagName) => (tagName.tags.toLowerCase().includes(search.toLowerCase())))
          .filter((list) => list.complete || !completedTodoList)
          .map((item, index) => (
            <div key={item.title} className="todo">
              <div>
                {!item.edit ? item.title
                  : (
                    <div>
                      <Input
                        inputValue={editedTaskInputValue}
                        onChange={setEditedTaskInputValue}
                        placeholder="...Edit current Task"
                      />
                      <button onClick={() => changeTaskInfo(index)}>Save Changes</button>
                      <select
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                      >
                        <option value="">none</option>
                        <option value="month">Month</option>
                        <option value="today">Today</option>
                        <option value="week">Week</option>
                      </select>
                    </div>
                  )}
              </div>
              <div className="todo__completed">
                <span>{item.tags ? `#${item.tags}` : ''}</span>
                <span>completed</span>
                <Checkbox
                  checkboxValue={item.complete}
                  onChange={() => toggleCompletedTask(index)}
                />
                <button
                  onClick={() => removeCurrentTask(index)}
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

import React, { useState }from 'react';
import './App.css';

function Todo(props) {
  return (
      <div style={{textDecoration: props.todo.isCompleted ? 'line-through' : ''}} className="todo">
        {props.todo.text} - {props.index}
        <div>
          <button onClick={() => props.completeTodo(props.index)}>Complete</button>
          <button onClick={() => props.removeTodo(props.index)}>X</button>
        </div>
      </div>
  );
}

function todoForm(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    props.addTodo(value);
    setValue('');
  }
  const placeholder = 'Add to do item';
  return(
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
        />
      </form>
  )
}

function App() {
  const [ todos, setTodos ] = useState([
    {
      text: 'Schedule meeting with Alex',
      isCompleted: false,
    },
    {
      text: 'onboard training',
      isCompleted: false,
    },
    {
      text: 'doing the homework',
      isCompleted: false,
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
            <Todo index={index} todo={todo} key={index} completeTodo={completeTodo} removeTodo={removeTodo}/>
        ))}
        {todoForm({addTodo})}
      </div>
    </div>
  );
}

export default App;

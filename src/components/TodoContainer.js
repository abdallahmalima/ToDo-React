import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import InputTodo from './InputTodo';
import TodosList from './TodosList';
import About from './About';
import NotMatch from './NotMatch';
import Navbar from './Navbar';
import SinglePage from './SinglePage';

const TodoContainer = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        if (!response.ok) throw Error('Error from the server');
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      }).catch((err) => {
        setError(err.message);
      });

    return () => {
      console.log('unmounted');
    };
  }, []);

  const handleChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const setUpdate = (title, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <>
    <Navbar/>
   <Routes>
          <Route exact path="/" element={
             <div className="container">
             <div className="inner">
               <Header/>
               <InputTodo
                 addTodoItem={addTodoItem}
               />
             { !isLoading && !error && <TodosList
                 todos={todos}
                 handleChange={handleChange}
                 handleDeleteTodo={handleDeleteTodo}
                 setUpdate={setUpdate}
               />}
               {error && <h4>{error}</h4>}
               {isLoading && <p>Loading.....</p>}
             </div>
             </div>
          }/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/about/:slug" element={<SinglePage />}/>
          <Route path="*" element={<NotMatch/>}/>
      </Routes>
      </>
  );
};

export default TodoContainer;

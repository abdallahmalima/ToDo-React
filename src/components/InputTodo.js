import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const InputTodo = ({ addTodoItem }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodoItem(title);
      setTitle('');
    } else {
      alert('Please write item');
    }
  };
  return (
         <form onSubmit={handleSubmit} className="form-container">
          <input
            className="input-text"
            name="title"
            type="text"
            placeholder="Add Todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="input-submit">
            <FaPlusCircle color="darkcyan" size="20px" className="submit-icon"/>
            </button>
        </form>
  );
};
export default InputTodo;
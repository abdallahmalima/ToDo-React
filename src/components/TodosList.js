import TodoItem from './TodoItem';

const TodosList = ({
  todos, handleChange, handleDeleteTodo, setUpdate,
}) => (<ul>
        {todos.map((todo) => (
            <TodoItem
            key={todo.id}
            todo={todo}
            handleChange={handleChange}
            handleDeleteTodo={handleDeleteTodo}
            setUpdate={setUpdate}
            />
        ))}
        </ul>);

export default TodosList;
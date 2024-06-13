import React from 'react';

const TaskForm = ({ newTaskTitle, setNewTaskTitle, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Adicione uma task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;

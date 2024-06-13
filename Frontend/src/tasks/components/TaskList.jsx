import React from 'react';

const TaskList = ({ tasks, handleDelete, handleToggleComplete, handleEdit }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.taskid}
          className={task.ischecked ? 'completed' : ''}
        >
          <span>{task.tasktitulo}</span>
          <div>
            <button onClick={() => handleToggleComplete(task.taskid, task.ischecked, task.tasktitulo)}>
              {task.ischecked ? 'Undo' : 'Do'}
            </button>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.taskid)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

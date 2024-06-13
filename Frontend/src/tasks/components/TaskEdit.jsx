import React from 'react';

const TaskEdit = ({ tasktitle, setEdit, handleEditSubmit, setTasktitle }) => {
  return (
    <div className='Container-Edit'>
      <div className="Title">
        <h1>Edit Task</h1>
        <button className="buttonClose" onClick={() => setEdit(false)}>
          X
        </button>
      </div>
      <form className="Form" onSubmit={handleEditSubmit}>
        <div className="inputDiv">
          <input
            type="text"
            name="task"
            id="task"
            value={tasktitle || ""}
            className="input"
            required
            onChange={(e) => {
              setTasktitle(e.target.value);
            }}
          />
          <button type="submit" className="edit">
            Save
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;

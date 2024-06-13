import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";
import toast, { Toaster } from 'react-hot-toast';

import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  editTask,
} from "../helpers/Api";

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [tasktitle, setTasktitle] = useState("");
  const [idToEdit, setIdToEdit] = useState(null);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTaskTitle.length < 4 || newTaskTitle.length > 20) {
      toast.error("Adicione uma tarefa no mínimo 4 caracteres e no máximo 20");
      return;
    }
    try {
      const newTask = { tasktitulo: newTaskTitle, ischecked: false };
      const addedTask = await addTask(newTask);
      setTasks([...tasks, addedTask]);
      toast.success('Tarefa adicionada com sucesso!!!')
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.taskid !== taskId));
      toast('❗️Tarefa deletada❗️',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (taskId, isChecked, taskTitle) => {
    try {
      const updatedTask = await updateTask(taskId, {
        tasktitulo: taskTitle,
        ischecked: !isChecked,
      });
      setTasks(
        tasks.map((task) =>
          task.taskid === taskId ? { ...task, ischecked: !isChecked } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task complete:", error);
    }
  };

  const handleEditClick = (task) => {
    setEdit(true);
    setTasktitle(task.tasktitulo);
    setIdToEdit(task.taskid);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if(tasktitle.length < 4 || tasktitle.length > 20){
      toast.error("Adicione uma tarefa no mínimo 4 caracteres e no máximo 20");
      return;
    }
    try {
      const editedTask = await editTask(idToEdit, { tasktitulo: tasktitle });
      setTasks(
        tasks.map((task) =>
          task.taskid === idToEdit ? { ...task, tasktitulo: editedTask.tasktitulo } : task
        )
      );
      setEdit(false);
      setTasktitle("");
      setIdToEdit(null);
      toast.success('Tarefa editada com sucesso!!!')
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div className="container">
        <Toaster
          position="top-center"
          reverseOrder={false}
          
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        {edit ? (
          <TaskEdit
            tasktitle={tasktitle}
            setEdit={setEdit}
            handleEditSubmit={handleEditSubmit}
            setTasktitle={setTasktitle}
          />
        ) : (
          <>
            <TaskForm
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              handleSubmit={handleSubmit}
            />
            <TaskList
              tasks={tasks}
              handleDelete={handleDelete}
              handleToggleComplete={handleToggleComplete}
              handleEdit={handleEditClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TaskApp;

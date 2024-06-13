import axiosInstance from './axiosInstance';

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axiosInstance.post('/Post', task);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`/${taskId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axiosInstance.put(`/Task/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editTask = async (taskId, editTaskData) => {
  try {
    const response = await axiosInstance.put(`/Task/${taskId}`, editTaskData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPg = "SELECT * FROM todos";
export const getPgbyId = "SELECT * FROM todos WHERE taskid = $1";
export const getMaxId = "SELECT max(taskid) FROM todos"
export const checkPgExist = "SELECT taskid FROM todos WHERE taskid = $1";
export const addPg = "INSERT INTO todos (taskid, tasktitulo, ischecked) VALUES ($1, $2, $3)";
export const removePg = "DELETE FROM todos WHERE taskid = $1";
export const updatePg = "UPDATE todos SET tasktitulo = $1, ischecked = $2 WHERE taskid = $3";
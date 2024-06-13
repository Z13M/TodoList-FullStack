import client from "../config/pg.js";
import { getPg, getPgbyId, getMaxId, checkPgExist, addPg, removePg, updatePg } from "./queries.js";
//Pega todas as Tasks
export const getTask = (req, res) => {
    client.query(getPg, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};
//Pega Task pela ID
export const getTaskbyId = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(getPgbyId, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
//Adicionar Task
export const addTask = async (req, res) => {
    const id = await client.query(getMaxId)
    const taskid = id.rows[0].max + 1
    const { tasktitulo }= req.body
    if(!tasktitulo){
        return res.send("Adicione algum valor")
    }
    client.query(checkPgExist, [taskid], (error, results) => {
        if(results.rows.length) {
            res.send("Tarefa ja existe.");
        } else { 
            client.query(addPg, [taskid, tasktitulo, false], (error, results) => {
                if (error) throw error;
                res.status(201).send({taskid, tasktitulo, ischecked:false});
            }
        )};
    });
};
//Remove Task
export const removeTask = (req,res) => {
    const { id } = req.params;

    client.query(getPgbyId, [ id ], (err,results) => {
        const notTaskFound = !results.rows.length;
        if(notTaskFound){
            res.send("NENHUMA TAREFA ENCONTRADA! Não pode removela");
        }else{
            client.query(removePg, [id], (err,results) => {
                if(err) throw err;
                res.send("TAREFA DELETADA COM SUCESSO!!")
            });
        };
    });
};

export const updateTask = (req, res) => {
    const { id } = req.params;
    let { tasktitulo, ischecked } = req.body;
    if (!tasktitulo) {
        return res.status(400).send("Nenhum valor adicionado");
    }
    if (tasktitulo.length < 4 || tasktitulo.length > 20) {
        return res.status(400).send("O título da tarefa deve ter entre 4 e 30 caracteres");
    }
    client.query(getPgbyId, [id], (err, results) => {
        const notTaskFound = !results.rows.length;
        let ischeckedOriginal = results.rows[0].ischecked;
        
        if (notTaskFound) {
            return res.status(404).send("Nenhuma tarefa encontrada! Não é possível fazer a edição.");
        } else {
            if (ischecked == null) {
                ischecked = ischeckedOriginal;
            }
            client.query(updatePg, [tasktitulo, ischecked, id], (err, results) => {
                if (err) {
                    return res.status(500).send("Erro ao atualizar a tarefa");
                }
                return res.status(201).send({ id, tasktitulo, ischecked });
            });
        }
    });
};

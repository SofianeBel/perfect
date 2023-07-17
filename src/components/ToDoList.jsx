import React, { useRef, useEffect, useState } from "react";
import {
  TextField,
  Button,
  ListItem,
  List,
  Checkbox,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./ToDoStyle.css";
import Menu from "./Menu";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const ref = useRef();

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    const task = taskInput.trim();
    if (task !== "") {
      const newTask = {
        task,
        completed: false,
      };
      setIsAddingTask(true);
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const setTaskCompleted = (task, index) => {
    setTasks(
      tasks.map((t, i) => {
        if (i === index) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      }),
      sendMail()
    );
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    ref.current = tasks;
  }, [tasks]);

  useEffect(() => {
    if (isAddingTask) {
      setTimeout(() => {
        setIsAddingTask(false);
      }, 1000);
    }
  }, [isAddingTask]);

  //Fonction qui permet d'envoyer un mail lorsque la tache est completer
  const sendMail = () => {
    const mail = {
      to: "Sifly789@Gmail.com",
      from: "test",
      subject: "Tache terminée",
      text: "La tache est terminée",
    };
    axios
      .post("http://localhost:3001/sendMail", mail)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Menu />
      <div className="todo-container">
        <TextField
          className="task-input"
          label="Nouvelle tâche"
          value={taskInput}
          onChange={handleTaskInputChange}
        />
        <Button
          className="add-button"
          variant="contained"
          color="primary"
          onClick={addTask}
        >
          Ajouter
        </Button>
        <List className="task-list">
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              className={`task-item ${isAddingTask ? "fade-in" : ""}`}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => setTaskCompleted(task, index)}
                color="primary"
              />
              <Typography
                variant="body1"
                className={`task-text ${task.completed ? "completed" : ""}`}
              >
                {task.task}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeTask(index)}
              >
                Supprimer
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default TodoList;

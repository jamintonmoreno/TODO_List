import React, { useState, useEffect } from "react";

//Components
import Header from "./Components/Header";
import Cardtodo from "./Components/Cardtodo";
import Loader from "./Components/Loader";

//Styles
import "../src/Styles/App.css";
import "./Styles/Header.css";
import "./Styles/Cardtodo.css";

const styles = {
  bubbleAlert: {
    backgroundColor: "#D4ECDD",
    fontSize: "1rem",
    borderRadius: "15px",
    color: "black",
    padding: "2px 10px",
    width: "10px",
    position: "relative",
    right: "20",
    dowm: "10",
  },
};

const App = () => {
  //State
  const [dataApi, setdataApi] = useState([]);
  const [copyDataApi, setCopyDataApi] = useState([]);
  const [arrayTask, setArrayTask] = useState("");

  //Effect
  useEffect(() => {
    const handleDataApi = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const result = await response.json();
      const todoList = result.slice(0, 20);
      setdataApi(todoList);
      setCopyDataApi(todoList);
    };
    handleDataApi();
  }, []);

  //Funciones
  //Manejo de estado de cada Card
  const handleCompleteTodo = (id) => {
    setdataApi(
      dataApi.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    setCopyDataApi(
      dataApi.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Funciones para filtrar las actividades segun su estado, activado por buttons
  const Alltask = () => {
    setArrayTask("All");
    setCopyDataApi(dataApi);
  };

  const filterCompleted = () => {
    setArrayTask("Completadas");
    setCopyDataApi(
      dataApi.filter((taskcomplet, index) => taskcomplet.completed)
    );
  };

  const filterUnCompleted = () => {
    setArrayTask("Incompletas");
    setCopyDataApi(dataApi.filter((taskuncomplet) => !taskuncomplet.completed));
  };

  // Estado que muestra las actividades segun la seleccion de los botones
  useEffect(() => {
    if (arrayTask === "All") {
      Alltask();
    } else if (arrayTask === "Completadas") {
      filterCompleted();
    } else if (arrayTask === "Incompletas") {
      filterUnCompleted();
    }
  }, [dataApi]);

  // Contador de las tareas segun su estado
  const cantidad = dataApi.reduce((acc, el) => acc + el.completed, 0)
  const cantidad2 = dataApi.reduce((acc, el) => acc + !el.completed, 0)

  return (
    <div className="App">
      <Header />

      <div className="butons">
        <div>
          <div className="button">
            <button className="filtro1" onClick={() => Alltask()}>
              All ToDo
            </button>
            <div className="bubble-alert">
              <span style={styles.bubbleAlert}>{dataApi.length}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="button">
            <button className="filtro3" onClick={() => filterUnCompleted()}>
              Uncompleted
            </button>
            <div className="bubble-alert">
              <span style={styles.bubbleAlert}>{cantidad2}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="button">
            <button className="filtro2" onClick={() => filterCompleted()}>
              Completed
            </button>
            <div className="bubble-alert">
              <span style={styles.bubbleAlert}>{cantidad}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="todo-conteiner">
        {copyDataApi ? (
          copyDataApi?.map((singletodo, index) => (
            <Cardtodo
              key={singletodo.id}
              title={singletodo.title}
              status={singletodo.completed}
              handleCompleteTodo={handleCompleteTodo}
              id={singletodo.id}
              index={index}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default App;

import React from "react";


const Cardtodo = ({title, status, handleCompleteTodo, id, index}) =>{
    return(
        <div className="todo-card">
           <div className="todo-title">
               <h2>{title}</h2>
            </div>
            <div className="todo-action">
                <button className={status ? "Complete":"Uncomplete"}
                onClick={() => handleCompleteTodo(id)}>
                    {status ? "Complete":"Uncomplete"}
                </button>
            </div>
        </div>
    );
}

export default Cardtodo
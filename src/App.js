import React from "react";
import "./App.css";
import TodoWrapper from "./components/TodoWrapper/TodoWrapper";

function App() {
    return (
        <div className="App">
            <h1>
                Todos
                <span role="img" aria-label="...">
                    📝
                </span>
            </h1>
            <TodoWrapper />
        </div>
    );
}

export default App;

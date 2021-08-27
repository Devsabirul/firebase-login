import React from "react";
import Form from "./component/Form";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <div className="container py-5">
        <div className="card border-0 shadow p-4 w-50 mx-auto">
          <h1 className="text-center pb-4 ">Registration Form</h1>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;

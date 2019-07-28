import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [goals, setGoals] = useState([]);
  //FETCH DATA USING REACT HOOKS
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:9000/goals");
      res
        .json()
        .then(res => setGoals(res.data))
        .catch(err => setGoals(err));
    }
    fetchData();
  }, []);

  //ADD ACTION
  const addGoals = () => {
    setGoals([...goals, { title: "", description: "" }]);
  };

  //SAVE ACTION
  const [success, setMessage] = useState("");
  const saveGoals = () => {
    fetch("http://localhost:9000/goals", {
      method: "post"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("SAving Goals...:", data);
        setMessage(data);
      });
  };

  //DELETE ACTION
  const deleteData = (item, url = "http://localhost:9000/goals/") => {
    console.log(item, "===deleting item===");
    console.log(url, "===deleting URL===");
    return fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "delete"
    })
      .then(response => response.json())
      .then(function(data) {
        console.log(data, "====deletiing goals====");
      });
  };
  return (
    <div className="goalsContainer">
      <form className="formContainer">
        {goals ? (
          goals.map(goal => (
            <>
              <div className="form-group inputTitle">
                <i className="fa fa-remove icon deleteIcon" />
                <input
                  placeholder={goal.title}
                  className="form-control"
                  type="text"
                />
              </div>
              <div class="form-group">
                <textarea
                  className="form-control rounded-0 inputDescription"
                  placeholder={goal.description}
                  rows="3"
                />
              </div>
            </>
          ))
        ) : (
          <div>No Data found...</div>
        )}
        <i className="glyphicon glyphicon-plus-sign addIcon" />
        <button type="button" className="btn addButton " onClick={addGoals}>
          Add a New Goal
        </button>
        <button type="button" className="btn saveButton" onClick={saveGoals}>
          Save
        </button>
        {success.message && (
          <div className="alert alert-success" role="alert">
            <strong>{success.message} </strong>
          </div>
        )}
      </form>
    </div>
  );
};
export default App;

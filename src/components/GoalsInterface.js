import React, { useState, useEffect } from "react";
import Goals from "./Goals";
import "../styles/GoalsInterface.css";

const GoalsInterface = () => {
  const [goals, setGoals] = useState([]);

  //Fetch Data using REACT Hooks USEEFFECT//
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

  //Action to ADD new Goal//
  const addGoals = () => {
    setGoals([...goals, { title: "New Goal", description: "" }]);
  };

  //Action to SAVE goal//
  const [success, setMessage] = useState("");
  const saveGoals = () => {
    fetch("http://localhost:9000/goals", {
      method: "post"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setMessage(data);
      });
  };

  //Action to DELETE Action//
  const deleteData = selectedGoal => {
    const updatedGoals = goals.filter(
      goal => goal.title !== selectedGoal.title
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="goalsContainer">
      <form className="formContainer">
        {goals ? (
          goals.map((goal, index) => (
            <Goals key={index} deleteData={deleteData} goal={goal} />
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

export default GoalsInterface;

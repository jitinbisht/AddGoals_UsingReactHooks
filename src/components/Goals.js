import React from "react";

const Goals = props => (
  <div>
    <div className="form-group inputTitle">
      <i
        className="fa fa-remove icon deleteIcon"
        onClick={() => props.deleteData(props.goal)}
      />
      <input
        placeholder={props.goal.title}
        className="form-control"
        type="text"
      />
    </div>
    <div className="form-group">
      <textarea
        className="form-control rounded-0 inputDescription"
        placeholder={props.goal.description}
        rows="3"
      />
    </div>
  </div>
);

export default Goals;

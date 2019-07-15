import React from "react";

export default ({ onSubmit }) => (
  <>
    <h3 className="title is-3">Create an organisation</h3>
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Organisation name"
          />
        </div>
      </div>
      <button className={"button is-primary"} type="submit">
        Create organisation
      </button>
    </form>
  </>
);

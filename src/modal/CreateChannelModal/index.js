import React from "react";

export default ({ onSubmit }) => {
  return (
    <>
      <h3 className={"title is-3"}>Create channel</h3>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label className="label">
            Channel name
            <div className="control">
              <input className="input" type="text" />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Channel purpose
            <div className="control">
              <input className="input" type="text" />
            </div>
          </label>
        </div>
        <button className={"button is-primary"} type="submit">
          Create channel
        </button>
      </form>
    </>
  );
};

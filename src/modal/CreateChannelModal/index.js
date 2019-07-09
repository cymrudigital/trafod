import React from "react";

export default ({ onSubmit }) => {
  return (
    <>
      <h2>Create channel</h2>
      <form onSubmit={onSubmit}>
        <label>
          Channel name
          <input type="text" />
        </label>
        <label>
          Channel purpose
          <input type="text" />
        </label>
        <button type="submit">Create channel</button>
      </form>
    </>
  );
};

import React from "react";

export default ({ onSubmit }) => (
  <>
    <h2>Create an organisation</h2>
    <form onSubmit={onSubmit}>
      <label htmlFor="organisationName">
        Name
        <input id="organisationName" type="text" />
      </label>
      <button type="submit">Create organisation</button>
    </form>
  </>
);

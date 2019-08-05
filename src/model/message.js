import uuid from "uuid";

export const createMessage = ({ author, text }) => ({
  id: uuid.v4(),
  timestamp: Date.now(),
  text,
  author: author.id
});

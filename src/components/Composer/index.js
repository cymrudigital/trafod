import React, { useState, useContext } from "react";
import styled from "styled-components";
import colors from "theme/colors";

import { Editor } from "slate-react";
// import { Value } from "slate";
import Plain from "slate-plain-serializer";
import UserContext from "../../context/UserContext";
import { createMessage } from "../../model/message";

const initialValue = Plain.deserialize("");

const Wrapper = styled.div`
  padding: 1em;
  display: flex;
`;

const SendButton = styled.button`
  padding: 2em;
  margin: 0 0 0 0.5em;
  border-radius: 0.5em;
`;

const StyledEditor = styled(Editor)`
  border: 1px solid ${colors.border};
  flex: 1;
`;

const Composer = ({ onMessageSent, inputRef }) => {
  const [value, setValue] = useState(initialValue);
  const { user } = useContext(UserContext);

  function handleMessageSent(value, user) {
    const message = createMessage({
      author: user,
      text: Plain.serialize(value)
    });

    if (onMessageSent) {
      onMessageSent(message);
    }

    setValue(initialValue);
  }

  return (
    <Wrapper>
      <StyledEditor
        ref={inputRef}
        placeholder="Type your message here..."
        value={value}
        onChange={({ value: newValue }) => setValue(newValue)}
      />
      <SendButton
        type="button"
        onClick={() => handleMessageSent(value, user)}
        disabled={!user}
      >
        Send
      </SendButton>
    </Wrapper>
  );
};

export default Composer;

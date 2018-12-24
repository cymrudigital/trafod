import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  // font-size: 0.8em;
`;

const Message = ({ message }) => {
  return (
    <Wrapper>
      {message.author} > {message.text}
    </Wrapper>
  );
};

export default Message;

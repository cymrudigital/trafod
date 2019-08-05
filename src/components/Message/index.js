import React from "react";
import styled from "styled-components";
import { users } from "../../initialState";

const Wrapper = styled.div`
  /* font-size: 0.8em; */
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const AvatarWrapper = styled.div`
  margin-right: 0.5em;
`;

const Timestamp = styled.span`
  color: #cecece;
  flex: 0 0 auto;
`;

const MessageTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const MessageText = styled.p`
  flex: 1 0 auto;
`;

const MessageBodyWrapper = styled.div`
  width: 100%;
`;

const Message = ({ message }) => {
  const user = users[message.author];

  return (
    <Wrapper>
      <MessageWrapper>
        <AvatarWrapper>
          <img src={user.avatar} width={42} />
        </AvatarWrapper>
        <MessageBodyWrapper>
          <strong>{user.name}</strong>
          <MessageTextWrapper>
            <MessageText>{message.text}</MessageText>
            <Timestamp>{new Date(message.timestamp).toISOString()}</Timestamp>
          </MessageTextWrapper>
        </MessageBodyWrapper>
      </MessageWrapper>
    </Wrapper>
  );
};

export default Message;

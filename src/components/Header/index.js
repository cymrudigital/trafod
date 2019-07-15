import React, { useContext } from "react";
import styled from "styled-components";
import { light } from "../../theme/colors";
import UserContext from "../../context/UserContext";

const StyledHeader = styled.div`
  background: ${light.primary};
  color: ${light.textPrimary};
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title,
  .subtitle {
    color: ${light.textPrimary};
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-right: 0.5em;
`;

const UserProfileButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
`;

const InlineButton = styled.button`
  display: flex;
  flex-direction: row-reverse;
  background: transparent;
  color: ${light.textPrimary};
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  border: 0;
`;

const ChannelDetails = ({ name, purpose }) => (
  <div>
    <h3 className={"title is-4"}>{name}</h3>
    <p className={"subtitle is-6"}>
      {purpose || "Click to edit this channel's purpose"}
    </p>
  </div>
);

export default ({ channel }) => {
  const { user, signIn, signOut } = useContext(UserContext);

  return (
    <StyledHeader>
      <ChannelDetails name={channel.name} purpose={channel.purpose} />
      <UserProfileButton>
        {user && (
          <InlineButton onClick={signOut} data-testid="btn-sign-out">
            <h4>{user.name}</h4>
            <Avatar src={user.avatar} />
          </InlineButton>
        )}
        {!user && (
          <InlineButton onClick={() => signIn()} data-testid="btn-sign-in">
            <h4>Login</h4>
          </InlineButton>
        )}
      </UserProfileButton>
    </StyledHeader>
  );
};

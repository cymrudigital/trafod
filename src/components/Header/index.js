import React from "react";
import styled from "styled-components";
import colors from "../../theme/colors";

const StyledHeader = styled.div`
  background: ${colors.darkBlue};
  color: ${colors.white};
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default props => (
  <StyledHeader>
    <h3>{props.channel.name}</h3>
    <UserProfileButton>
      <h4>Judy McDonald</h4>
      <Avatar src="https://d3iw72m71ie81c.cloudfront.net/female-75.jpg" />
    </UserProfileButton>
  </StyledHeader>
);

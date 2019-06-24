import React from "react";
import styled from "styled-components";
import colors from "theme/colors";

const Channels = styled.div`
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 1em;
  width: calc((100vw / 20) * 2);

  h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li:before {
    content: "#";
    padding-right: 0.5em;
  }
`;

const StyledAnchor = styled.a`
  color: ${colors.white};
  text-decoration: none;

  ${props => props.isActive && `color: #fff`};
`;

export default ({
  organisation,
  channels,
  onChangeChannel,
  currentChannel
}) => {
  return (
    <Channels>
      <h2>{organisation.name}</h2>
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            <StyledAnchor
              isActive={channel.id === currentChannel.id}
              href="#"
              onClick={() => onChangeChannel(channel)}
            >
              {channel.name}
            </StyledAnchor>
          </li>
        ))}
      </ul>
    </Channels>
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import { light } from "theme/colors";

const Channels = styled.div`
  background: ${light.secondary};
  color: ${light.textSecondary};
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
  color: ${light.textPrimary};
  text-decoration: none;

  ${props => props.isActive && `color: #fff`};
`;

const useCaseInsensitiveFilter = (prop = "name") => {
  const [filter, setFilter] = useState("");
  const applyFilter = obj =>
    obj[prop].toUpperCase().includes(filter.toUpperCase());
  return [filter, setFilter, applyFilter];
};

export default ({
  organisation,
  channels,
  onChangeChannel,
  currentChannel,
  children
}) => {
  const [
    channelNameFilter,
    setChannelNameFilter,
    applyChannelNameFilter
  ] = useCaseInsensitiveFilter();

  return (
    <Channels>
      <h2>{organisation.name}</h2>
      <span>
        <input
          type="text"
          onChange={e => setChannelNameFilter(e.target.value)}
          placeholder="Filter..."
          value={channelNameFilter}
        />
        <button
          onClick={() => {
            setChannelNameFilter("");
          }}
        >
          x
        </button>
      </span>
      <ul>
        {channels[organisation.id]
          .filter(applyChannelNameFilter)
          .map(channel => (
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
      {children}
    </Channels>
  );
};

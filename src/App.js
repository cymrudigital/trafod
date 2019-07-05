import React, { useState } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import colors from "./theme/colors";
import Organisations from "./components/Organisations";
import Channels from "./components/Channels";
import Composer from "./components/Composer";
import Message from "./components/Message";
import Header from "./components/Header";
import { isEmpty, first } from "lodash/fp";
import UserContext from "./context/UserContext";

const GlobalStyles = createGlobalStyle`

  body, textarea, button {
    font-family: sans-serif;
    font-size: 16px;
  }

  a {
    color: ${colors.white};
    text-decoration: none;
  }

  a:focus {
    outline: 0;
    color: #fff;
  }
`;

const HBox = styled.div`
  display: flex;
`;

const Conversation = styled.div`
  flex: 1 0 auto;
  padding: 1em;
  overflow: scroll;
  max-height: 100%;
`;

const VBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const orgs = [
  {
    id: 1,
    name: "Org A",
    backgroundImage: "https://vijayverma.co/uilogos/img/logomark/atica.png",
    lastActiveChannel: null
  },
  {
    id: 2,
    name: "Org B",
    backgroundImage: "https://vijayverma.co/uilogos/img/logomark/nira.png",
    lastActiveChannel: null
  },
  {
    id: 3,
    name: "Org C",
    backgroundImage: "https://vijayverma.co/uilogos/img/logomark/earth.png",
    lastActiveChannel: null
  }
];

const channels = {
  "Org A": [
    {
      id: 1,
      name: "Team A",
      messages: []
    },
    {
      id: 2,
      name: "Team B",
      messages: []
    },
    {
      id: 3,
      name: "Team C",
      messages: []
    }
  ],
  "Org B": [
    {
      id: 4,
      name: "Team D",
      messages: []
    },
    {
      id: 5,
      name: "Team E",
      messages: []
    }
  ],
  "Org C": [
    {
      id: 6,
      name: "Team F",
      messages: []
    },
    {
      id: 7,
      name: "Team G",
      messages: []
    },
    {
      id: 8,
      name: "Team H",
      messages: []
    }
  ]
};

const AppFn = props => {
  const [user, setUser] = useState(null);

  const defaultOrg = first(orgs);
  const [currentOrg, setCurrentOrg] = useState(defaultOrg);
  const [currentChannel, setCurrentChannel] = useState(
    currentOrg.lastActiveChannel || first(channels[currentOrg.name])
  );

  const { messages } = currentChannel;

  function signIn() {
    console.log("calling sign in");
    setUser({
      name: "Harry Potter",
      avatar:
        "https://pbs.twimg.com/profile_images/798267670881828865/u1Gp1L86.jpg"
    });
  }

  return (
    <>
      <UserContext.Provider value={{ user, signIn }}>
        <GlobalStyles />
        <HBox>
          <Organisations
            orgs={orgs}
            onChangeOrganisation={org => setCurrentOrg(org)}
          />
          <Channels
            currentChannel={currentChannel}
            organisation={currentOrg}
            channels={channels[currentOrg.name]}
            onChangeChannel={chan => setCurrentChannel(chan)}
          />
          <VBox>
            <Header channel={currentChannel} />

            <Conversation>
              {messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
              {isEmpty(messages) && <div>No messages yet</div>}
            </Conversation>
            <Composer
              onMessageSent={message => {
                setCurrentChannel({
                  ...currentChannel,
                  messages: [...currentChannel.messages, message]
                });
              }}
            />
          </VBox>
        </HBox>
      </UserContext.Provider>
    </>
  );
};

// class App extends Component {
//   state = {
//     org: first(orgs),
//     channel: first(channels[first(orgs).name])
//   };
//
//   handleChangeOrganisation = org => {
//     this.setState({
//       org,
//       channel: org.lastActiveChannel || first(channels[org.name])
//     });
//   };
//
//   handleMessageSent = message => {
//     const channel = this.state.channel;
//     channel.messages.push(message);
//     this.setState({
//       channel
//     });
//   };
//
//   handleChangeChannel = channel => {
//     const org = this.state.org;
//     org.lastActiveChannel = channel;
//     this.setState({ org, channel });
//   };
//
//   render() {
//     const { messages } = this.state.channel;
//
//     return (
//       <HBox>
//         <Organisations
//           orgs={orgs}
//           onChangeOrganisation={this.handleChangeOrganisation}
//         />
//         <Channels
//           currentChannel={this.state.channel}
//           organisation={this.state.org}
//           channels={channels[this.state.org.name]}
//           onChangeChannel={this.handleChangeChannel}
//         />
//         <VBox>
//           <Header channel={this.state.channel} />
//           <Conversation>
//             {messages.map(message => (
//               <Message key={message.id} message={message} />
//             ))}
//             {isEmpty(messages) && <div>No messages yet</div>}
//           </Conversation>
//           <Composer onMessageSent={this.handleMessageSent} />
//         </VBox>
//       </HBox>
//     );
//   }
// }

export default AppFn;

import React, { useState, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import Organisations from "./components/Organisations";
import Channels from "./components/Channels";
import Composer from "./components/Composer";
import Message from "./components/Message";
import Header from "./components/Header";
import { isEmpty, first } from "lodash/fp";
import UserContext from "./context/UserContext";
import { GlobalStyles } from "./GlobalStyles";
import Modal from "react-modal";
import CreateOrgModal from "./modal/CreateOrgModal";
import { orgs, channels } from "./initialState";
import CreateChannelModal from "./modal/CreateChannelModal";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

const HBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
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

const MODAL_CREATE_CHANNEL = "MODAL_CREATE_CHANNEL";
const MODAL_CREATE_ORG = "MODAL_CREATE_ORG";

const NoMessagesInChannel = ({ channelName, composerRef }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    }}
  >
    <p>
      There are no messages in <strong>{channelName}</strong> yet.
    </p>
    <button
      className="button"
      type="button"
      onClick={() => {
        if (composerRef.current) {
          composerRef.current.focus();
        }
      }}
    >
      Start the conversation
    </button>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);

  const defaultOrg = first(orgs);
  const [currentOrg, setCurrentOrg] = useState(defaultOrg);
  const [currentChannel, setCurrentChannel] = useState(
    currentOrg.lastActiveChannel || first(channels[currentOrg.name])
  );

  const [openModalDialog, setOpenModalDialog] = useState(null);

  const composerRef = useRef(null);

  function signOut() {
    setUser(null);
  }

  function signIn() {
    setUser({
      name: "Harry Potter",
      avatar:
        "https://pbs.twimg.com/profile_images/798267670881828865/u1Gp1L86.jpg"
    });
  }

  function handleCreateOrg(e) {
    e.preventDefault();
    setOpenModalDialog(null);
  }

  function handleChangeOrg(org) {
    setCurrentOrg(org);
    console.log(currentOrg);

    const nextChannel = org.lastActiveChannel || first(channels[org.name]);
    setCurrentChannel(nextChannel);
  }

  function handleChannelChange(channel) {
    setCurrentChannel(channel);
    setCurrentOrg({
      ...currentOrg,
      lastActiveChannel: channel.name
    });
  }

  return (
    <>
      <UserContext.Provider value={{ user, signIn, signOut }}>
        <GlobalStyles />

        <HBox>
          <Organisations
            orgs={orgs}
            onChangeOrganisation={org => handleChangeOrg(org)}
            onAddOrgClicked={() => setOpenModalDialog(MODAL_CREATE_ORG)}
          />
          <Channels
            currentChannel={currentChannel}
            organisation={currentOrg}
            channels={channels[currentOrg.name]}
            onChangeChannel={chan => handleChannelChange(chan)}
          >
            <button
              className="button is-link"
              onClick={() => setOpenModalDialog(MODAL_CREATE_CHANNEL)}
            >
              Create channel
            </button>
          </Channels>
          <VBox>
            <Header channel={currentChannel} />

            <Conversation>
              {currentChannel.messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
              {isEmpty(currentChannel.messages) && (
                <NoMessagesInChannel
                  channelName={currentChannel.name}
                  composerRef={composerRef}
                />
              )}
            </Conversation>

            <Composer
              onMessageSent={message => {
                setCurrentChannel({
                  ...currentChannel,
                  messages: [...currentChannel.messages, message]
                });
              }}
              inputRef={composerRef}
            />
          </VBox>
        </HBox>
        <Modal
          isOpen={openModalDialog === MODAL_CREATE_ORG}
          onRequestClose={() => setOpenModalDialog(null)}
          shouldCloseOnOverlayClick={true}
        >
          <CreateOrgModal onSubmit={e => handleCreateOrg(e)} />
        </Modal>
        <Modal
          isOpen={openModalDialog === MODAL_CREATE_CHANNEL}
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => setOpenModalDialog(null)}
        >
          <CreateChannelModal onSubmit={() => setOpenModalDialog(null)} />
        </Modal>
      </UserContext.Provider>
    </>
  );
};

export default App;

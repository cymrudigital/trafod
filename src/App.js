import React, { useState } from "react";
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

const MODAL_CREATE_CHANNEL = "MODAL_CREATE_CHANNEL";
const MODAL_CREATE_ORG = "MODAL_CREATE_ORG";

const App = props => {
  const [user, setUser] = useState(null);

  const defaultOrg = first(orgs);
  const [currentOrg, setCurrentOrg] = useState(defaultOrg);
  const [currentChannel, setCurrentChannel] = useState(
    currentOrg.lastActiveChannel || first(channels[currentOrg.name])
  );

  const [openModalDialog, setOpenModalDialog] = useState(null);

  function signOut() {
    setUser(null);
  }

  function signIn() {
    console.log("calling sign in");
    setUser({
      name: "Harry Potter",
      avatar:
        "https://pbs.twimg.com/profile_images/798267670881828865/u1Gp1L86.jpg"
    });
  }

  function handleCreateOrg(e) {
    e.preventDefault();
    console.log(e);
    setOpenModalDialog(null);
  }

  return (
    <>
      <UserContext.Provider value={{ user, signIn, signOut }}>
        <GlobalStyles />
        <HBox>
          <Organisations
            orgs={orgs}
            onChangeOrganisation={org => setCurrentOrg(org)}
            onAddOrgClicked={() => setOpenModalDialog(MODAL_CREATE_ORG)}
          />
          <Channels
            currentChannel={currentChannel}
            organisation={currentOrg}
            channels={channels[currentOrg.name]}
            onChangeChannel={chan => setCurrentChannel(chan)}
          >
            <button onClick={() => setOpenModalDialog(MODAL_CREATE_CHANNEL)}>
              Create organisation
            </button>
          </Channels>
          <VBox>
            <Header channel={currentChannel} />

            <Conversation>
              {currentChannel.messages.map(message => (
                <Message key={message.id} message={message} />
              ))}
              {isEmpty(currentChannel.messages) && <div>No messages yet</div>}
            </Conversation>

            <Composer
              onMessageSent={message => {
                currentChannel.messages.push(message);
              }}
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
          <CreateChannelModal onSubmit={e => handleCreateOrg(e)} />
        </Modal>
      </UserContext.Provider>
    </>
  );
};

export default App;

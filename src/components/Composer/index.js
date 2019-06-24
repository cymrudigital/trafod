import React from "react";
import styled from "styled-components";
import colors from "theme/colors";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";

import { Editor } from "slate-react";
// import { Value } from "slate";
import Plain from "slate-plain-serializer";

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
class Composer extends React.Component {
  static propTypes = {
    onMessageSent: PropTypes.func
  };

  state = {
    value: initialValue
  };

  handleChange = ({ value }) => {
    this.setState({
      value
    });
  };

  handleMessageSent = () => {
    const message = {
      id: uuidv1(),
      timestamp: Date.now(),
      text: Plain.serialize(this.state.value),
      author: "samiwel"
    };

    if (this.props.onMessageSent) {
      this.props.onMessageSent(message);
    }

    this.setState({
      value: initialValue
    });
  };

  render() {
    return (
      <Wrapper>
        <StyledEditor
          placeholder="Type your message here..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <SendButton type="button" onClick={this.handleMessageSent}>
          Send
        </SendButton>
      </Wrapper>
    );
  }
}

export default Composer;

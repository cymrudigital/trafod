import React, { useState, useContext } from "react";
import styled from "styled-components";
import colors from "theme/colors";
import uuidv1 from "uuid/v1";

import { Editor } from "slate-react";
// import { Value } from "slate";
import Plain from "slate-plain-serializer";
import UserContext from "../../context/UserContext";

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

const Composer = ({ onMessageSent }) => {
  const [value, setValue] = useState(initialValue);
  const { user } = useContext(UserContext);

  function handleMessageSent(value, user) {
    const message = {
      id: uuidv1(),
      timestamp: Date.now(),
      text: Plain.serialize(value),
      author: user.name
    };

    if (onMessageSent) {
      onMessageSent(message);
    }

    setValue(initialValue);
  }

  return (
    <Wrapper>
      <StyledEditor
        placeholder="Type your message here..."
        value={value}
        onChange={({ value: newValue }) => setValue(newValue)}
      />
      <SendButton
        type="button"
        onClick={() => handleMessageSent(value, user)}
        disabled={!user}
      >
        Send
      </SendButton>
    </Wrapper>
  );
};
// class Composer extends React.Component {
//   static propTypes = {
//     onMessageSent: PropTypes.func
//   };

//   state = {
//     value: initialValue
//   };

//   handleChange = ({ value }) => {
//     this.setState({
//       value
//     });
//   };

//   handleMessageSent = () => {
//     const message = {
//       id: uuidv1(),
//       timestamp: Date.now(),
//       text: Plain.serialize(this.state.value),
//       author: "samiwel"
//     };

//     if (this.props.onMessageSent) {
//       this.props.onMessageSent(message);
//     }

//     this.setState({
//       value: initialValue
//     });
//   };

//   render() {
//     return (
//       <Wrapper>
//         <StyledEditor
//           placeholder="Type your message here..."
//           value={this.state.value}
//           onChange={this.handleChange}
//         />
//         <SendButton
//           type="button"
//           onClick={this.handleMessageSent}
//           disabled={!user}
//         >
//           Send
//         </SendButton>
//       </Wrapper>
//     );
//   }
// }

export default Composer;

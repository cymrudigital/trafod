import React from "react";
import styled from "styled-components";
import colors from "../../theme/colors";
import ReactTooltip from "react-tooltip";

export const Organisation = styled.button`
  width: 3em;
  height: 3em;
  border: 1px solid ${colors.white};
  border-radius: 8px;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${props =>
    props.backgroundImage &&
    `background: url(${props.backgroundImage}) no-repeat`};
  ${props => props.backgroundImage && `background-size: cover;`};
`;

const OrganisationList = styled.div`
  background: ${colors.darkBlue};
  padding: 1em;
  height: calc(100vh - 2em);
  color: ${colors.white};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      width: 4em;
      height: 4em;
      border: 1px solid ${colors.white};
      border-radius: 8px;
      margin-bottom: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    li:focus-within {
      border-color: #fff;
    }

    li:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Organisations = ({ orgs, onChangeOrganisation }) => {
  return (
    <OrganisationList>
      {orgs.map(org => (
        <Organisation
          key={org.id}
          data-tip={org.name}
          onClick={function() {
            onChangeOrganisation(org);
          }}
          backgroundImage={org.backgroundImage}
        />
      ))}
      <ReactTooltip placer="right" effect="solid" />
    </OrganisationList>
  );
};

export default Organisations;

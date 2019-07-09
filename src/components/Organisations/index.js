import React from "react";
import styled from "styled-components";
import { light } from "../../theme/colors";
import ReactTooltip from "react-tooltip";

export const Organisation = styled.button`
  width: 3em;
  height: 3em;
  border: 1px solid ${light.textPrimary};
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
  background: ${light.primary};
  padding: 1em;
  height: calc(100vh - 2em);
  color: ${light.textPrimary};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      width: 4em;
      height: 4em;
      border: 1px solid ${light.textPrimary};
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

const Organisations = ({ orgs, onChangeOrganisation, onAddOrgClicked }) => {
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
      <Organisation
        type="button"
        data-tip="Add organisation"
        onClick={() => onAddOrgClicked()}
      >
        Add org
      </Organisation>
    </OrganisationList>
  );
};

export default Organisations;

/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";
import { PageBuilderRow, PageBuilderColumn } from "./../";

const Components = {
    column: PageBuilderColumn,
    row: PageBuilderRow,
  };

const PageBuilderRenderer = ({ block }) => {
  if (Components[block.model.apiKey]) {
    return React.createElement(Components[block.model.apiKey], {
      key: block.model.apiKey,
      block: block,
      type: block.model.apiKey
    });
  }

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return (<div>Missing react component for content component: {block.model.apiKey}</div>);
  } else {
    return null;
  }
};

PageBuilderRenderer.propTypes = {
  children: PropTypes.object
};

export default PageBuilderRenderer;

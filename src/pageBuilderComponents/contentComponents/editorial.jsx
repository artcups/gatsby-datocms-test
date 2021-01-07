/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";

// This should return project specific component
const Editorial = ({ block }) => {
  return (<div className="editorial">
    <h1>{block.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: block.body }} />
  </div>);
};

Editorial.propTypes = {
  block: {
    title: PropTypes.string,
    body: PropTypes.string
  }
};

export default Editorial;

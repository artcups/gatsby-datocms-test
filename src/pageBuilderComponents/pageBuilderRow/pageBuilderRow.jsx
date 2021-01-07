/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";
import { PageBuilderRenderer } from "./../";

const PageContentRow = ({ block }) => {
  return (<div className="row">
    <p>I am a row</p>
    Centered: {block.centered ? "true" : "false"} 
    NumberOfColums: {block.numberOfColums}
    <div>
      {block.columns && block.columns.map((column, index) => {
        return <PageBuilderRenderer key={index} block={column} />
      })}
    </div>
  </div>);
};

PageContentRow.propTypes = {
  block: {
    centered: PropTypes.bool.isRequired,
    numberOfColums: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired,
    model: PropTypes.object.isRequired
  }
};

export default PageContentRow;

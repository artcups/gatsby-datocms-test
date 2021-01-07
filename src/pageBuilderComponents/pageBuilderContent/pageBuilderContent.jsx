/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";
import { PageBuilderRenderer } from "./../";

const PageBuilderContent = ({ content }) => {
  let componentToRender;
  if(Array.isArray(content)) {
    componentToRender = content.map((block, index) => {
      return <PageBuilderRenderer key={index} block={block} />
    })

    return (<React.Fragment>{componentToRender}</React.Fragment>);

  } else {
    return <PageBuilderRenderer block={content} />
  }
};

PageBuilderContent.propTypes = {
  children: PropTypes.object
};

export default PageBuilderContent;

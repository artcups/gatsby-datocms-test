/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

// This should return project specific component
const Hero = ({ block }) => {
  return (<div className="hero">
    <h1>{block.title}</h1>
    <Img fluid={block.image.fluid} />
  </div>);
};

Hero.propTypes = {
  block: {
    header: PropTypes.string,
    image: PropTypes.object
  }
};

export default Hero;

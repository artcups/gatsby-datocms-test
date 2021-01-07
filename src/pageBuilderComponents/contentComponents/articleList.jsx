/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";

// This should return project specific component
const ArticleList = ({ block }) => {

  let articles = [];
  if(block.articles && block.articles.length)
    articles = block.articles.split("\n");
  
  return (<div className="article-list">
    <h1>{block.header}</h1>
    <div>{articles ?? articles.map((article, index) => <p key={index}>{article}</p>)}
    </div>
  </div>);
};

ArticleList.propTypes = {
  block: {
    header: PropTypes.string,
    articles: PropTypes.string
  }
};

export default ArticleList;

import React from "react";
import PropTypes from "prop-types";
// This should return project specific component
const ArticleList = ({ block }) => {
  return (<div className="article-list">
    <h1>{block.header}</h1>
    <div>{block.apiArticles.map((article, index) => (<div key={index}>
      <h3>{article.title}</h3>
      <img alt={article.title} src={article.image}></img>
      <span>{article.price}</span>
    </div>))}</div>
  </div>);
};

ArticleList.propTypes = {
  block: {
    header: PropTypes.string,
    articles: PropTypes.string
  }
};

export default ArticleList;

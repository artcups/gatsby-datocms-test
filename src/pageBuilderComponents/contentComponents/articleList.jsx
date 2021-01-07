import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
// This should return project specific component
const ArticleList = ({ block }) => {
  let articlesNumbers = [];
  if(block.articles && block.articles.length)
    articlesNumbers = block.articles.split("\n");

  const articles = useStaticQuery(graphql`
  {
    allApiArticle {
      edges {
        node {
          locale
          image
          title
          price
          articleNumber
        }
      }
    }
  }
  `)

  const articlesInList = articles.allApiArticle.edges.filter((article)=> {
    return article.node.locale === "en" &&
    articlesNumbers.indexOf(article.node.articleNumber) > -1;
  })

  return (<div className="article-list">
    <h1>{block.header}</h1>
    <div>{articlesInList.map((article, index) => (<div key={index}>
      <h3>{article.node.title}</h3>
      <img alt={article.node.title} src={article.node.image}></img>
      <span>{article.node.price}</span>
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

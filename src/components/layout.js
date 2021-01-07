/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

//import "../styles/index.sass";

const TemplateWrapper = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
              titleSuffix
              twitterAccount
              facebookPageUrl
              fallbackSeo {
                title
                description
              }
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          allSitePage(filter: {context: {showInMenu: {eq: true}, locale: {eq: "en"}}}) {
            edges {
              node {
                id
                path
                context {
                  id
                  slug
                  title
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <div>
            <HelmetDatoCms
              favicon={data.datoCmsSite.faviconMetaTags}
              // seo={data.datoCmsSite.seoMetaTags}
            >
              <html lang="en" />
              <title>{data.datoCmsSite.globalSeo.fallbackSeo.title} {data.datoCmsSite.globalSeo.titleSuffix}</title>
              <meta name={data.datoCmsSite.globalSeo.fallbackSeo.description} content="test" />
            </HelmetDatoCms>
            <div>
            <ul>
              {data.allSitePage.edges && data.allSitePage.edges.map((page, index) => 
                <li key={index} ><Link to={page.node.path}>{page.node.context.title}</Link></li>
              )}
              </ul>
            </div>
            {children}
          </div>
        )
      }}>

    </StaticQuery>
    //   render={data => (
    //     <div className={`container ${showMenu ? "is-open" : ""}`}>
    //       <HelmetDatoCms
    //         favicon={data.datoCmsSite.faviconMetaTags}
    //         seo={data.datoCmsHome.seoMetaTags}
    //       />
    //       <div className="container__sidebar">
    //         <div className="sidebar">
    //           <h6 className="sidebar__title">
    //             <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
    //           </h6>
    //           <div
    //             className="sidebar__intro"
    //             dangerouslySetInnerHTML={{
    //               __html:
    //                 data.datoCmsHome.introTextNode.childMarkdownRemark.html
    //             }}
    //           />
    //           <ul className="sidebar__menu">
    //             <li>
    //               <Link to="/">Home</Link>
    //             </li>
    //             <li>
    //               <Link to="/about">About</Link>
    //             </li>
    //           </ul>
    //           <p className="sidebar__social">
    //             {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
    //               <a
    //                 key={profile.profileType}
    //                 href={profile.url}
    //                 target="blank"
    //                 className={`social social--${profile.profileType.toLowerCase()}`}
    //               >
    //                 {" "}
    //               </a>
    //             ))}
    //           </p>
    //           <div className="sidebar__copyright">
    //             {data.datoCmsHome.copyright}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="container__body">
    //         <div className="container__mobile-header">
    //           <div className="mobile-header">
    //             <div className="mobile-header__menu">
    //               <button
    //                 onClick={e => {
    //                   e.preventDefault();
    //                   setShowMenu(!showMenu);
    //                 }}
    //               />
    //             </div>
    //             <div className="mobile-header__logo">
    //               <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
    //             </div>
    //           </div>
    //         </div>
    //         {children}
    //       </div>
    //     </div>
    //   )}
    // />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

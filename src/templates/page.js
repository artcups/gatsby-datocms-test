import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import { PageBuilderContent } from "../pageBuilderComponents"

export default (props) => {
  const {data} = props;
  return (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsPage.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsPage.title}</h1>
      </div>
      <PageBuilderContent content={data.datoCmsPage.content}></PageBuilderContent>
      {/* <Img fluid={data.datoCmsPage.content[0].columns[0].image.fluid} /> */}
    </article>
  </Layout>)
}

export const query = graphql`
  query PageQuery($id: String!) {
    datoCmsPage(id: {eq: $id}) {
      id
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      content {
        numberOfColums
        centered
        model {
          apiKey
        }
        columns {
          ... on DatoCmsEditorial {
            title
            body
            model {
              apiKey
            }
          }
          ... on DatoCmsHero {
            title
            model {
              apiKey
            }
            image {
              fluid(maxWidth: 600, forceBlurhash: false, imgixParams: { fm: "jpg", auto: "compress" }) {
                ...GatsbyDatoCmsFluid
              }
            }
          }
          ... on DatoCmsArticleList {
            header
            articles
            apiArticles {
              locale
              image
              title
              price
              articleNumber
            }
            model {
              apiKey
            }
          }
        }
      }
    }
  }
`;

// export const query = graphql`
//   query WorkQuery($slug: String!) {
//     datoCmsWork(slug: { eq: $slug }) {
//       seoMetaTags {
//         ...GatsbyDatoCmsSeoMetaTags
//       }
//       title
//       excerpt
//       gallery {
//         fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
//           src
//         }
//       }
//       descriptionNode {
//         childMarkdownRemark {
//           html
//         }
//       }
//       coverImage {
//         url
//         fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
//           ...GatsbyDatoCmsSizes
//         }
//       }
//     }
//   }
// `

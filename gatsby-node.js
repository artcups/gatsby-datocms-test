const path = require(`path`)

// exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
//   const { createNode, createTypes } = actions
//   createTypes(`
//       type contentPagePath implements Node {
//           slug: String,
//           title: String,
//           path: String,
//           id: String
//       }
//   `)
// }
// exports.createResolvers = ({ createResolvers, schema }) => {
//   console.log("hej")

//   createResolvers({
//     Query: {
//       allAuthorFullNames: {
//         type: [`contentPagePath`],
//         resolve(source, args, context, info) {
//           const pages = context.nodeModel.getAllNodes({
//             type: `DatoCmsPage`,
//           })
//           console.log(pages)
//           return pages.map(page => {
//             console.log(page.entityPayload.attributes.slug)
//             return {
//               slug: "String",
//               title: "String",
//               path: "String",
//               id: "String"
//             }
//           })
//         },
//       },
//     },
//   })
//   // createResolvers({
//   //   DatoCmsPage: {
//   //     // Modify birthday resolver so that it uses 1970-01-01 as default date
//   //     slug: {
//   //       resolve(source, args, context, info) {
//   //         // original resolver available as "info.originalResolver"
//   //         console.log(source)
//   //         return {};
//   //         // return info.originalResolver(
//   //         //   {
//   //         //     ...source,
//   //         //     slug: slug + "slug"
//   //         //   },
//   //         //   args, context, info)
//   //       },
//   //     },
//   //   },
//   // })
// }

// async function createContentPagePaths(actions, createNodeId, createContentDigest){
//   const { createNode, createTypes } = actions

//   const pageStructure = await graphql(`
//     {
//       allDatoCmsPage(filter: {root: {eq: true}}) {
//         edges {
//           node {
//             id
//             title
//             position
//             locale
//             slug
//             treeChildren {
//               id
//               title
//               slug
//               position
//               locale
//               treeChildren {
//                 id
//                 title
//                 slug
//                 position
//                 locale
//                 treeChildren {
//                   id
//                   slug
//                   title
//                   position
//                   locale
//                   treeChildren {
//                     id
//                     title
//                     slug
//                     position
//                     locale
//                     treeChildren {
//                       id
//                       slug
//                       title
//                       position
//                       locale
//                       treeChildren {
//                         id
//                         slug
//                         title
//                         position
//                         locale
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     `)

//     function createLocaliedUrls(node){

//       const contentPagePath = {
//         id: node.id,
//         locale: node.locale,
//         slug: `${node.locale}`,
//         title: node.title,
//         includeInMenu: true
//       }
//       createNode({
//         id: contentPagePath.id,
//         parent: null,
//         children: [],
//         internal: {
//             type: `contentPagePaths`,
//             contentDigest: createContentDigest(contentPagePath),
//         },
//       })

//       if(node.treeChildren !== null && node.treeChildren.length > 0)
//         createPagesFromTreeChildren(node.treeChildren, slug);
//     }

//     function createPagesFromTreeChildren(childPages, parentSlug){
//       childPages.sort((a, b) => {
//         return a.position - b.position;
//         }).forEach(page => {

//         const contentPagePath = {
//           id: page.id,
//           locale: page.locale,
//           slug: `${parentSlug}/${page.slug}`,
//           title: page.title,
//           includeInMenu: true
//         }

//         createNode({
//           id: contentPagePath.id,
//           parent: null,
//           children: [],
//           internal: {
//               type: `contentPagePaths`,
//               contentDigest: createContentDigest(contentPagePath),
//           },
//         })

//         if(page.treeChildren !== null && page.treeChildren.length > 0)
//           createPagesFromTreeChildren(page.treeChildren, slug);
//       }) 
      
//     }

//     pageStructure.data.allDatoCmsPage.edges.forEach(element => {
//       createLocaliedUrls(element.node);
//     });
// }

// exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
//   await createContentPagePaths(actions, createNodeId, createContentDigest)
// }
// exports.createContentPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   // return new Promise((resolve, reject) => {
//   //   graphql(`
//   //     {
//   //       allDatoCmsWork {
//   //         edges {
//   //           node {
//   //             slug
//   //           }
//   //         }
//   //       }
//   //     }
//   //   `).then(result => {
//   //     result.data.allDatoCmsWork.edges.map(({ node: work }) => {
//   //       createPage({
//   //         path: `works/${work.slug}`,
//   //         component: path.resolve(`./src/templates/work.js`),
//   //         context: {
//   //           slug: work.slug,
//   //         },
//   //       })
//   //     })
//   //     resolve()
//   //   })
//   // })
// }

async function createContentPageNodes(graphql, actions){
  const { createPage } = actions
  const pageStructure = await graphql(`
    {
      allDatoCmsPage(filter: {root: {eq: true}}) {
        edges {
          node {
            id
            title
            position
            locale
            slug
            showInMenu
            treeChildren {
              id
              title
              slug
              position
              locale
              showInMenu
              treeChildren {
                id
                title
                slug
                position
                locale
                showInMenu
                treeChildren {
                  id
                  slug
                  title
                  position
                  locale
                  showInMenu
                  treeChildren {
                    id
                    title
                    slug
                    position
                    locale
                    showInMenu
                    treeChildren {
                      id
                      slug
                      title
                      position
                      locale
                      showInMenu
                      treeChildren {
                        id
                        slug
                        title
                        position
                        locale
                        showInMenu
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `)

    function createLocaliedUrls(node){
      const slug = `${node.locale}`;
      createPage({
        id: node.id,
        path: slug,
        component: path.resolve(`./src/templates/page.js`),
        context: {
          id: node.id,
          slug: slug,
          title: node.title,
          showInMenu: node.showInMenu,
          locale: node.locale
        },
      })

      if(node.treeChildren !== null && node.treeChildren.length > 0)
        createPagesFromTreeChildren(node.treeChildren, slug);
    }

    function createPagesFromTreeChildren(childPages, parentPath){
      childPages.sort((a, b) => {
        return a.position - b.position;
        }).forEach(page => {
        const thePath = `${parentPath}/${page.slug}`;
        createPage({
          id: page.id,
          path: thePath,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            id: page.id,
            slug: page.slug,
            title: page.title,
            showInMenu: page.showInMenu,
            locale: page.locale
          },
        })

        if(page.treeChildren !== null && page.treeChildren.length > 0)
          createPagesFromTreeChildren(page.treeChildren, thePath);
      }) 
      
    }
    pageStructure.data.allDatoCmsPage.edges.forEach(element => {
      createLocaliedUrls(element.node);
    });
}


exports.createPages = async ({graphql, actions}) => {
  await createContentPageNodes(graphql, actions)
}

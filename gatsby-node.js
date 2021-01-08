const path = require(`path`)
const fs = require('fs');
const resolvers = require('./gatsby/resolvers')

// Extend the schemas from external sources
exports.createResolvers = ({ createResolvers }) => {
  createResolvers(resolvers)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode, createTypes } = actions;
  const rawdata = fs.readFileSync('mockdata.json');
  const articles = JSON.parse(rawdata);
  const markets = process.env.MARKETS.split(',');

  createTypes(`
    type apiArticle implements Node {
        entityId: String,
        title: String,
        description: String,
        price: String,
        currentMarket: String,
        image: JSON
    }
  `);

  createTypes(`
    type apiCategory implements Node {
        entityId: String,
        title: String,
        text: String,
        brand: String,
        menu: String,
        url: String,
        path: String,
        market: String,
        availableOnMarkets: String,
        currentMarket: String,
        image: JSON
    }
  `);

  createTypes(`
    type market implements Node {
        countryCode: String,
        flag: String,
        channelNodeName: String
    }
  `);

  markets.forEach(marketId => {
    var marketParts = marketId.split('-');
    var country = marketParts.length > 1 ? marketParts[1] : marketParts[0];
    const market = {
        countryCode: marketId,
        flag: `/flag/${country.toLowerCase()}.png`,
        channelNodeName: `${marketId.toLocaleLowerCase().replace('-', '')}`,
    }

    createNode({
        ...market,
        id: createNodeId(marketId),
        parent: null,
        children: [],
        internal: {
            type: `market`,
            contentDigest: createContentDigest(market),
        },
    })

    articles.forEach(article => {
      const newArticle = { ...article, locale: marketId };
      const id = `${marketId}-${article.entityId}`;
      createNode({
        ...newArticle,
        id: createNodeId(id),
        parent: null,
        children: [],
        internal: {
          type: `apiArticle`,
          contentDigest: createContentDigest(newArticle),
        },
      });
    });
  })

  for (let index = 0; index < 3; index++) {
    
  }
};

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

module.exports = {
  DatoCmsArticleList: {
    apiArticles: {
      type: ["apiArticle"],
      resolve: (source, args, context, info) => {
        const locale = source.locale;
        const articleStr = source.entityPayload.attributes.articles[locale];
        const articlesNumbers = (articleStr && articleStr.length) ? articleStr.split("\n") : [];

        if(articlesNumbers.length < 1)
          return [];

        return context.nodeModel.runQuery({
          query: {
            filter: {
              locale: { eq: locale },
              articleNumber: { in: articlesNumbers}
            },
          },
          type: "apiArticle",
          firstOnly: false,
        })
      }
    },
  }
}
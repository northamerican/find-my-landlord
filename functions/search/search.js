// const fs = require('fs');
// const { searchIndex } = JSON.parse(fs.readFileSync(require.resolve('./assets/search-index.json')))

// const FlexSearch = require('./assets/flexsearch.js')

const headers = {
  'Access-Control-Allow-Origin': '*'
}

// const searchResultsLimit = 50
// const propertyIndexColumn = 'hash'

exports.handler = async ({ body }) => {
  // const jsonBody = JSON.parse(body)
  // const { query } = jsonBody

  // // console.log({ jsonBody, query })
  // // console.log(searchIndex.length)

  // const flex = new FlexSearch({
  //   encode: "simple",
  //   profile: "fast",
  //   doc: {
  //     id: propertyIndexColumn,
  //     field: ["search"]
  //   }
  // })

  // flex.add(searchIndex)

  // const results = flex.search(query, searchResultsLimit + 1)
  // const response = {
  //   results
  // }

  // console.log({ response, results })

  return {
    statusCode: 200,
    body: JSON.stringify({ results: [] }),
    headers: JSON.stringify(headers)
  }
}

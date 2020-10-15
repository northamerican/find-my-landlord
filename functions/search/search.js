const fs = require('fs')
const { searchIndex } = fs.readFileSync('./assets/search-index.json') 

console.log(searchIndex[0])

const FlexSearch = require('./assets/flexsearch.js')


const headers = {
  'Access-Control-Allow-Origin': '*'
}

var propertyIndexColumn = "Numéro de lot"; // Property Index Number

exports.handler = async ({ body }) => {
  // const jsonBody = JSON.parse(body)
  // const { query } = jsonBody

  // var flex = new FlexSearch({
  //   doc: {
  //     id: propertyIndexColumn,
  //     field: ["search"]
  //   },
  // });

  // flex.add(searchIndex)

  // var results = flex.search(query, searchResultsLimit + 1)

  // const response = {
  //   results
  // }

  return {
    statusCode: 200,
    body: searchIndex[0], //JSON.stringify(response),
    headers
  }
}

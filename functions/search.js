const FlexSearch = require('./flexsearch.js')

const searchIndex = require('./search-index.json')

const headers = {
  'Access-Control-Allow-Origin': '*'
}

var propertyIndexColumn = "Numéro de lot"; // Property Index Number

exports.handler = async ({ body }) => {
  const jsonBody = JSON.parse(body)
  const { query } = jsonBody

  var flex = new FlexSearch({
    doc: {
      id: propertyIndexColumn,
      field: ["search"]
    },
  });

  flex.add(searchIndex)

  var results = flex.search(query, searchResultsLimit + 1)

  const response = {
    results
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers
  }
}

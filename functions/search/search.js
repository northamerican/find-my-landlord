const fs = require('fs')
var hrSearchIndex = process.hrtime()
const { searchIndex } = JSON.parse(fs.readFileSync(require.resolve('./assets/search-index.json')))
var hrSearchIndexTime = process.hrtime(hrSearchIndex)

const FlexSearch = require('./assets/flexsearch.js')

const headers = {
  'Access-Control-Allow-Origin': '*'
}

const searchResultsLimit = 50
var propertyIndexColumn = 'hash'

exports.handler = async ({ body }) => {
  const jsonBody = JSON.parse(body)
  const { query } = jsonBody

  var hrFlexInitAdd = process.hrtime()
  var flex = new FlexSearch({
    profile: "fast",
    doc: {
      id: propertyIndexColumn,
      field: ["search"]
    },
  })

  flex.add(searchIndex)
  var hrFlexInitAddTime = process.hrtime(hrFlexInitAdd)

  var hrFlexSearch = process.hrtime()  
  var results = flex.search(query, searchResultsLimit + 1)
  var hrFlexSearchTime = process.hrtime(hrFlexSearch)

  const response = {
    results,
    timing: {
      hrSearchIndexTime: hrSearchIndexTime[1] / 1000000,
      hrFlexInitAddTime: hrFlexInitAddTime[1] / 1000000,
      hrFlexSearchTime: hrFlexSearchTime[1] / 1000000
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers
  }
}

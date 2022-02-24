import { useEffect, useState } from "react"
import "graphiql/graphiql.min.css"
import GraphiQL from "graphiql"
import * as _ from 'lodash'
// import {
//   buildClientSchema,
//   validateSchema,
// } from 'graphql'

import config from "../utils/config"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { SEARCH_SCHEMA } from "../utils/gql_queries_schema"

import { BASE_PATH_GQL_GENERIC } from "../constants"

// const URL = "http://localhost:4000/gql_admin"
// const URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index'

async function graphQLFetcher( { graphQLParams, schemaPath } ) {
  // console.log( graphQLParams )
  const url = `${config.baseUrl}${schemaPath}`

  const data = await fetch( url, {
    method: "post",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    credentials: 'same-origin',
    body: JSON.stringify( graphQLParams )
  } )
  const res = await data.json().catch( () => data.text() )
  // try {
  //   const schema = buildClientSchema( res.data )
  //   console.log( validateSchema( schema ) )
  // } catch ( e ) {
  //   console.log( e )
  // }
  // console.log( res )
  return res
}

const GraphRunnerPage = () => {

  const params = useParams()
  const [ schemaPath, setSchemaPath ] = useState( '' )

  const { loading, error, data } = useQuery( SEARCH_SCHEMA, {
    variables: {
      schemaInput: {
        name: params.name
      }
    }
  } )

  useEffect( () => {
    const path = _.get( data, 'schema[0].path', BASE_PATH_GQL_GENERIC )
    const pathWithSchemaId = path.replace( ':schemaId', params.name )
    // console.log( pathWithSchemaId )
    setSchemaPath( pathWithSchemaId )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ] )

  if ( loading ) return <h2>loading...</h2>
  if ( error ) return <h3>Error loading Schema...</h3>

  return (
    <GraphRunner schemaPath={schemaPath} />
  )
}

const GraphRunner = ( { schemaPath } ) => {
  return (
    <div
      style={{
        zIndex: 2,
        width: '100%',
        alignSelf: 'stretch',
        position: 'relative',
        height: 'calc(100% - 65px)',
      }}
    >
      <GraphiQL
        inputValueDeprecation={false}
        dangerouslyAssumeSchemaIsValid={true}
        fetcher={( graphQLParams ) => graphQLFetcher( { graphQLParams, schemaPath } )} />
    </div>
  )
}

export default GraphRunnerPage

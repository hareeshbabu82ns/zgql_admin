const express = require( 'express' )
const app = express()
const cors = require( 'cors' )

require( 'dotenv' ).config( {
  // path: path.resolve(process.cwd(), '.env')
} )

const port = process.env.PORT || 4000
const config = require( './utils/config' )
const { client, prepareAxiosClient } = require( './utils/GqlAxiosClient' )



process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
app.use( cors() )
app.use( express.text() )
app.use( express.json() ) // for parsing application/json
app.use( express.urlencoded( { extended: true } ) ) // for parsing application/x-www-form-urlencoded

app.get( '/', async ( req, res ) => {
  try {
    const resp = await client.get( '/', { params: req.query } )
    res.send( resp.data )
  } catch ( ex ) {
    res.send( ex )
  }
} )

app.get( '/:id', async ( req, res ) => {
  try {
    const gClient = prepareAxiosClient( {
      apiPath: `${config.gqlPath}/${req.params.id}`
    } )
    const resp = await gClient.get( '/', {
      params: req.query,
      headers: { 'Authorization': req.headers.authorization }
    } )
    res.send( resp.data )
  } catch ( ex ) {
    res.send( ex )
  }
} )

app.post( '/:id', async ( req, res ) => {
  try {
    const gClient = prepareAxiosClient( {
      apiPath: `${config.gqlPath}/${req.params.id}`
    } )
    // console.log(req.body)
    const resp = await gClient.post( '/', req.body, {
      params: req.query,
      headers: { 'Authorization': req.headers.authorization }
    } )
    res.send( resp.data )
  } catch ( ex ) {
    res.send( ex )
  }
} )

app.listen( port, () => console.log( `Server Started on http://localhost:${port}` ) )
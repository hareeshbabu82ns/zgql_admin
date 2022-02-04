const axios = require( "axios" )
const config = require( './config' )

const prepareAxiosClient = ( {
  baseUrl = config.baseUrl, port = config.port, apiPath, sapClient = config.sapClient } ) => {
  console.log( 'preparing schema for ', apiPath );
  const client = axios.create( {
    baseURL: `${baseUrl}:${port}${apiPath}?sap-client=${sapClient}`,
    auth: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    }
  } )
  return client;
}

const client = prepareAxiosClient( {
  apiPath: `${config.gqlPath}${config.gqlAdminPath}`
} )

module.exports = { client, prepareAxiosClient }

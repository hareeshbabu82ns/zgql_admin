import axios from "axios"
import config from './config'

const prepareAxiosClient = ({
  baseUrl = config.baseUrl, apiPath, sapClient = config.sapClient }) => {
  console.log('preparing schema for ', apiPath);
  const client = axios.create({
    baseURL: `${baseUrl}${apiPath}`
    // baseURL: `${baseUrl}${apiPath}?sap-client=${sapClient}`
  })
  return client;
}

const client = prepareAxiosClient({
  apiPath: `${config.gqlPath}${config.gqlAdminPath}`
})

export { client as default, prepareAxiosClient }

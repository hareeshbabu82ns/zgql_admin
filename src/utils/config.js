import { BASE_PATH_GQL, BASE_PATH_GQL_ADMIN } from "../constants";

const config = {
  // baseUrl: 'https://vhcalnplci.terabits.io',
  // gqlPath: '/sap/bc/api/gql',
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '',
  gqlPath: process.env.NODE_ENV === 'development' ? '' : BASE_PATH_GQL,
  gqlAdminPath: BASE_PATH_GQL_ADMIN,
  sapClient: '001'
}

export default config;
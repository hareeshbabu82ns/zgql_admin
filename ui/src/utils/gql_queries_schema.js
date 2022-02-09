import { gql } from "@apollo/client";

const GET_SCHEMA_LIST = gql`
  {
    schema{
      id:guid
      name
      description
      path
      query
      mutation
    }
  }
`;
const SEARCH_SCHEMA = gql`
  query schema($schemaInput:SchemaWhereInput!){
    schema(where:$schemaInput){
      id:guid
      name
      description
      path
      query
      mutation
    }
  }
`;

const UPDATE_SCHEMA_WHERE = gql`
mutation UpdateSchema($data: SchemaUpdateDataInput!,
			$where: SchemaWhereInput!){
    updateSchema(with:$data, where: $where){
      id:guid
      name
      description
      path
    }
  }
`;
const CREATE_SCHEMA = gql`
mutation CreateSchema($data: SchemaInput!){
    createSchema(with:[$data]){
      id:guid
      name
      description
      path
    }
  }
`;
const DELETE_SCHEMA_BY_NAME = gql`
mutation DeleteSchema($name: String!){
    deleteSchema(where:{name:$name}){
      id:guid
    }
  }
`;
const DELETE_SCHEMA_BY_ID = gql`
mutation DeleteSchema($id: ID!){
    deleteSchema(where:{guid:$id}){
      id:guid
    }
  }
`;

export {
  GET_SCHEMA_LIST, SEARCH_SCHEMA,
  UPDATE_SCHEMA_WHERE, CREATE_SCHEMA, DELETE_SCHEMA_BY_ID,
  DELETE_SCHEMA_BY_NAME
};
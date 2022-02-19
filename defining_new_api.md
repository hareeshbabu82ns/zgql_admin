### Admin UI
#### Create Schema Header
* Schema ID: `SFLIGHT`
* Description: `SAP Flights API`
* Path: `/sap/bc/api/gql/sflight`
#### Update SDL with required fields
* Import Function Module
  * BAPI_FLIGHT_GETLIST - to fetch the list of Flights
  ```graphql
  type Query {
    searchFlights(
      airline: String
      destinationFrom: BapisfldstInput
      destinationTo: BapisfldstInput
      maxRows: Int
    ): BapiFlightGetlistOutput! @functionModule(
    name: "BAPI_FLIGHT_GETLIST"
  )   
  }
  ```
  * BAPI_FLIGHT_GETDETAIL - to fetch the details of individual Flight
  ```graphql
  type Query {
    getFlightDetails(
      airlineid: String!
      connectionid: Int!
      flightdate: String!
    ): BapiFlightGetdetailOutput! @functionModule(
    name: "BAPI_FLIGHT_GETDETAIL"
  ) 
  }
  ```  
* Stitch Detail query under List to build graph
  * update `connectionid` field under operation `getFlightDetails` to be same as parent field `connectid`
  * add as a sub field of type `BapisfldatType`
  ```graphql
  type BapisfldatType {
    ...
    getFlightDetails(
      airlineid: String!
      connectid: Int! @abapName( name: "CONNECTIONID" )
      flightdate: String!
    ): BapiFlightGetdetailOutput! @functionModule(
    name: "BAPI_FLIGHT_GETDETAIL"
  ) 
  }  
  ```
* we can now see the SDL of the schema
  * https://vhcalnplci.local.io:44300/sap/bc/api/gql/zgql_admin?sdl=SFLIGHT

### Build API on SAP
#### Service Class
* create service class
  * name: `ZGQLCL_API_SFLIGHT`
  * super class: `ZGQLCL_API_SERVICE_BASE`
* redefine method `GET_SCHEMA_ID`
* return the schema id
```abap
  rv_schema_id = 'SFLIGHT'.
```
#### ICF node
* tcode `SICF`
* create a node under `/sap/bc/api/gql/sflight`
* provide the handler class as `ZGQLCL_API_SFLIGHT`
* with this the API will be already served and can be tested
* https://vhcalnplci.local.io:44300/sap/bc/api/gql/zflight
```graphql
query {
  searchFlights(airline:"AA"){
    flightList{
      airline
      flightdate
      getFlightDetails{
        additionalInfo{
          distance
          flighttime
        }
      }
    }
  }
}
```
#### Resolving by ID (legacy)
* this API also supports `Resolvers by ID` for backword compatibility
* define a filed in Admin UI
```graphql
type Query {
  ...
  test: String @resolver( id: "resolveTest" )
}
```
* create a Resolver Class `ZGQLCL_SFLIGHT_RESOLVER`
* add interface `ZGQLIF_RESOLVER`
* implement `RESOLVER` method
```abap

    CASE ir_environment->ms_env-resolver_id.
      WHEN 'resolveTest'.

        DATA(lv_data) = 'return some test data'

        rr_result = NEW zgqlcl_resolver_result( ir_data = REF #( lv_data ) ).

    ENDCASE.
```
* redefine method `GET_RESOLVER` of `ZGQLCL_API_SFLIGHT` service class
```abap
  rr_resolver = NEW zgqlcl_sflight_resolver( ).
```
* now the new field can be queried from API
```graphql
query {
  test
}
```
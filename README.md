# GraphQL Admin Web App

## Pre-requisit Repositories
* [ZJSON](https://github.com/hareeshbabu82ns/zjson) for conversion of ABAP to JSON and JSON to ABAP
* [ZGraphQL](https://github.com/hareeshbabu82ns/zgraphql) for ABAP implementation of [GraphQL](http://spec.graphql.org/)

## Credits
* [GraphQL Editor](https://graphqleditor.com/) library for Visually editing Graph Nodes
* [PostGraphile](https://www.graphile.org/postgraphile/) library for the idea of using Directives to map models 

## Pre-requisit Software
* [NodeJS](https://nodejs.org/) for running the React and Express Applications in this repository

## Running
* Install NodeJS
* Open a Terminal at root folder of this project
  * `$> npm i` to install dependencies of Web App
  * under proxy folder `$> npm i` for proxy server dependencies
* Run Proxy Server with `$> npm run serve` under proxy folder
* Run Web Application with `$> npm start` under root folder
* Add 'Authorization = Basic [TOKEN]' in ModHeaders chrome extension to authenticate with SAP system
  
  ***Note*** where [TOKEN] is Base64 string in format [SAP User]:[Password]


## Available Scripts

### `$> npm run serve`

running this from **/proxy** folder will serve GraphQL server with axios proxy ignoring TSL certificate errors from SAP server

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

***Note***: open **GraphQL Playground** with url "http://localhost:4000/[schema_name]" to execute GraphQL requests

### `$> npm start`

Runs the Admin app in the development mode.<br /> which connects to SAP through above Proxy server

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

***Note***: In order to authenticate please use **Mod Headers** chrome extension to pass **Authorization** token header to SAP

### `$> npm run build`

Builds the app for production to the `build` folder.<br />

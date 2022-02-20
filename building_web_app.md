### Build App
* `yarn build`
* If want to update names, check `build/asset-manifest.json` and rename
* Note: used `HashRouter` from `react-router-dom` to work with SAP without changing path
* Note: used `package.json -> homepage` option to `/sap/bc/bsp/sap/zgqlbsp_admin` as per deployment

### BSP application in SAP
* create a BSP application `zgqlbsp_admin`
* create `index.htm` file as `Pages with Flow Logic`
  * enable `Start BSP` checkbox on page properties
* upload assets to `MIMEs` folder with `Create -> MIME Object -> Import`
* import `build/static/css/main.***.css` to `build/static/css/main.css`
* Note: replace `validation.worker.***.worker.js` to `validation.worker.worker.js` in `build/static/js/main.***.js`
* import `build/static/js/main.***.js` to `build/static/js/main.js`
* import `build/static/js/validation.worker.***.worker.js` to `build/static/js/validation.worker.worker.js`
* test the app at http://vhcalnplci.local.io:8000/sap/bc/bsp/sap/zgqlbsp_admin/index.htm

* Note: if assets are uploaded without `hash` numbers, `browser cache` will need to be reset after each version, otherwise browser will load the old pages
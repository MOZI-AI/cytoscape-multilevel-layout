cytoscape-multilevel-layout
================================================================================


## Description

A multilevel layout algorithm for visualizing physical and genetic interaction networks based on the publication of Johannes Tuikkala, Heidi Vähämaa, Pekka Salmela, Olli S Nevalainen,and Tero Aittokallio ([demo](https://MOZI-AI.github.io/cytoscape-multilevel-layout))

## Dependencies

 * Cytoscape.js ^3.2.0
 * <List your dependencies here please>


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-multilevel-layout`,
 * via bower: `bower install cytoscape-multilevel-layout`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import multilevelLayout from 'cytoscape-multilevel-layout';

cytoscape.use( multilevelLayout );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let multilevelLayout = require('cytoscape-multilevel-layout');

cytoscape.use( multilevelLayout ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-multilevel-layout'], function( cytoscape, multilevelLayout ){
  multilevelLayout( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.


<!--## API-->

<!--TODO describe the API of the extension here.-->

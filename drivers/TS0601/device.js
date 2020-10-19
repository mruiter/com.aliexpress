// SDK3 updated & validated: done

'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
class TS0601r extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
     enable debugging
     this.enableDebug();

    // print the node's info to the console
     this.printNode();


  }

}

module.exports = TS0601;


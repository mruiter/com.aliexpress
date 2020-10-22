// SDK3 updated & validated: done

'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
const {
  zclNode, debug, Cluster, CLUSTER,
} = require('zigbee-clusters');



class TS0111 extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
     this.enableDebug();
	 debug(true);
     this.printNode();

	 if (this.hasCapability('onoff')) {
      this.registerCapability('onoff', CLUSTER.ON_OFF, {
        endpoint: 1,
      });
    }
	 

  }

}

module.exports = TS0111;


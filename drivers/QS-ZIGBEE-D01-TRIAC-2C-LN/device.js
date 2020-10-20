// SDK3 updated & validated: done

'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
const {
  zclNode, debug, Cluster, CLUSTER,
} = require('zigbee-clusters');

class D01_TRIAC_2C_LN extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
     //enable debugging
     this.enableDebug();
	 
	 const { subDeviceId } = this.getData();

    // print the node's info to the console
     this.printNode();
	 
	 if (this.hasCapability('onoff')) {
      this.registerCapability('onoff', CLUSTER.ON_OFF, {
        endpoint: subDeviceId === 'dimmer2' ? 2 : 1,
      });
    }
	
	 if (this.hasCapability('dim')) {
      this.registerCapability('dim', CLUSTER.LEVEL_CONTROL, {
        endpoint: subDeviceId === 'dimmer2' ? 2 : 1,
      });
    }

  }
  
}

module.exports = D01_TRIAC_2C_LN;


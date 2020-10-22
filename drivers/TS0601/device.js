// SDK3 updated & validated: done

'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
const { Cluster, CLUSTER } = require('zigbee-clusters');
const TS0601BasicCluster = require('../../lib/TS0601');
const THERMOSTAT = require('../../lib/THERMOSTAT');

Cluster.addCluster(TS0601BasicCluster);

class TS0601 extends THERMOSTAT {

  async onNodeInit({ zclNode }) {
     //this.enableDebug();
	 debug(true);
     this.printNode();

	 await super.onNodeInit({ zclNode });
	 
    // pIHeatingDemand that reports the % open valve
    if (this.hasCapability('heating_demand')) {
      this.registerCapability('heating_demand', CLUSTER.THERMOSTAT, {
        get: 'pIHeatingDemand',
        reportParser(value) {
          return value;
        },
        report: 'pIHeatingDemand',
        getOpts: {
          getOnLine: true,
          getOnStart: true,
        },
      });

      await this.configureAttributeReporting([
        {
          endpointId: 1,
          cluster: CLUSTER.THERMOSTAT,
          attributeName: 'pIHeatingDemand',
          minInterval: 0,
          maxInterval: 300,
          minChange: 1,
        },
      ]);

      this.pIHeatingDemandTrigger = this.homey.flow.getDeviceTriggerCard('pIHeatingDemand_changed');
      this.pIHeatingDemandTrigger
        .registerRunListener(async (args, state) => {
          return args.args.valve_number === state.valve_number;
        });
    }
  }

  onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log(changedKeys);
    this.log('newSettingsObj', newSettings);
    this.log('oldSettingsObj', oldSettings);
    this.log('test: ', changedKeys.includes('temperature_Calibration'));
    // localTemperatureCalibration changed
    if (changedKeys.includes('temperature_Calibration')) {
      this.log('temperature_Calibration: ', newSettings.temperature_Calibration);
      try {
        this.zclNode.endpoints[this.getClusterEndpoint(CLUSTER.THERMOSTAT)]
          .clusters[CLUSTER.THERMOSTAT.NAME]
          .writeAttributes({ localTemperatureCalibration: newSettings.temperature_Calibration });
      } catch (err) {
        this.log('could not write localTemperatureCalibration');
        this.log(err);
      }
    }
	 
	 
	 
  }

}

module.exports = TS0601;


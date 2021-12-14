# RPi 1-Wire

> One-wire temperature sensors for the Raspberry Pi and similar devices running
> Node JS.

## Prerequisites

- A Raspberry Pi or similar device with 1-Wire GPIO.
- Node JS >= 12.

## Installation

```console
$ npm i rpi-1-wire
```

You need to enable the 1-Wire bus: run `sudo raspi-config` then select
Interface Options -> 1-Wire.

## Usage

Asynchronous methods (return a promise).

```javascript
// Test the 1-wire service is connected.
await isConnected();
// Get a list of attached sensor ids.
await getSensors();
// Get temperature from all sensors.
await getTemperature();
// Get temperature from a sensor.
await getSensorTemperature(id, options);
```

## Target API

This is the target for v1.0.

Asynchronous methods (return a promise).

```typescript
// Get a list of sensors.
getSensors();
// Get temperature from all sensors.
getTemperature(options);
// Get temperature from a sensor.
getSensorTemperature(id, options);
```

Synchronous methods (blocking).

```typescript
// Get a list of sensors.
getSensorsSync();
// Get temperature from all sensors.
getTemperatureSync(options);
// Get temperature from a sensor.
getSensorTemperatureSync(id, options);
```

```javascript
import { getTemperature } from 'rpi-1-wire';

// Get temperature from all sensors.
getTemperature();
// Promise<{
//   { id: '2812b3345', value: 21.345 },
//   { id: '282223345', value: 22.4 },
// }>

// Get temperature in Farenheit from all sensors.
getTemperature({ unit: 'F' });
// Promise<{
//   2812b3345: { id: '2812b3345', value: 55.345 },
//   28c12b335: { id: '2812b3345', value: 57.4 },
// }>

// Get temperature in Kelvin from all sensors.
getTemperature({ unit: 'K' });
// Promise<{
//   2812b3345: { id: '2812b3345', value: 291.345 },
//   28c12b335: { id: '282223345', value: 295.4 },
// }>

// Get temperature in all units from all sensors.
getTemperature({ unit: 'K,C,F' });
// Promise<{
//   2812b3345: { id: '2812b3345', values: { K: 291.345, C: 21.345, F: 55.345 },
//   28c12b335: { id: '2812b3345', values: { K: 295.4, C: 22.4, F: 57.4 },
// }>
```

```javascript
import { getSensorTemperature } from 'rpi-1-wire';

// Get temperature from a sensor.
getSensorTemperature('2812b3345');
// Promise<21.345>

// Get temperature in Farenheit from a sensor.
getSensorTemperature('2812b3345', { unit: 'F' });
// Promise<55.345>

// Get temperature in Kelvin from a sensor.
getSensorTemperature('2812b3345', { unit: 'K' });
// Promise<291.345>

// Get temperature in all units from a sensor.
getTemperature({ unit: 'K,C,F' });
// Promise<{ K: 291.345, C: 21.345, F: 55.345 }>
```

```javascript
import { getSensors } from 'rpi-1-wire';

// Get attached sensors.
getSensors();
// Promise<[ '2812b3345', '28c12b335' ]>
```

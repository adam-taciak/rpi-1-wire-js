/**
 * @REVISIT `fs/promises` was broken in Node 12 forcing the clumsy import.
 */
import { existsSync, readFileSync, promises } from 'fs';
// import { readFile } from 'fs/promises';

import { parseSensorsFile } from './parsers.js';

// Just for Node 12.
const { readFile } = promises;

// const basePath = '/sys/bus/w1/devices/';
const w1BusFile = '/sys/bus/w1/devices/w1_bus_master1/w1_master_slaves';

export const isConnected = (): boolean => {
  // We are connected iff we can read the file.
  return existsSync(w1BusFile);
};

export const getSensors = async (): Promise<string[]> => {
  try {
    return parseSensorsFile(await readFile(w1BusFile, 'utf8'));
  } catch (err) {
    return [];
  }
};

export const getSensorsSync = (): string[] => {
  try {
    return parseSensorsFile(readFileSync(w1BusFile, 'utf8'));
  } catch (err) {
    return [];
  }
};

export const getSensorRawData = async (id: string): Promise<string | null> => {
  try {
    const filename = `/sys/bus/w1/devices/${id}/w1_slave`;
    return readFile(filename, 'utf8');
  } catch (err) {
    return null;
  }
};

export const getSensorConversionTime = async (
  id: string
): Promise<number | null> => {
  try {
    const filename = `/sys/bus/w1/devices/${id}/conv_time`;
    return parseInt(await readFile(filename, 'utf8'));
  } catch (err) {
    return null;
  }
};

export const getSensorResolution = async (
  id: string
): Promise<number | null> => {
  try {
    const filename = `/sys/bus/w1/devices/${id}/resolution`;
    return parseInt(await readFile(filename, 'utf8'));
  } catch (err) {
    return null;
  }
};

export const getSensorTemperature = async (
  id: string
): Promise<number | null> => {
  try {
    const filename = `/sys/bus/w1/devices/${id}/temperature`;
    return parseInt(await readFile(filename, 'utf8')) / 1000;
  } catch (err) {
    return null;
  }
};

export const getTemperature = async (): Promise<
  PromiseSettledResult<number | null>[]
> => {
  const promises: Promise<number | null>[] = [];
  (await getSensors()).forEach((id) => {
    promises.push(getSensorTemperature(id));
  });
  return Promise.allSettled(promises);
};

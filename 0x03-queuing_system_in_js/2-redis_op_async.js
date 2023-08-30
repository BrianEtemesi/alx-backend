#!/usr/bin/env node
import { createClient } from 'redis';

const redis = require('redis');
const util = require('util');

// Create a redis client instance
const client = createClient();

// Listen for the 'connect' event to know when the client is connected
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Listen for the 'error' event to handle connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

const setNewSchool = (schoolName, value) => {
  client.SET(schoolName, value, redis.print);
};

const displaySchoolValue = (schoolName) => {
  client.GET(schoolName, (err, value) => {
    console.log(value);
  });
};

const DisplaySchoolValueAsync = util.promisify(displaySchoolValue);

async function displaySchValue(schoolName) {
  try {
    const value = await DisplaySchoolValueAsync(schoolName);
    console.log(value);
  } catch (error) {
    console.log(error.message);
  }
}

displaySchValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

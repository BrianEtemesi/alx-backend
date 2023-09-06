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

// function to set a new school name and its value to redis
const setNewSchool = (schoolName, value) => {
  client.SET(schoolName, value, redis.print);
};

// function to display the value of a school name stored in redis
const displaySchoolValue = (schoolName) => {
  client.GET(schoolName, (err, value) => {
    console.log(value);
  });
};

// Promisify the 'displaySchoolValue' function
const DisplaySchoolValueAsync = util.promisify(displaySchoolValue);

// Define an asynchronous function to display the school value
async function displaySchValue(schoolName) {
  try {
    // Use the promisified 'displaySchoolValue' function to get the value
    const value = await DisplaySchoolValueAsync(schoolName);
    console.log(value);
  } catch (error) {
    console.log(error.message);
  }
}

displaySchValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

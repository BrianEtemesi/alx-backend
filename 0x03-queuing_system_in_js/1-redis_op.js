#!/usr/bin/env node
import { createClient } from 'redis';
const redis = require('redis');

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

// define a function to set a new school name and it value in redis
const setNewSchool = (schoolName, value) => {
  client.SET(schoolName, value, redis.print);
};

// function to display the value of a schoolname stored in redis
const displaySchoolValue = (schoolName) => {
  client.GET(schoolName, (err, value) => {
    console.log(value);
  });
};

// display value of 'Holberton' key in redis
displaySchoolValue('Holberton');

// set a new key 'HolbertonSanFrancisco' with a value '100' in redis
setNewSchool('HolbertonSanFrancisco', '100');

// display the value of 'HolbertonSanFrancisco' key in redis
displaySchoolValue('HolbertonSanFrancisco');

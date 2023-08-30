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


const schools = {
  'Portland': 50,
  'Seattle': 80,
  'New York': 20,
  'Bogota': 20,
  'Cali': 40,
  'Paris': 2
};

// function to set school data as a hash
const hSetSchools = (schoolName, schools) => {
  for(const sch in schools) {
    client.hset(schoolName, sch, schools[sch], redis.print);
  }
}

// function to get all values from the school hash
const hGetSchoolValue = (schoolName) => {
  client.hgetall(schoolName, (err, value) => {
    console.log(value);
  });
}

hSetSchools('HolbertonSchools', schools);
hGetSchoolValue('HolbertonSchools');

#!/usr/bin/env node
import { createClient } from 'redis';
const redis = require('redis');

// Create a redis client instance
const client = createClient();

// Listen for the 'error' event to handle connection errors
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

// Listen for the 'connect' event to know when the client is connected
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const publishMessage = (message, time) => {
  function waitAndPublish (message) {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message);
  }

  setTimeout(waitAndPublish, time, message);
}


publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);

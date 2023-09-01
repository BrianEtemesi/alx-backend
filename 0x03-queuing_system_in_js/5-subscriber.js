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

  client.subscribe('holberton school channel');
});

// listen for messages on the subscribed channel
client.on('message', (channel, message) => {
  console.log(message);
  if(message === 'KILL_SERVER') {
    client.unsubscribe('holberton school channel');
    client.quit();
  }
})

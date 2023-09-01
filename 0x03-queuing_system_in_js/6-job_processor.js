#!/usr/bin/env node
const kue = require('kue');

const sendNotification = (phoneNumber, message) => {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// create a Kue job queue
const queue = kue.createQueue();

// Define a job processing function
queue.process('jobType', (job, done) => {
  // access job data
  const { phoneNumber, message } = job.data;

  // call sendNotification
  sendNotification(phoneNumber, message);
})

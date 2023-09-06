#!/usr/bin/env node
const kue = require('kue');

const blacklistedPnoneNumbers = ['4153518780', '4153518781']

const sendNotification = (phoneNumber, message, job, done) => {
  job.progress(0, 100);

  if(blacklistedPnoneNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    done(error);
  } else {
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
};

// create a Kue job queue
const queue = kue.createQueue();

// Define a job processing function
queue.process('jobType', 2, (job, done) => {
  // access job data
  const { phoneNumber, message } = job.data;

  // call sendNotification
  sendNotification(phoneNumber, message, job, done);
});

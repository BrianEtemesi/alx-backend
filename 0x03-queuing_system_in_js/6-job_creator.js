#!/usr/bin/env node
const kue = require('kue');

const jobData = {
  phoneNumber: '1234',
  message: 'we are coming',
}

// create a que
const push_notification_code = kue.createQueue();

// create a job object using jobdata
const job = push_notification_code.create('jobType', jobData);

job.save((err) => {
  if(!err) {
    console.log(`Notification job created: ${job.id}`)
  }
});

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
})

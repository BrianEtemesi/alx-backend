#!/usr/bin/env node

// Define function to create and manage push notification jobs
const createPushNotificationsJobs = (jobs, queue) => {

  // check if jobs is an array
  if(!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  };


  jobs.forEach((jobData) => {
    
    // create job in the queue with jobtype and data
    const job = queue.create('push_notification_code_3', jobData);

    // save job in the que
    job.save((err) => {
      if(!err) {
        console.log(`Notification job created: ${job.id}`);
      }
    });

    // listen for the complete event
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // listen for the failed event when the job encounters an error
    job.on('failed', (err) => {
      console.log(`Notification job ${job.id} failed:`, err);
    });

    // listen for progress event
    job.on('progress', (progress, data) => {
      console.log(`Notification ${job.id} ${progress}% complete`);
    });

  });
};

module.exports = createPushNotificationsJobs;

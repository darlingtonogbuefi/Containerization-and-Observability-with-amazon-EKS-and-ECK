// src/lib/apm.ts


import apm from 'elastic-apm-node';

apm.start({
  serviceName: 'cribr-app', // your service name
  secretToken: 'Csyqae4fuSRDtCAaca', // your secret token
  serverUrl: 'https://1309e7ae5e8b4a9fadf8f621b090283c.apm.us-central1.gcp.cloud.es.io:443', // your APM server URL
  environment: 'production', // your environment
});

export default apm;

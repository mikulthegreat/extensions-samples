"use strict";

/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const fs = require('fs');
const https = require('https');
const igdb = require('igdb-api-node').default;
const client = igdb('b6432d67bc376f023e39fd26db454833');

const app = express();

app.use((req, res, next) => {
  console.log('Got request', req.path, req.method);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.use(express.static('../frontend'))

let options = {
   key  : fs.readFileSync('../certs/testing.key'),
   cert : fs.readFileSync('../certs/testing.crt')
};

app.get('/info', (req, res) => {

	var info;

	client.games({
		search: req.query.search,
	    fields: '*', // Return all fields
    	limit: 1, // Limit to 5 results
	}).then(response => {
		res.json(response.body[0])
	}).catch(error => {
    	throw error;
	});
	//res.send('Hello World!')
})


const PORT = 8080;
https.createServer(options, app).listen(PORT, function () {
  console.log('Extension Boilerplate service running on https', PORT);
});

#!/usr/bin/env node
'use strict';

var async = require('async');

return function (context, req, res) {
	var body = '';

	async.series([
		function (callback) {
			// Collect payload of GitHub web hook
			req.on('data', function (chunk) {
				body += chunk;
			});
			req.on('end', function () {
				try {
					body = JSON.parse(body);
					if (!body || typeof body !== 'object') {
						throw new Error('Unexpected web hook payload.');
					}
					if (!body.repository || typeof body.repository.full_name !== 'string') {
						throw new Error('Repository not identified in web hook payload.');
					}
				} catch (err) {
					return callback(err);
				}
				return callback();
			});
			req.on('error', callback);
		}
	], function (error) {
		try {
			if (error) {
				console.log('ERROR', error);
				res.writeHead(500);
				res.end(error.toString());
			}
		} catch (err) {
			// ignore
		}
	});
};

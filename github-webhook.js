#!/usr/bin/env node
'use strict';

var async = require('async'),
    request = require('request');

return function (context, req, res) {
    var body = '';
    var webtask_code;

    async.series([
        function (callback) {
            // Collect payload of GitHub web hook
            req.on('data', function (chunk) { body += chunk; });
            req.on('end', function () {
                try {
                    body = JSON.parse(body);
                    if (!body || typeof body !== 'object')
                        throw new Error("Unexpected web hook payload.");
                    if (!body.repository || typeof body.repository.full_name !== 'string')
                        throw new Error("Repository not identified in web hook payload.");
                }
                catch (e) {
                    return callback(e);
                }
                return callback();
            });
            req.on('error', callback);
        },
      ], function (error) {
        try {
            if (error) {
                console.log('ERROR', error);
                res.writeHead(500);
                res.end(error.toString());
            }
        }
        catch (e) {
            // ignore
        }
    });
};

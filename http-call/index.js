const http = require('http');
const https = require('https');
const { objIntoParams } = require('common-utils');

function shopify_call(access_token, shop, api_end_point, query = false, method = 'GET', headers = false) {
    return new Promise(resolve => {
        try {
            if (headers) {
                headers = Object.assign(headers, {
                    'X-Shopify-Access-Token': access_token
                })
            } else {
                headers = {
                    'X-Shopify-Access-Token': access_token,
                    'Content-Type': 'application/json'
                }
            }

            let options = {
                hostname: shop,
                path: api_end_point,
                method: method,
                headers
            }

            if (['GET', 'DELETE'].includes(method) && query) {
                options.path += '?' + objIntoParams(query);
            }

            const req = https.request(options, res => {
                let status = res.statusCode, message = res.message, tempBuffer = [];
                res.on('data', chunk => {
                    tempBuffer.push(chunk)
                })
                res.on('end', function () {
                    tempBuffer = Buffer.concat(tempBuffer).toString();
                    resolve({
                        status,
                        data: JSON.parse(tempBuffer),
                        message
                    });
                })
            })

            req.on('error', error => {
                resolve({
                    status: 512,
                    message: error.message,
                    data: error.stack
                });
            })

            if (['POST', 'PUT'].includes(method) && query) {
                req.write(JSON.stringify(query))
            }

            req.end();
        } catch (error) {
            console.log('\nerror', error);
            resolve({
                status: 500,
                data: error,
                message: 'Internal server error.'
            });
        }
    })
}

function httpCall(address = '', method = 'GET', data = false, headers = false) {
    return new Promise((resolve) => {
        try {
            let url = new URL(address);
            if (!headers) {
                headers = {
                    'Content-Type': 'application/json'
                }
            }

            let options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: method,
                headers
            }


            if (['GET', 'DELETE'].includes(method) && data) {
                options.path += '?' + objIntoParams(data);
            }

            const reqAgent = url.protocol === 'http' ? http : https;
            const req = reqAgent.request(options, res => {
                let status = res.statusCode, message = res.message, tempBuffer = [];
                res.on('data', chunk => {
                    tempBuffer.push(chunk)
                })
                res.on('end', function () {
                    tempBuffer = Buffer.concat(tempBuffer).toString();
                    resolve({
                        status,
                        data: tempBuffer,
                        message
                    });
                })
            })

            req.on('error', error => {
                resolve({
                    status: 512,
                    message: error.message,
                    data: error.stack
                });
            })

            if (['POST', 'PUT'].includes(method) && data) {
                req.write(JSON.stringify(data))
            }

            req.end();

        } catch (e) {
            resolve(e)
        }
    })
}

module.exports = {
    shopify_call,
    httpCall
}
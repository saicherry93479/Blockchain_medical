const https = require('https');

const projectId = "2KiyG1MBUts4FkHp7VpHbBC2Tcl";

const projectSecret = "36e6eacf54580eda1a2f998e264d4af6";

const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    path: '/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn',
    method: 'POST',
    auth: projectId + ':' + projectSecret,
};

let req = https.request(options, (res) => {
    let body = '';
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        console.log(body);
    });
});
req.end();
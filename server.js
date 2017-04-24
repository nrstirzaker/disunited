'use strict';

const Inert = require('inert');
const Path = require('path');
const extConfig = require('./config/config.json');
var port = process.env.PORT || 8080; // set our port
const Gmail  = require('gmail');


const Hapi = require('hapi');
const server = new Hapi.Server({
        connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: port });

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});


server.route({
    method: 'GET',
    path: '/api/oauth2callback',
    handler: function (req, reply) {
        console.log("/api/oauth2callback");
        var resp = {
            url : '/api/oauth2callback',
            status : 20
        }
        reply( resp );
    }
});

server.route({
    method: 'GET',
    path: '/api',
    handler: function (req, reply) {
        console.log("/api");
        var resp = {
            url : '/api',
            status : 20
        }
        reply( resp );
    }
});

server.register(
    {
        register: require('inert')
    }, 
    function (err) {
        if (err) throw err

        server.start(function (err) {
            console.log('Server started at: ' + server.info.uri)
        })
    }
)


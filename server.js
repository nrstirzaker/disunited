'use strict';

const Inert = require('inert');
const Path = require('path');
const extConfig = require('./config/config.json');
var port = process.env.PORT || 8080; // set our port


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
        //const email = req.payload.username;
        //const password = req.payload.password;
        //const auth = firebase.auth();
        reply('20');
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


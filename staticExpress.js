/* Pakete die wir brauchen */

var bot = require('./bot.js');
var express = require('express');

var app = express();

/* Nutzen einer statischen WebSeite */
app.use(express.static('public'));

// Wir nutzen ein paar statische Ressourcen
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

// Wir starten den Express server
var webserver = app.listen(8081, function () {
  var address = webserver.address();
  console.log(address);
  console.log('Server started at http://localhost:8081');
});

// Das brauchen wir für unsere Websockets
var WSS = require('websocket').server;
var http = require('http');

var server = http.createServer();
server.listen(8181);

// Hier erstellen wir den Server
var wss = new WSS({
  httpServer: server,
  autoAcceptConnections: false
});

/* Wir erstellen einen Bot, der kann sich aber noch nicht mit
    dem Socket Server verbinden, da dieser noch nicht läuft
*/
var myBot = new bot();
var connections = {};

// Wenn sich ein Client-Socket mit dem Server verbinden will kommt er hier an
wss.on('request', function (request) {
  var connection = request.accept('chat', request.origin);

  connection.on('message', function (message) {
    var name = '';

    for (var key in connections) {
      if (connection === connections[key]) {
        name = key;
      }
    }

    var data = JSON.parse(message.utf8Data);
    var msg = 'leer';

    // Variablen um später den letzten Satz und den Sender zu speichern
    var uname;
    var utype;
    var umsg;

    switch (data.type) {
      case 'join':
        // Wenn der Typ join ist füge ich den Client einfach unserer Liste hinzu
        connections[data.name] = connection;
        msg = '{"type": "join", "names": ["' + Object.keys(connections).join('","') + '"]}';
        if (myBot.connected === false) {
          myBot.connect();
        }

        // Sende die Nachricht nur an den neu verbundenen Client
        connection.send(msg);

        // Sende die Nachricht an alle anderen verbundenen Clients
        for (var key in connections) {
          if (key !== data.name && connections[key] && connections[key].send) {
            connections[key].send(msg);
          }
        }
        break;
      case 'msg':
        // Erstelle eine Nachricht in JSON mit Typ, Sender und Inhalt
        msg = '{"type": "msg", "name":"' + name + '", "msg":"' + data.msg + '","sender":"'+data.sender+'"}';
        utype = 'msg';
        uname = name;
        umsg = data.msg;

        // Sende die Nachricht nur an den Empfänger-Client
        if (connections[data.recipient] && connections[data.recipient].send) {
          connections[data.recipient].send(msg);
        }

        // Sende die Nachricht an den Sender-Client
        if (connections[name] && connections[name].send) {
          connections[name].send(msg);
        }

        // Sende die Nachricht an alle anderen verbundenen Clients
        for (var key in connections) {
          if (key !== data.recipient && key !== name && connections[key] && connections[key].send) {
            connections[key].send(msg);
          }
        }
        break;
    }

    // Leite die Daten des Users an den Bot weiter, damit der antworten kann
    if (uname !== 'MegaBot' && utype === 'msg') {
      myBot.post(msg);
    }
  });

  connection.on('close', function (reasonCode, description) {
    var disconnectedName = '';

    for (var key in connections) {
      if (connection === connections[key]) {
        disconnectedName = key;
        break;
      }
    }

    delete connections[disconnectedName];

    var msg = '{"type": "leave", "names": ["' + Object.keys(connections).join('","') + '"]}';

    // Sende die Nachricht an alle anderen verbundenen Clients
    for (var key in connections) {
      if (connections[key] && connections[key].send) {
        connections[key].send(msg);
      }
    }
  });
});
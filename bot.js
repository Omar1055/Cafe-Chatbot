'use strict'



var WebSocketClient = require('websocket').client

/**
 * bot ist ein einfacher Websocket Chat Client
 */

class bot {

  /**
   * Konstruktor baut den client auf. Er erstellt einen Websocket und verbindet sich zum Server
   * Bitte beachten Sie, dass die Server IP hardcodiert ist. Sie müssen sie umsetzten
   */
  constructor () {
    
    this.dict = []
    this.dict['Hello'] = 'welcome,How can i help you? type (menu) to see our menu today.'
    this.dict['hello'] = 'welcome,How can i help you? type (menu) to see our menu today.'
    this.dict['Menu'] = 'Todays menu includes a variety of coffees, teas, dessert, breakfast menu, juices and salads.'
    this.dict['menu'] = 'Todays menu includes a variety of coffees, teas, dessert, breakfast menu, juices and salads.'
    this.dict['Order'] = 'You can place an order by simply telling me what you would like or by browsing our menu and letting me know the items and quantities , enter your address and and then type (confirm) to confirm your order.'
    this.dict['order'] = 'You can place an order by simply telling me what you would like or by browsing our menu and letting me know the items and quantities, enter your address and then type (confirm) to confirm your order.'
    this.dict['Opening'] = 'We are open from 8:00 AM to 6:00 PM from Monday to Saturday, and from 9:00 AM to 4:00 PM on Sundays.'
    this.dict['opening'] = 'We are open from 8:00 AM to 6:00 PM from Monday to Saturday, and from 9:00 AM to 4:00 PM on Sundays.'
    this.dict['Payment'] = 'We accept cash, credit cards (Visa, Mastercard, American Express).'
    this.dict['payment'] = 'We accept cash, credit cards (Visa, Mastercard, American Express).'
    this.dict['credit card'] = 'Enter your IBAN and then type (confirm payment)'
    this.dict['cash'] = 'please pay at our address, Amperestraße 10, 94469 Deggendorf'
    this.dict['Feedback'] = 'We appreciate your feedback! You can speak to our staff or fill out a feedback form available at the counter. We are always looking for ways to improve.'
    this.dict['Feedback'] = 'We appreciate your feedback! You can speak to our staff or fill out a feedback form available at the counter. We are always looking for ways to improve.'
    this.dict['Desserts'] = 'We offer a variety of desserts such as cheesecake, brownies, and cookies. Prices range from $3.99 for a cookie to $6.99 for a slice of cheesecake.'
    this.dict['desserts'] = 'We offer a variety of desserts such as cheesecake, brownies, and cookies. Prices range from $3.99 for a cookie to $6.99 for a slice of cheesecake.'
    this.dict['cheesecake'] = ' Great! We have a variety of cheesecakes available,type (confirm) to confirm your order'
    this.dict['Cheesecake'] = 'Great! We have a variety of cheesecakes available,type (confirm) to confirm your order'
    this.dict['brownies'] = 'Great! We have brownies available,type (confirm) to confirm your order'
    this.dict['Brownies'] = 'Great! We have brownies available,type (confirm) to confirm your order'
    this.dict['cookies'] = 'Great! We have cookies available,type (confirm) to confirm your order'
    this.dict['Cookies'] = 'Great! We have cookies available,type (confirm) to confirm your order'
    this.dict['Breakfast'] = 'Our breakfast menu includes options like croissants, breakfast burritos, and yogurt parfaits. Prices start at $4.99 for a croissant and go up to $8.99 for a breakfast burrito.'
    this.dict['breakfast'] = 'Our breakfast menu includes options like croissants, breakfast burritos, and yogurt parfaits. Prices start at $4.99 for a croissant and go up to $8.99 for a breakfast burrito.'
    this.dict['corissant'] = ' "corissant" good choise type (confirm) to confirm your oreder'
    this.dict['Corissant'] = '"corissant" good choise type (confirm) to confirm your oreder'
    this.dict['burritos'] = 'Very good one we hope you like it type (confirm) to confirm your order'
    this.dict['Burritos'] = 'Very good one we hope you like it type (confirm) to confirm your order'
    this.dict['yogurt'] = 'yogurt parfaits you have a good taste! type (confirm) to confirm your order'
    this.dict['Yogurt'] = 'yogurt parfaits you have a good taste! type (confirm) to confirm your order'
    this.dict['Coffee'] = 'We offer three sizes: small (12 oz) for $2.99, medium (16 oz) for $3.99, and large (20 oz) for $4.99. Additional charges may apply for specialty drinks'
    this.dict['coffee'] = 'We offer three sizes: small (12 oz) for $2.99, medium (16 oz) for $3.99, and large (20 oz) for $4.99. Additional charges may apply for specialty drinks'
    this.dict['Salad '] = 'Our salad options include Caesar salad, Greek salad, and Cobb salad. Prices range from $8.99 for a small salad to $12.99 for a large salad.'
    this.dict['salad '] = 'Our salad options include Caesar salad, Greek salad, and Cobb salad. Prices range from $8.99 for a small salad to $12.99 for a large salad.'
    this.dict['Tea'] = 'We have a wide selection of teas including green tea, black tea, herbal tea, and specialty blends. Prices range from $2.99 for a small tea to $4.99 for a large specialty blend.'
    this.dict['tea'] = 'We have a wide selection of teas including green tea, black tea, herbal tea, and specialty blends. Prices range from $2.99 for a small tea to $4.99 for a large specialty blend.'
    this.dict['Juice'] = 'we offer a variety of freshly squeezed juices including orange juice, apple juice, and carrot juice. Prices range from $3.99 for a small juice to $5.99 for a large juice.'
    this.dict['juice'] = 'we offer a variety of freshly squeezed juices including orange juice, apple juice, and carrot juice. Prices range from $3.99 for a small juice to $5.99 for a large juice.'
    this.dict['orange juice'] = 'good choise, type (confirm) to confirm your order'
    this.dict['apple juice'] = 'good choise, type (confirm) to confirm your order'
    this.dict['carrot juice'] = 'good choise, type (confirm) to confirm your order'
    this.dict['openning'] = 'The cafe is open from 8:00 AM to 6:00 PM from Monday to Saturday, and from 9:00 AM to 4:00 PM on Sundays.'
    this.dict['Openning'] = 'The cafe is open from 8:00 AM to 6:00 PM from Monday to Saturday, and from 9:00 AM to 4:00 PM on Sundays.'
    this.dict['address'] = 'Amperestraße 10, 94469 Deggendorf'
    this.dict['Address'] = 'Amperestraße 10, 94469 Deggendorf'
    this.dict['hours'] = 'The cafe is open from 8:00 AM to 6:00 PM from Monday to Saturday, and from 9:00 AM to 4:00 PM on Sundays.'
    this.dict['Hours'] = 'The cafe is open from 8:00 AM to 6:00 PM from Monday to Saturday, and from 9:00 AM to 4:00 PM on Sundays.'
    this.dict['confirm'] = 'your order has been confirmed, enter your address by typing (my address is) and then your adress, type (payment) to choose your payment method'
    this.dict['my address is '] = 'your order will arrive in half an hour, type (payment) to choose your payment method'
    this.dict['confirm payment'] = 'thanks for trusting us'
    this.sender="";

    /** Die Websocketverbindung
      */
    this.client = new WebSocketClient()
    /**
     * Wenn der Websocket verbunden ist, dann setzten wir ihn auf true
     */
    this.connected = false

    /**
     * Wenn die Verbindung nicht zustande kommt, dann läuft der Aufruf hier hinein
     */
    this.client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString())
    })

    /** 
     * Wenn der Client sich mit dem Server verbindet sind wir hier 
    */
    this.client.on('connect', function (connection) {
      this.con = connection
      console.log('WebSocket Client Connected')
      connection.on('error', function (error) {
        console.log('Connection Error: ' + error.toString())
      })

      /** 
       * Es kann immer sein, dass sich der Client disconnected 
       * (typischer Weise, wenn der Server nicht mehr da ist)
      */
      connection.on('close', function () {
        console.log('echo-protocol Connection Closed')
      })

      /** 
       *    Hier ist der Kern, wenn immmer eine Nachricht empfangen wird, kommt hier die 
       *    Nachricht an. 
      */
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          var data = JSON.parse(message.utf8Data)
          console.log('Received: ' + data.msg + ' ' + data.name)
        }
      })

      /** 
       * Hier senden wir unsere Kennung damit der Server uns erkennt.
       * Wir formatieren die Kennung als JSON
      */
      function joinGesp () {
        if (connection.connected) {
          connection.sendUTF('{"type": "join", "name":"MegaBot"}')
          var inhalt= "How can i help you?"
          var msg = '{"type": "msg", "name": "' + "MegaBot" + '", "msg":"' + inhalt + '","sender":"MegaBot" }'
          console.log('Send: ' + msg)
          connection.sendUTF(msg)
        }
      }
      joinGesp()
    })
  }

  /**
   * Methode um sich mit dem Server zu verbinden. Achtung wir nutzen localhost
   * 
   */
  connect () {
    this.client.connect('ws://localhost:8181/', 'chat')
    this.connected = true
  }

  /** 
   * Hier muss ihre Verarbeitungslogik integriert werden.
   * Diese Funktion wird automatisch im Server aufgerufen, wenn etwas ankommt, das wir 
   * nicht geschrieben haben
   * @param nachricht auf die der bot reagieren soll
  */
  post (msg) {

    var get=JSON.parse(msg);
    var nachricht = get.msg;
    var name = 'MegaBot'
    var inhalt = 'I do not understand,could you repreat this in another formula'
    this.sender=get.name;

    for ( var i in this.dict) {
      console.log(i)
      console.log(this.dict[i])
    }

    for ( var j in this.dict) {
      if (nachricht.includes(j)) {
        inhalt = this.dict[j]
      }
    }
    /*
     * Verarbeitung
    */

    var msg = '{"type": "msg", "name":"' + name + '", "msg":"' + inhalt + '","sender":"'+this.sender+'"}'
    console.log('Send: ' + msg)
    this.client.con.sendUTF(msg)
  }

}

module.exports = bot

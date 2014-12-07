var zetta = require('zetta'),
    LED = require('zetta-led-bonescript-driver'),
    Buzzer = require('zetta-buzzer-bonescript-driver'),
    Microphone = require('zetta-microphone-bonescript-driver'),
    app = require('./apps/app');

zetta()
    .name('Wes Winham')
    .use(LED, 'USR0', 'USR1', 'USR2', 'USR3')
    .link('http://hello-zetta.herokuapp.com/')
    .use(Buzzer, 'P9_14')
    .use(Microphone, 'P9_36')
    .use(app)
    .listen(
        1337, 
        function() {
            console.log('Zetta is runninat http://robot21.local:1337');
        }
    );
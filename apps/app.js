module.exports = function(server) {
    var ledQuery = server.where({type: 'led'}),
        buzzerQuery = server.where({type: 'buzzer'}),
        microphoneQuery = server.where({type: 'microphone'}),
        buzzerThreshold = 20;
        
    server.observe(
        [ledQuery, buzzerQuery, microphoneQuery], 
        function(led, buzzer, microphone) {
            microphone.streams.volume.on('data', function(msg) {
                if (buzzer.state === 'off' && msg.data > buzzerThreshold) {
                    led.call('turn-on-pulse', function() {});
                    buzzer.call('turn-on-pulse', function() {});
                    setTimeout(
                        function(buzzer) {
                            buzzer.call('turn-off', function(err) {})
                            led.call('turn-off', function(err) {})
                        }, 
                        3000, 
                        buzzer
                    );
                }
            });
        }
    );
}
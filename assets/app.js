var channels = [
  {name: 'FreeCodeCamp', alias: 'freecodecamp'}
];
var twitchStreamsUrl = 'https://api.twitch.tv/kraken/streams/';


function updatePage(channel, channelInfo) {
    var testBox = $('#test');
    var isOnline = channelInfo.streams ? true : false;
    var channelUrl = channelInfo._links.channel;
  
    var link = $('<a>').attr('href', channelUrl).text(channel.name + ' is ' + (isOnline ? 'online' : 'offline'));
    testBox.append(link);
}

function addChannel(channel) {
    var xhr = $.ajax({
    type: 'GET',
    url: twitchStreamsUrl + channel.alias,
    dataType: 'jsonp',
    contentType: 'application/json',
    success: function(data) {
      console.log('data', data);
      updatePage(channel, data);
    }
  });
}


$(document).ready(function() {
  channels.forEach(function(item, index, array) {
    addChannel(item);
  });

});



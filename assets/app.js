var channels = [
  {name: 'FreeCodeCamp', alias: 'freecodecamp'}
];
var twitchStreamsUrl = 'https://api.twitch.tv/kraken/streams/';
var twitchChannelsUrl = 'https://api.twitch.tv/kraken/channels/';


function updateChannelStatus(channel, channelInfo) {
    var testBox = $('#test');
    var isOnline = channelInfo.streams ? true : false;
    var channelUrl = 'https://twitch.tv/' + channel.alias;
  
    var link = $('<a>').attr('href', channelUrl).text(channel.name + ' is ' + (isOnline ? 'online' : 'offline'));
    testBox.append(link);
}

function updateChannelIcon(channel, channelInfo) {
    var testBox = $('#test');
    var channelLogo = channelInfo.logo;
  
    var image = $('<img>').attr('src', channelLogo).attr('style', 'height: 50px');
    testBox.prepend(image);
}

function addChannel(channel) {
    var xhr = $.ajax({
    type: 'GET',
    url: twitchStreamsUrl + channel.alias,
    dataType: 'jsonp',
    contentType: 'application/json'
  }).then(function(data) {
    updateChannelStatus(channel, data);
    
    return $.ajax({
      type: 'GET',
      url: twitchChannelsUrl + channel.alias,
      dataType: 'jsonp',
      contentType: 'application/json'
    });
  }).then(function(data) {
    console.log('data', data);
    updateChannelIcon(channel, data);
  });
}


$(document).ready(function() {
  channels.forEach(function(item, index, array) {
    addChannel(item);
  });

});


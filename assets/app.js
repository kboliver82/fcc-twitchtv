var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff", "gamesdonequick"];
var twitchStreamsUrl = 'https://api.twitch.tv/kraken/streams/';
var twitchChannelsUrl = 'https://api.twitch.tv/kraken/channels/';



function addChannelElement(channelInfo) {
    var container = $('#mainContainer');
    var rowDiv = $('<div class="row">');
    var logoDiv = $('<div class="col-md-1">');
    var nameDiv = $('<div class="col-md-2">');
    var statusDiv = $('<div class="col-md-2">');

    var image = $('<img>').attr('src', channelInfo.image).attr('style', 'height: 50px');
    var link = $('<a>').attr('href', channelInfo.url).text(channelInfo.isOnline ? 'online - ' + channelInfo.stream.game : 'offline');

    logoDiv.append(image);
    nameDiv.append(channelInfo.displayName);
    statusDiv.append(link);
    
    rowDiv.append($('<div class="col-md-4">'));
    rowDiv.append(logoDiv);
    rowDiv.append(nameDiv);
    rowDiv.append(statusDiv);
    container.append(rowDiv);
}

function addChannel(channel) {
    var channelInfo = {};

    var xhr = $.ajax({
    type: 'GET',
    url: twitchStreamsUrl + channel,
    dataType: 'jsonp',
    contentType: 'application/json'
  }).then(function(data) {
    console.log('stream', data);
    channelInfo.isOnline = data.stream ? true : false;
    channelInfo.stream = data.stream;
    channelInfo.url = 'https://twitch.tv/' + channel;
    
    return $.ajax({
      type: 'GET',
      url: twitchChannelsUrl + channel,
      dataType: 'jsonp',
      contentType: 'application/json'
    });
  }).then(function(data) {
    console.log('channel', data);
    channelInfo.image = data.logo;
    channelInfo.displayName = data.display_name;

    addChannelElement(channelInfo);
  });
}


$(document).ready(function() {
  channels.forEach(function(item, index, array) {
    addChannel(item);
  });

});


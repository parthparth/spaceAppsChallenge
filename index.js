$(document).ready(function () {
    console.clear();
    getData();
    $('body').scrollView();
    console.log("Created by Parth Parth @ myselfparth.gq | For the SpaceAppsChallenge 2018");
});

$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}

function getData() {
    var url = 'https://launchlibrary.net/1.4/launch/next/' + $("#no-launch").text();
    $.getJSON(url, function (data) {
        $('#lons').html('No of upcoming launches being displayed: ' + data.count);
        data.launches.forEach(element => {
            var card = '<div class="card">';
            card += '<p id="rocket-name"><strong>' + element.name + '</strong></p>';
            card += '<p id="rocket-start-window">Launch window starts at ' + element.windowstart + '</p>';
            card += '<p id="rocket-end-window">Launch window ends at ' + element.windowend + '</p>';
            card += '<div id="launching-from" class="a-div">';
            card += '<p><strong>Launching From</strong></p>: &nbsp;';
            card += '<a href="' + element.location.pads[0].wikiURL + '" id="rocket-launch">' + element.location.name + '</a>&nbsp;|&nbsp;<a href="' + element.location.pads[0].mapURL + '" id="rocket-map">See it on a map</a>';
            card += '</div>';
            card += '<div id="launch-agencies">';
            card += '<p><strong>Launch Details</strong></p>';
            if (element.missions[0].agencies != null) {
                element.missions[0].agencies.forEach(elements => {
                    card += '<p> Launch Agency: ' + elements.name + '</p>';
                });
            }
            card += '<p class="description-p">'+element.missions[0].description+'</p>';
            if (element.missions[0].wikiURL)
                card += '<a href=' + element.missions[0].wikiURL + '">More information</a>';
            card += '</div>';
            card += '<div id="lsp" class="a-div">';
            card += '<p class="description-p"><strong>Launch Service Provider:</strong></p>&nbsp;<a class="description-p" href="' + element.lsp.wikiURL + '">' + element.lsp.name + '</a>';
            card += '</div>';
            if (element.missions[0].payloads) {
                element.missions[0].payloads.forEach(elements => {
                    card += '<div id="payloads">';
                    card += '<p><strong>Payload:</strong></p>';
                    card += '<ul id="payload-list">';
                    card += '<li>' + elements.name + '</li>';
                    card += '</ul>';
                    card += '</div>';
                });
            }
            if (element.vidURLs.length != 0) {
                var i = 0;
                card += '<div class="live">';
                card += '<p><strong>Live Stream URLs:</strong></p>';
                element.vidURLs.forEach(elements => {
                    i++;
                    card += '<a href="' + elements + '">Live stream URL '+i+'</a>';
                });
                card += '</div>';
            }
            card += '<img alt="Rocket" src="'+element.rocket.imageURL+'">';
            card += '</div>';
            document.getElementById('cards').innerHTML += card;
        });
    });
}

$('#increase').on('click', function () {
    var num = $("#no-launch").text();
    if (num < 14)
        num++;
    else
        return false;
    $("#no-launch").html(num);
});

$('#decrease').on('click', function () {
    var num = $("#no-launch").text();
    if (num > 1)
        num--;
    else
        return false;
    $("#no-launch").html(num);
});

$('#go').on('click', function () {
    getData();
});

$('#scrollInfo').on('click', function() {
    ('#information').scrollView;
})
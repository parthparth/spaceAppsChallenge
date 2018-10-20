$(document).ready(function () {
    console.clear();
    $('body').scrollView();
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
    console.log(url);
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
            card += '</div>';
            document.getElementById('cards').innerHTML += card;
        });
        console.log(data.launches);
    });
}

$('#increase').on('click', function () {
    var num = $("#no-launch").text();
    num++;
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
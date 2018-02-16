const CLIENT_ID = "z2v6g9gdtzhn17tdhwl5m258u82sty";
const CHANEL_ID = 169085056;

if(window.Twitch.ext) {
    console.log("Start extension");
    window.Twitch.ext.onContext(function(context, contextFields) {
        console.log("context");
        sendRequest("https://api.twitch.tv/kraken/channels/labiod?client_id="+CLIENT_ID);
        prepareFollowButton();
    });
}

function sendRequest(request) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log("OK");
            var restult = JSON.parse(xmlHttp.responseText);
            document.getElementById("status_field").innerHTML = restult["status"];
            document.getElementById("views_field").innerHTML = restult["views"];
        }
    }
    xmlHttp.open("GET", request, true);
    xmlHttp.send(null);
}

function prepareFollowButton() {
    document.getElementById("follow_button").onclick = function(event) {
        console.log("click button");
    }
}


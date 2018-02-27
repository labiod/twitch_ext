const CLIENT_ID = "z2v6g9gdtzhn17tdhwl5m258u82sty";
const CLIENT_ID_APP = "lf1rvuo79n4whve2lz7n00se2c7u96";
const CLIENT_SECRET = "l6we1awz5mh91feskg2n250piqodfj";
const AUTH_CODE = "gr5hsitauyemdtdo5w7da7a9z8u12i";
const AUTH_KEY = new Array();

const CUR_REQ = "curl -H 'Accept: application/vnd.twitchtv.v5+json' \
-H 'Client-ID: z2v6g9gdtzhn17tdhwl5m258u82sty' \
-H 'Authorization: OAuth gr5hsitauyemdtdo5w7da7a9z8u12i' \
-X GET 'https://api.twitch.tv/kraken/user'"
const REDIRECT_URI = "https://localhost:8080&scope=viewing_activity_read+user:edit+user_follows_edit+openid";
const AUTH_URL = "https://api.twitch.tv/kraken/oauth2/authorize";

const CHANNEL_ID = 169085056;

if(window.Twitch.ext) {
    if (window.location.href.indexOf("access_token") > -1) {
        var authUrl = new URL(window.location.href);
        var authCode = authUrl.searchParams.get("code");
        console.log(window.location.href.split("#")[1].split("&")[0].split("=")[0]);
        var access_token = window.location.href.split("#")[1].split("&")[0].split("=")[1];
        if (authCode != undefined) {
            console.log("send action");

            if (granted != undefined) {
                console.log("ok");
            } else {
                console.log("send action");
                // window.location = "https://api.twitch.tv/api/oauth2/token?client_id=" + CLIENT_ID_APP
                // + "&client_secret=" + CLIENT_SECRET 
                // + "&grant_type=authorization_code&redirect_uri=https://localhost:8080&code=" + authCode 
                // + "&granted=true";
            }
        }

        if (access_token != undefined) {
            console.log("access token: " + access_token);
            var headers = new Array();
            headers["Authorization"] = "Bearer " + access_token;
            //headers["Accept"] = "application/vnd.twitchtv.v5+json";
            headers["Client-ID"] = CLIENT_ID;
            sendRequest("https://api.twitch.tv/helix/users", function(content) {
                console.log(content);
                console.log(content.data[0]);
                var userId = content.data[0].id;

                console.log("get user info");
                headers["Authorization"] = "OAuth " + access_token;
                headers["Accept"] = "application/vnd.twitchtv.v5+json";
                headers["Client-ID"] = CLIENT_ID;
                sendRequest("https://api.twitch.tv/kraken/users/" + userId + "/follows/channels/"+CHANNEL_ID, function(userInfo) {
                    console.log(userInfo);
                    
                }, "PUT", headers);
            }, 
            "GET", headers);
        }
    }
    window.Twitch.ext.onContext(function(context, contextFields) {
        console.log("context");
        var callback = function(result) {
            document.getElementById("status_field").innerHTML = result["status"];
            document.getElementById("views_field").innerHTML = result["views"];
            document.getElementById("followers_field").innerHTML = result["followers"];
        };
        sendRequest("https://api.twitch.tv/kraken/channels/labiod?client_id="+CLIENT_ID, callback);
        prepareFollowButton();
    });

    window.Twitch.ext.onAuthorized(function(auth) {
        console.log("user authorized");
        console.log(auth);
    });
}

function sendRequest(request, callback, type="GET", headers = null) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                console.log("OK");
                var result = JSON.parse(xmlHttp.responseText);
                callback(result);
            } else {
                console.log("something went wrong");
                console.log(xmlHttp.status);
                console.log(request);
                console.log(xmlHttp.responseURL);
                var result = JSON.parse(xmlHttp.responseText);
                console.log(result);
            }
        } 
    }
    xmlHttp.open(type, request, true);
    if (headers != null) {
        for (var i in headers) {
            xmlHttp.setRequestHeader(i, headers[i]);
        }
    }
    xmlHttp.send(null);
}

//for test
window.onload = function() {
    console.log("test");
    prepareFollowButton();
}

function prepareFollowButton() {
    document.getElementById("follow_button").onclick = function(event) {
        console.log("click button");
        var headers = new Array();
        headers["Client-ID"] = CLIENT_ID;
        window.open(AUTH_URL + "?response_type=token&client_id="+CLIENT_ID + "&redirect_uri=" + REDIRECT_URI);    

    }
}


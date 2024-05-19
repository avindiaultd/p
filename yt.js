const axios = require('axios');
const express = require('express');

// from https://codewithmark.com/learn-to-create-youtube-video-downloader
function qsToJson(qs) {
    var res = {};
    var pars = qs.split('&');
    var kv, k, v;
    for (i in pars) {
        kv = pars[i].split('=');
        k = kv[0];
        v = kv[1];
        res[k] = decodeURIComponent(v);
    }
    return res;
}

// from https://davidwalsh.name/query-string-javascript
function getUrlParameter(search, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

async function youTubeVideoInfo(id) {
    var url = 'http://www.youtube.com/get_video_info?html5=1&video_id=' + id;

    const videoInfoResponse = await axios.get(url);
    if (videoInfoResponse.status != 200) {
        throw new Error(`YouTube get video info failed: ${videoInfoResponse.status} - ${videoInfoResponse.statusText}`);
    }
    var get_video_info = qsToJson(videoInfoResponse.data);

    // remapping urls into an array of objects
    var tmp = get_video_info["url_encoded_fmt_stream_map"];
    if (tmp) {
        tmp = tmp.split(',');
        for (i in tmp) {
            tmp[i] = qsToJson(tmp[i]);
        }
        get_video_info["url_encoded_fmt_stream_map"] = tmp;
    }

    return get_video_info;
}

const app = express();

app.get('/youtube2mp4', async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query.url) {
        try {
            youTubeVideoUrl = req.query.url;
            youTubeVideoId = getUrlParameter(youTubeVideoUrl.substring(youTubeVideoUrl.indexOf('?')), 'v');
            const videoInfo = await youTubeVideoInfo(youTubeVideoId);
            if (videoInfo.status === 'failed') {
                throw(new Error(`Failed due to: ${videoInfo.reason}`));
            }
            if (!!videoInfo && !!videoInfo.url_encoded_fmt_stream_map) {
                const mp4VideoEntry = videoInfo.url_encoded_fmt_stream_map.find(v => v.type.startsWith('video/mp4'));
                if (!mp4VideoEntry) {
                    throw(new Error(`Failed to resolve mp4 video for ${youTubeVideoUrl}`));
                }
                res.send(`{"success":true,"url":"${mp4VideoEntry.url}"}`);
            } else {
                throw(new Error(`Failed to resolve mp4 video for ${youTubeVideoUrl}`));
            }
        } catch(error) {
            res.send(`{"success":false,"error":"${error.message}"}`);
        }
    } else {
        res.send(`{"success":false,error:"Url parameter missing"}`);
    }
});



app.listen(9000, () => {
    console.log("Server listening on port 9000!");
});


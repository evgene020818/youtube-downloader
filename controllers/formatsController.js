const ytdl = require('ytdl-core');

const getAllFormats = async (req, res) => {
    if (!req?.body?.url) {
        return res.status(400).json({ "message": 'Url required' });
    }
    const url = req.body.url;
    let reqDisp = JSON.stringify(req.headers);
    console.log(reqDisp);
    try {
        const videoInfo = await ytdl.getInfo(url);
        
        // Getting video details like title, thumbnails, duration
        // to display preview of the video on the front-end.
        let videoDetails = {
            'title': videoInfo.videoDetails.title,
            'thumbnails': videoInfo.videoDetails.thumbnails,
            'duration': videoInfo.videoDetails.lengthSeconds,
            'channelAvatar': videoInfo.videoDetails.author.thumbnails[0].url,
            'channelName': videoInfo.videoDetails.author.name,
            'channelUrl': videoInfo.videoDetails.author.channel_url,
            'viewCount': videoInfo.videoDetails.viewCount,
        }

        // Getting rid of simimlar formats
        let formats = [];
        let sortKeys = [];
        videoInfo.formats.forEach((f) => {
            let sortStr = (f.qualityLabel || f.mimeType.split('; ')[0]) + f.hasAudio + f.hasVideo;
            if (!sortKeys.includes(sortStr)) {
                sortKeys.push(sortStr);
                formats.push({...f, 'mimeType' : f.mimeType.split('; ')[0]});
            }
        })

        videoDetails.formats = formats;

        res.json(videoDetails);
    } catch (err) {
        res.status(204).json({ "message": "No videos found."});
    }
}

module.exports = { getAllFormats };
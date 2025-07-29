var video = document.getElementById('video');
var videoSrc = 'https://os.mxonlive.workers.dev/azers/276918.m3u8';

function tryUnmute() {
    if (!video) return;
    video.muted = false;
    var promise = video.play();
    if (promise !== undefined) {
        promise.then(() => {
            console.log("Unmuted and playing");
        }).catch(error => {
            console.log("Autoplay with sound blocked:", error);
        });
    }
}

if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play().catch(error => console.log("Autoplay blocked on manifest parse:", error));
        setTimeout(tryUnmute, 1000);
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
    video.addEventListener('loadedmetadata', function() {
        video.play().catch(error => console.log("Autoplay blocked on loadedmetadata:", error));
        setTimeout(tryUnmute, 1000);
    });
}
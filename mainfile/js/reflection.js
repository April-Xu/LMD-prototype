$(function(){
    var $box = $("#emoji-catalog");
    var $curEmoji =$(".emoji-btn");
    var $emojiCatalog = $box.find(".emoji-list");

    //choose emoji
    $("> a", $emojiCatalog).each(function(){
        $(this).bind("click",function(){
            $(this).addClass("current-emoji").siblings().removeClass("current-emoji");
            var src =$(this).find("img").attr("src");
            $curEmoji.find("img").attr("src",src);
        });
    });
});

const recordBtn = document.querySelector(".record-btn");
const player = document.querySelector(".audio-player");

if (navigator.mediaDevices.getUserMedia) {
    var chunks = [];
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then(
        stream => {
        console.log("Authorize success！");

    const mediaRecorder = new MediaRecorder(stream);

    recordBtn.onclick = () => {
        if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            recordBtn.textContent = "Start Recording";
            console.log("End recording");
        } else {
            mediaRecorder.start();
            console.log("Recording...");
            recordBtn.textContent = "Stop Recording";
        }
        console.log("Record status: ", mediaRecorder.state);
    };

    mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
    };

    mediaRecorder.onstop = e => {
        var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        var audioURL = window.URL.createObjectURL(blob);
        player.src = audioURL;
    };
},
    () => {
        console.error("Authorize failed！");
    }
);
} else {
    console.error("Browser doesn't support getUserMedia");
}


class Player {
    constructor(selector, percent, callback) {
        this.selector = selector;
        this.percent = percent || 0;
        this.callback = callback || function () {};

        this.progress = document.getElementById(this.selector);
        this.bar = this.progress.getElementsByClassName('progress-bar')[0];
        this.cur = this.progress.getElementsByClassName('progress-cur')[0];
        this.btn = this.progress.getElementsByClassName('progress-btn')[0];

        this.minLength = this.progress.offsetLeft;
        this.maxLength = this.progress.offsetWidth + this.minLength;

        // 窗口大小改变偏移量重置
        window.onresize = () => {
            this.minLength = this.progress.offsetLeft;
            this.maxLength = this.progress.offsetWidth + this.minLength;
        };

        // 鼠标点击按钮事件
        this.btn.onmousedown = e => {
            e.preventDefault();
            // console.log('鼠标点击进度按钮');
            this.btnIsClick = true;
        };

        // 进度条整体的鼠标按下事件
        this.progress.onmousedown = e => {
            // console.log('进度条按下');
            this.move(e);
        };

        // 鼠标移动事件, 用于拖动
        document.onmousemove = e => {
            // console.log('鼠标正在移动');
            if (this.btnIsClick) {
                this.move(e);
            }
        };

        // 鼠标弹起事件，用于释放拖动
        document.onmouseup = e => {
            // console.log('鼠标弹起');
            this.btnIsClick = false;
        };
    }

    /**
     * 进度条拖动
     */
    move(e) {
        let percent = 0;
        if(e.clientX < this.minLength) {
            percent = 0;
        } else if(e.clientX > this.maxLength) {
            percent = 1;
        } else {
            percent = (e.clientX - this.minLength) / (this.maxLength - this.minLength);
        }
        this.callback && this.callback(percent);
        this.goto(percent);
    }

    /**
     * 设置进度条位置
     * @param percent
     */
    goto(percent) {
        this.btn.style.left = (percent * 100) + "%";
        this.cur.style.width = (percent * 100) + "%";
    }
}

let audio = new Audio();
// 此处省略audio的操作逻辑
new Player('progress1', 0, function (val) {
    audio.currentTime = (audio.duration || 0) * val;
});
new Player('progress2', 0, function (val) {
    audio.currentTime = (audio.duration || 0) * val;
});
new Player('progress3', 0, function (val) {
    audio.currentTime = (audio.duration || 0) * val;
});
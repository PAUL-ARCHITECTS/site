const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');

// 音频文件列表
const musicList = [
    './music/audio1.mp3',
    './music/audio2.mp3',
    './music/audio3.mp3',
    './music/audio4.mp3',
    './music/audio5.mp3',
    // 添加更多的音频文件路径
];

let currentTrackIndex = 0; // 当前播放的音频索引

// 更新播放器音频源
function updateAudioSource() {
    audioPlayer.src = musicList[currentTrackIndex];
    audioPlayer.play(); // 自动播放新音频
    updatePlayButton(); // 更新播放/暂停按钮的样式
}

// 播放/暂停切换
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.classList.remove('paused');
    } else {
        audioPlayer.pause();
        playButton.classList.add('paused');
    }
}

// 更新播放/暂停按钮状态
function updatePlayButton() {
    if (audioPlayer.paused) {
        playButton.classList.add('paused'); // 添加暂停样式
    } else {
        playButton.classList.remove('paused'); // 恢复播放样式
    }
}

// 播放下一首音乐
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicList.length; // 循环切换
    updateAudioSource();
}

// 自动播放下一首
audioPlayer.addEventListener('ended', playNextTrack);

// 绑定按钮的播放/暂停切换功能
playButton.addEventListener('click', togglePlayPause);

// 设置默认音量
audioPlayer.volume = 0.60;

// 初始化播放器
updateAudioSource();

// 点击空白处播放下一首
document.body.addEventListener('click', (event) => {
    // 确保点击的不是播放按钮
    if (!event.target.closest('.control-button')) {
        playNextTrack();
    }
});

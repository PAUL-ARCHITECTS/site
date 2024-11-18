// music.js 文件
const audioPlayer = document.getElementById('audio-player');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const playButton = document.getElementById('play-button');
const progressBar = document.getElementById('progress');

// 音频文件列表
const musicList = [
    './music/audio1.mp3',
    './music/audio2.mp3',
    './music/audio3.mp3',
    './music/audio4.mp3',
    './music/audio5.mp3',
    // 添加更多的音频文件路径
];

let currentTrackIndex = 0;

// 更新播放器的音频源
function updateAudioSource() {
    audioPlayer.src = musicList[currentTrackIndex];
    audioPlayer.play(); // 自动播放新音频
    updatePlayButton(); // 更新播放/暂停按钮
}

// 播放/暂停切换
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.classList.remove('paused');
    } else {
        audioPlayer.pause();
        playButton.classList.add('paused');
    }
});

// 上一首
prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + musicList.length) % musicList.length;
    updateAudioSource();
});

// 下一首
nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
    updateAudioSource();
});

// 更新进度条
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
});


audioPlayer.volume = 0.60;
// 初始化播放器
updateAudioSource();

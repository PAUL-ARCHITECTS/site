import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// 获取图片元素
const imageDisplay = document.getElementById('imageDisplay');

// 图片数组
const imagePaths = [
  'images/image1.png',
  'images/image2.png',
  'images/image3.png',
  'images/image4.png',
  'images/image5.png'
];

let currentIndex = -1; // 当前图片索引，-1表示未显示任何图片
let fadeTimeout; // 定时器

// 更新图片函数
function updateImage(index) {
  if (index >= 0 && index < imagePaths.length) {
    currentIndex = index;
    imageDisplay.src = imagePaths[currentIndex];
    imageDisplay.style.opacity = 1;

    // 清除之前的淡出定时器
    clearTimeout(fadeTimeout);

    // 设置新的淡出定时器
    fadeTimeout = setTimeout(() => {
      imageDisplay.style.opacity = 0;
      currentIndex = -1; // 隐藏图片后重置索引
    }, 4600); // 60秒后淡出
  }
}

// 监听屏幕点击事件
window.addEventListener('click', (event) => {
  const screenWidth = window.innerWidth;

  if (currentIndex === -1) {
    // 如果当前未显示任何图片，直接显示第一张
    updateImage(0);
  } else {
    // 检查点击位置是屏幕左边还是右边
    if (event.clientX < screenWidth / 2) {
      // 点击左边，显示上一张图片
      if (currentIndex > 0) {
        updateImage(currentIndex - 1);
      }
    } else {
      // 点击右边，显示下一张图片
      if (currentIndex < imagePaths.length - 1) {
        updateImage(currentIndex + 1);
      }
    }
  }

  // 每次点击后调整图片大小
  if (img.complete) { // 确保图片已经加载完成
    adjustImageSize(img);
  } else {
    img.onload = function() {
      adjustImageSize(img); // 图片加载完成后调整尺寸
    };
  }
});

// 初始化：确保图片隐藏
imageDisplay.style.opacity = 0;

const img = document.getElementById('imageDisplay');

// 调整图片大小的函数
function adjustImageSize(img) {
  const originalWidth = img.naturalWidth; // 图片原始宽度
  const originalHeight = img.naturalHeight; // 图片原始高度

  // 获取父容器的宽度和高度
  const containerWidth = img.parentElement.clientWidth;
  const containerHeight = img.parentElement.clientHeight;

  // 计算缩放因子，确保图片适应容器且最大缩放倍数为3.5
  const scaleFactorWidth = Math.min(containerWidth / originalWidth, 3.5);
  const scaleFactorHeight = Math.min(containerHeight / originalHeight, 3.5);

  // 设置图片尺寸
  img.style.width = `${originalWidth * scaleFactorWidth}px`;
  img.style.height = `${originalHeight * scaleFactorHeight}px`;
};

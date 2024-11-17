import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建梯形锥体
function createTrapezoidalPyramid() {
  const geometry = new THREE.BufferGeometry();
  
  // 顶点位置
  const vertices = new Float32Array([ 
    -2, -2, 0,  // 底面左
     2, -2, 0,  // 底面右
     1,  2, 0,  // 底面右上
    -1,  2, 0,  // 底面左上
     0,  0, 2   // 顶点
  ]);

  // 顶点索引 (定义面)
  const indices = [
    0, 1, 4, // 底面左-右-顶
    1, 2, 4, // 底面右-右上-顶
    2, 3, 4, // 底面右上-左上-顶
    3, 0, 4  // 底面左上-左-顶
  ];

  // 将顶点和索引添加到几何体中
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  // 计算法线
  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const pyramid = new THREE.Mesh(geometry, material);
  return pyramid;
}

// 创建梯形锥体并添加到场景
const pyramid = createTrapezoidalPyramid();
scene.add(pyramid);

// 设置相机的位置
camera.position.z = 8;

// 声明 lineMesh 为全局变量
let lineMesh; 

// 创建一个空物体作为旋转中心
const pivot = new THREE.Object3D();
scene.add(pivot);  // 将空物体添加到场景中

// 设置空物体的位置作为旋转中心
pivot.position.set(0, 0, 0); // 旋转中心

// 加载字体并创建文字
async function loadFontAndCreateText() {
  const loader = new THREE.FontLoader();
  const font = await new Promise((resolve, reject) => {
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', resolve, undefined, reject);
  });

  // 创建文本几何体
  const textGeometry = new THREE.TextGeometry('Paul Architect', {
    font: font,
    size: 25,  // 字体大小
    height: 0.2,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.05,
    bevelOffset: 0.03,
    bevelSegments: 5
  });

  // 获取文本的包围盒并计算其宽度
  textGeometry.computeBoundingBox();
  const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;

  // 使文本几何体成为线框
  const edges = new THREE.EdgesGeometry(textGeometry); // 获取文本的边缘几何体
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000762 });
  lineMesh = new THREE.Mesh(textGeometry, lineMaterial);  // 使用LineSegments绘制文本的边缘

  // 设置文本和线框的位置，使其居中
  lineMesh.position.set(-textWidth / 2, -textHeight / 2, 2);  // 对齐中心

  pivot.add(lineMesh);
}

loadFontAndCreateText().catch(err => console.error("Font loading failed:", err));

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 让梯形锥体旋转
  pyramid.rotation.x += 0.01;
  pyramid.rotation.y += 0.01;

  // 检查 lineMesh 是否已加载
  if (pivot) {
    pivot.rotation.x += 0.01;
    pivot.rotation.y += 0.01;
  }

  
  // 渲染场景
  renderer.render(scene, camera);
}

animate();

// 监听窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



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
});

// 初始化：确保图片隐藏
imageDisplay.style.opacity = 0;

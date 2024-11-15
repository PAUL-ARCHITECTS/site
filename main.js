import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
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
    3, 0, 4, // 底面左上-左-顶
    0, 1, 2, // 底面左-右-右上
    0, 2, 3  // 底面左-右上-左上
  ];

  // 将顶点和索引添加到几何体中
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  // 计算法线
  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const pyramid = new THREE.Mesh(geometry, material);
  return pyramid;
}

// 创建梯形锥体并添加到场景
const pyramid = createTrapezoidalPyramid();
scene.add(pyramid);

// 设置相机的位置
camera.position.z = 8;

// 加载字体并创建文字
async function loadFontAndCreateText() {
  const loader = new THREE.FontLoader();
  const font = await new Promise((resolve, reject) => {
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', resolve, undefined, reject);
  });

  // 创建文本几何体
  const textGeometry = new THREE.TextGeometry('Paul Architect', {
    font: font,
    size: 3,  // 字体大小
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
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // 使用红色线框材质
  const lineMesh = new THREE.LineSegments(edges, lineMaterial);  // 使用LineSegments绘制文本的边缘

  // 设置文本和线框的位置，使其居中
  lineMesh.position.set(-textWidth / 2, -textHeight / 2, 2);  // 对齐中心
  // lineMesh.rotation.x = -1;

  scene.add(lineMesh);
}

loadFontAndCreateText().catch(err => console.error("Font loading failed:", err));

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 让梯形锥体旋转
  pyramid.rotation.x += 0.01;
  pyramid.rotation.y += 0.01;
  

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

// 图片数组，根据鼠标位置改变显示的图片
const imagePaths = [
  'images/image1.png',
  'images/image2.png',
  'images/image3.png',
  'images/image4.png',
  'images/image5.png'
];

// 监听鼠标移动事件
window.addEventListener('mousemove', (event) => {
  // 获取鼠标的屏幕坐标
  const mouseX = event.clientX / window.innerWidth; // 0到1之间
  const mouseY = event.clientY / window.innerHeight; // 0到1之间

  // 根据鼠标位置更新图片
  const imageIndex = Math.floor(mouseX * imagePaths.length); // 根据鼠标的 X 坐标选择图片（0~4）
  
  // 更新图片源
  imageDisplay.src = imagePaths[imageIndex];

  // 显示图片并添加淡入效果
  imageDisplay.style.opacity = 1;
});

// 监听触摸移动事件
window.addEventListener('touchmove', (event) => {
  if (isTouchEvent) {
    // 获取触摸的屏幕坐标
    const touchX = event.touches[0].clientX / window.innerWidth; // 0到1之间
    const touchY = event.touches[0].clientY / window.innerHeight; // 0到1之间

    // 根据触摸位置更新图片
    const imageIndex = Math.floor(touchX * imagePaths.length); // 根据触摸的 X 坐标选择图片（0~4）

    // 更新图片源
    imageDisplay.src = imagePaths[imageIndex];

    // 显示图片并添加淡入效果
    imageDisplay.style.opacity = 1;
  }
});

// 监听鼠标离开事件，隐藏图片
window.addEventListener('mouseout', () => {
  imageDisplay.style.opacity = 0;
});

// 监听触摸结束事件，隐藏图片
window.addEventListener('touchend', () => {
  if (isTouchEvent) {
    imageDisplay.style.opacity = 0;
  }
});

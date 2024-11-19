let earthTexture; // 纹理变量
let earthMaterialColor = [ 100, 200, 255 ]; // 颜色材质

function preload() {
    // 预加载地球纹理
    earthTexture = loadImage('./images/2k_moon.jpg');
    earthTexture1 = loadImage('./images/2k_earth_nightmap.png');
    earthTexture2 = loadImage('./images/2k_moon.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);  // 使用 WEBGL 渲染模式
    noStroke();  // 去除球体边框
}

function draw() {
    background(0);  // 设置背景为黑色

    directionalLight(255, 255, 255, -0.5, -0.3, 0) * 5;  // 白色光源，方向为右侧（x: 1, y: 0, z: 0）
    directionalLight(255, 255, 255, -0.5, -0.3, 0) * 5;  // 白色光源，方向为右侧（x: 1, y: 0, z: 0）
    directionalLight(255, 255, 255, -0.5, -0.3, 0) * 5;  // 白色光源，方向为右侧（x: 1, y: 0, z: 0）
    directionalLight(50, 50, 150, 0.5, -0.3, 0) * 5;  // 白色光源，方向为右侧（x: 1, y: 0, z: 0）

    // directionalLight(200, 200, 200, 0.8, -1, 0) * 5;  // 白色光源，方向为右侧（x: 1, y: 0, z: 0）


    // 动画效果：让地球旋转
    rotateY(frameCount * 0.005);  // 旋转地球
    // 第一个地球：纹理材质
    push();
    translate(-400, 0, 0);  // 设置第一个地球的位置
    texture(earthTexture);  // 应用纹理
    sphere(8);  // 创建球体
    pop();

    // 第二个地球：颜色材质
    push();
    translate(0, 0, 0);  // 设置第二个地球的位置
    texture(earthTexture1); // 使用颜色材质
    sphere(200);  // 创建球体
    pop();

    // 第三个地球：光泽材质
    push();
    translate(400, 0, 0);  // 设置第三个地球的位置
    texture(earthTexture2);  // 使用光泽材质
    shininess(50);  // 设置光泽度
    sphere(8);  // 创建球体
    pop();

    // 第三个地球：光泽材质
    push();
    translate(0, 400, 0);  // 设置第三个地球的位置
    texture(earthTexture2);  // 使用光泽材质
    shininess(50);  // 设置光泽度
    sphere(8);  // 创建球体
    pop();


    // 第三个地球：光泽材质
    push();
    translate(0, -400, 0);  // 设置第三个地球的位置
    texture(earthTexture2);  // 使用光泽材质
    shininess(50);  // 设置光泽度
    sphere(8);  // 创建球体
    pop();

    // 第三个地球：光泽材质
    push();
    translate(0, 0, 400);  // 设置第三个地球的位置
    texture(earthTexture2);  // 使用光泽材质
    shininess(50);  // 设置光泽度
    sphere(8);  // 创建球体
    pop();

    // 第三个地球：光泽材质
    push();
    translate(0, 0, -400);  // 设置第三个地球的位置
    texture(earthTexture2);  // 使用光泽材质
    shininess(50);  // 设置光泽度
    sphere(8);  // 创建球体
    pop();


    // 动画效果：让地球旋转
    rotateY(frameCount * 0.005);  // 旋转地球
}

// 响应窗口调整
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
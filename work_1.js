import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
        // 创建场景、相机和渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 创建两个立方体
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube1 = new THREE.Mesh(geometry, material);
        const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));

        // 设置立方体的初始位置
        cube1.position.x = -1;
        cube2.position.x = 1;

        scene.add(cube1);
        scene.add(cube2);

        // 设置相机的位置
        camera.position.z = 5;

        // 渲染函数
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // 监听滚动事件
        window.addEventListener('scroll', () => {
            // 获取页面滚动的距离，取决于浏览器的滚动情况
            const scrollPosition = window.scrollY;

            // 根据滚动位置改变立方体的位置，滚动越多，立方体分得越远
            const separation = Math.min(scrollPosition / 100, 5); // 控制最大分隔距离

            cube1.position.x = -1 - separation; // 立方体1向左移动
            cube2.position.x = 1 + separation;  // 立方体2向右移动
        });

        const container = document.getElementById('three-container');
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

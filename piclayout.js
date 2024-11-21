function setup() {
    noCanvas(); // 不需要画布

    // 定义图片的路径数组
    const imagePaths = [
        './images/0017.jpg',
        './images/building_blocks_by_psion005.jpg',
        './images/Appendix 07. Background photograph for the obliqatory aerial view 1.jpg',
        './images/1269800092-toledo-glass-sanaa-5924.jpg',
        './images/Untitled-2.jpg',
    ];

        // 定义图片的路径数组
        const textPaths = [
            'VOLUME',
            'CITY',
            'HISTORY',
            'OPERA',
            'AIRPORT STATION',
        ];

    // 遍历图片路径数组，创建容器和内容
    for (let i = 0; i < imagePaths.length; i++) {
        // 创建一个容器 div
        let container = createDiv();
        // container.style('margin-top', '3px');
        container.style('text-align', 'center');
        container.style('width', '100vw');
        // container.style('padding-top', '10px');
        container.style('z-index', '10');
        container.style('z-index', '10');
        container.style('display', 'block');
        container.style('overflow', 'none');

        
        // 检查索引值决定背景颜色
        if (i % 2 === 1) {
            container.style('background-color', '#000000'); // 白色背景

            // 添加文字到白色背景容器
            let text = createP(textPaths[i]);;
            text.style('z-index', '11');
            text.style('margin', '0');
            text.style('color', '#ffffff'); // 黑色文字
            text.style('font-size', '3vw');
            text.parent(container); // 添加到容器中
            text.style('padding-top', '2vh');
            container.style('background-color', '#000000'); // 黑色背景
            text.style('padding-bottom', '1vh');

            // 添加图片到黑色背景容器
            let img = createImg(imagePaths[i]);
            text.style('z-index', '10');
            img.style('width', '50%');
            img.style('height', 'auto');
            // img.style('display', 'block');
            img.parent(container); // 添加到容器中
            img.style('padding-bottom', '10px');
        } else {
            container.style('background-color', '#000000'); // 黑色背景

                        // 添加文字到白色背景容器
            let text = createP(textPaths[i]);;
            text.style('margin', '0');
            text.style('color', '#ffffff'); // 黑色文字
            text.style('font-size', '3vw');
            text.parent(container); // 添加到容器中
            text.style('padding-top', '2vh');
            text.style('padding-bottom', '1vh');
            
            
            // 添加图片到黑色背景容器
            let img = createImg(imagePaths[i]);
            img.style('width', '50%');
            img.style('height', 'auto');
            // img.style('display', 'block');
            img.parent(container); // 添加到容器中
            img.style('padding-bottom', '10px');
        }



        



        // 将容器添加到页面
        container.parent('pic-container');
    }
}

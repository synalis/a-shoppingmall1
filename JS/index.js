window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //鼠标经过  显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        }, 2000)
    })
    //动态生成小圆圈  有几张图片生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号  通过自定义属性
        li.setAttribute('index', i);
        //把li插入到ol里面
        ol.appendChild(li);
        //把ol里面的第一个li设置类名为current
        ol.children[0].className = 'current';
        // 小圆圈排他思想   直接在生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function () {
            //干掉所有人
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己
            this.className = 'current';
            //点击小圆圈移动图片  移动ul
            //ul 的移动距离 =  小圆圈的索引号 X 图片的宽度  注意是负值
            //当我们点击了某个小li，就拿到当前小li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个小li，就要把这个li的索引号给num
            num = index;
            circle = index;
            console.log(focusWidth);
            console.log(index);
            animate(ul, index * -focusWidth);
        })
    }
    //克隆第一张图片  放在ul最后面   写在小圆圈的下面，所以克隆的一份没有算在添加小圆圈的上面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮  图片滚动一张
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    //flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到了最后复制的一张图片， 此时  我们的ul要快速复原left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, num * -focusWidth, function () {
                flag = true;   //打开节流阀
            });

            //点击右侧按钮，小圆圈跟着一起变化  声明一个控制小圆圈的播放
            circle++;
            //如果circle=4，说明走到克隆的图片上面了
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到了最后复制的一张图片， 此时  我们的ul要快速复原left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, num * -focusWidth, function () {
                flag = true;
            });
            //点击右侧按钮，小圆圈跟着一起变化  声明一个控制小圆圈的播放
            circle--;
            //如果circle<0，说明第一张图片，则小圆圈改为di4个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    // 自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000)
})
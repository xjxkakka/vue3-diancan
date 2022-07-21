function remSize() {
    //获取当前屏幕的宽度  后面兼容IE
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    //一般设计稿都是750
    if (deviceWidth >= 750) {
        //如果屏幕大于750基本就是电脑了，让他等于750
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    document.querySelector("body").style.fontSize = 0.3 + 'rem'
    //设计稿是 750px
    //设置 一半的宽度，那么就是 375px
    // 1rem == 100px 的设计稿宽度
    //表达一半的宽度就是 3.75rem
}

remSize();
window.onresize = function () {
    remSize();
}

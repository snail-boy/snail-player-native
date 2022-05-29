<div align='center'>
<h1>snail-player-native</h1>
<h4>一个纯原生代码编写的h5视频播放器, 功能完善，基本满足使用，仅供学习，禁止商用</h4>


![issure](https://img.shields.io/github/issues/snail-boy/snail-player-native)
![forks](https://img.shields.io/github/forks/snail-boy/snail-player-native)
![stars](https://img.shields.io/github/stars/snail-boy/snail-player-native)
[![license](https://img.shields.io/github/license/snail-boy/snail-player-native)](https://github.com/snail-boy/snail-player-native/blob/master/LICENSE)




[演示](https://user-images.githubusercontent.com/34472552/170834852-9630c348-7aef-49d9-8b4e-20c6f55a068b.mp4)

[演示加速](https://webrabbit.oss-cn-beijing.aliyuncs.com/drawingbed/snailplayer%E6%BC%94%E7%A4%BA.mp4)

<div align='left'>


## Install

```js

1. git clone https://github.com/snail-boy/snail-player-native.git
2. 拷贝lib目录下的文件到自己项目里


```

## Usage
直接运行index.html


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    #snailPlayId {
      width: 800px;
      height: 500px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
    }
  </style>
</head>
<body>
<h1>snail-player</h1>
<div id='snailPlayId'></div>

</body>
<script type="module">
  import SnailPlayer from "./lib/index.js";
  new SnailPlayer({
    el: '#snailPlayId',
    src: 'https://webrabbit.oss-cn-beijing.aliyuncs.com/drawingbed/video.mp4',
    autoplay: true, // 是否自动播放
    loop: true // 是否循环播放
  })
</script>
</html>

```

## Some Code
<h3>main.js</h3>

```js
// 计算进度条时间
progressTime(offsetY) {
  return utils.formatSeconds((offsetY / this.progressw * this.playVideo.duration).toFixed(2))
}


// 进度条计算公式
progressCalculate() {
  return (this.progressw / this.playVideo.duration * this.playVideo.currentTime).toFixed(2)
}


// 全屏
fullScreenFun() {
  const docElm = document.documentElement
  if (!this.isFullScreen) {
    utils.addClass(this.el, 'fullscreen-active')
    utils.addClass(this.playVideo, 'fullscreen-active')
    utils.showClass('snail-player-full-screen-icon')
    utils.hiddenClass('snail-player-fullscreen-btn')
    utils.changeInnerText('fullscreen-icon', '退出全屏')
    utils.addClass(this.playBottom, 'sn-player-fullscreen-bottom-active')
    setTimeout(() => {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (document.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
    }, 100)
    this.isFullScreen = true
    utils.hiddenClass('snail-player-web-fullscreen-box')
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    utils.showClass('snail-player-web-fullscreen-box')
    utils.removeClass(this.el, 'fullscreen-active')
    utils.removeClass(this.playVideo, 'fullscreen-active')
    utils.hiddenClass('snail-player-full-screen-icon')
    utils.showClass('snail-player-fullscreen-btn')
    utils.changeInnerText('fullscreen-icon', '进入全屏')
    utils.removeClass(this.playBottom, 'sn-player-fullscreen-bottom-active')
    this.isFullScreen = false
  }
}



```


<h3>index.js</h3>

```
//加载css
renderCss(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.type='text/css';
  link.rel = 'stylesheet';
  link.href = url;
  head.appendChild(link);
}

//加载favicon
renderIcon(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.type='type="image/x-icon"';
  link.rel = 'shortcut icon';
  link.href = url;
  head.appendChild(link);
}
```

<h3>Utils</h3>

```js

class Utils {
  hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\s|^)' + cls + '(\s|$)'))
  }
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += ' ' + cls
  }
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      const reg = new RegExp('(\s|^)' + cls + '(\s|$)')
      ele.className = ele.className.replace(reg, '')
    }
  }
  set(key, value) {
    localStorage.setItem(key, value)
  }

  get(key) {
    return  localStorage.getItem(key)
  }
  showClass(cls) {
    cls ? document.getElementsByClassName(cls)[0].style.display = 'block' : new Error('请输入类名')
  }
  hiddenClass(cls) {
    cls ? document.getElementsByClassName(cls)[0].style.display = 'none' : new Error('请输入类名')
  }
  changeInnerText(cls, text) {
    document.getElementsByClassName(cls)[0].innerHTML = text
  }

  clickfu(to, cls){
    //回调函数，to为点击对象
    to.setAttribute("class",cls);
    const siblings = to.parentNode.childNodes;
    for(let i=0; i<siblings.length; i++)
      if(siblings[i].nodeType == 1 && siblings[i] != to)siblings[i].className = '';
  }

  formatSeconds(value) {
    if(!value) return '00:00'
    value = parseInt(value);
    let time;
    if (value > -1) {
     let hour = Math.floor(value / 3600);
     let min = Math.floor(value / 60) % 60;
     let sec = value % 60;
     let day = parseInt(hour / 24);
      if (day > 0) {
        hour = hour - 24 * day;
        time = day + "day " + hour + ":";
      } else if (hour > 0) {
        time = hour + ":";
      }else {
        time = "";
      }
      if (min < 10) {
        time += "0";
      }
      time += min + ":";
      if (sec < 10) {
        time += "0";
      }
      time += sec;
    }
    return time;
  }

  classEle(cls) {
    return  cls && document.getElementsByClassName(cls)[0]
  }

}

export default Utils
```


## Function

- 按空格键暂停播放
- 点击屏幕暂停播放
- 视频进度条拖拽，区分颜色
- 鼠标移动到进度条上方显示时间
- 视频快进慢放
- 视频声音控制
- 画中画
- 整屏播放
- 双击全屏播放
- 等


## 运行环境
```
支持es6的各种浏览器
最好用chrome
```


</div>

</div>

## 源码地址，欢迎star

[github地址](https://github.com/snail-boy/snail-player-native)

[gitee地址](https://gitee.com/snailwebboy/snail-player-native)

## 欢迎留言issues

[Issues](https://github.com/snail-boy/snail-player-native/issues)



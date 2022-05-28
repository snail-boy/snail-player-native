

<div align='center'>

# snail-player-native
一个纯原生代码编写的h5视频播放器, 功能完善，基本满足使用，仅供学习，禁止商用



[//]: # ([![license]&#40;https://img.shields.io/badge/license-MIT-yellowgreen&#41;]&#40;LICENSE&#41;)
[//]: # ([![npm]&#40;https://img.shields.io/badge/npm-vue2.6.11-blue&#41;]&#40;https://www.npmjs.com/package/vue-sms-check-code&#41;)


[演示]()


<div align='left'>


<h3>Install</h3>

```js

1,git clone https://github.com/snail-boy/snail-player-native.git

```

<h3>Usage</h3>
### 直接运行index.html


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



</div>

</div>

<h3>源码地址，欢迎star</h3>

[github地址](https://github.com/snail-boy/snail-player-native)

[gitee地址](https://gitee.com/snailwebboy/snail-player-native)

##欢迎留言issues

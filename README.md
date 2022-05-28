

<div align='center'>

# snail-player-native
一个h5视频播放器, 功能高度完善，基本满足使用。原生插件。仅供学习，禁止商用



[//]: # ([![license]&#40;https://img.shields.io/badge/license-MIT-yellowgreen&#41;]&#40;LICENSE&#41;)
[//]: # ([![npm]&#40;https://img.shields.io/badge/npm-vue2.6.11-blue&#41;]&#40;https://www.npmjs.com/package/vue-sms-check-code&#41;)


[演示]()


<div align='left'>


<h3>Install</h3>

```js

1,npm install snail-player --save

2,import VueSmsCode from 'snail-player'

3
// html
<div id='snailPlayWrapper'></div>


// vue:
this.$nextTick(() => {
    new SnailPlayer({
        el: '#snailPlayVideos',
        src: require('@/assets/video2.mp4'),
        autoplay: true,
        loop: true
    })
})

// js
window.onload = function () {
  new SnailPlayer({
    el: '#snailPlayWrapper',
    src: require('@/assets/video2.mp4'),
    autoplay: true,
    loop: true
  })
}

```

```vue

<vue-sms-check-code
    title='请输入验证码' 
    :code-num='6'
    :is-error='isError'
    error-color='#D81A1A'
    @finish='getSmsCode'
/>
```

| 事件  |  说明  | 默认  |  类型
|:----: |:----: |:----: | :----: 
| title    | 组件标题   | 请输入验证码 | string
| code-num | 验证码个数 | 6   | number
| is-error | 验证码是否错误 | false | boolean
| error-color | 验证码错误时显示的错误颜色 | #D81A1A | string


| 方法          | 说明   | 默认   |  类型
|:----: |:----: |:----: | :----: 
| finish       | 验证码值 | '' | string



<h3>Usage</h3>

```vue
<template>
  <div id="app">
    <vue-sms-check-code
        title='请输入验证码'
        :codeNum='6'
        :is-error='isError'
        error-color='#D81A1A'
        @finish='getSmsCode'
    />
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isError: false, // 验证码错误
      msg: ''
    }
  },
  methods: {
    getSmsCode(val) {
      this.isError = false
      this.msg = val
      setTimeout(() => {
        this.isError = val !== '888888';
        if(val === '888888') {
          this.msg = '验证码输入成功'
        }
      }, 1000)
    }
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
</style>

```

</div>

</div>

<h3>源码地址，欢迎star</h3>

[github地址](https://github.com/snail-boy/vue-sms-check-code)

[gitee地址](https://gitee.com/snailwebboy/vue-sms-check-code)

import Utils from './utils'

let utils = new Utils()

class main {
  constructor(opt = {}) {
    this.el = null
    this.playVideo = null
    this.playFunc = null
    this.timer = null
    this.src = opt.src
    this.videoSrc = null
    this.fullScreen = null
    this.playBottom = null
    this.totalTime = null
    this.currentTime = null
    this.playerBtn = null
    this.progress = null // 进度条
    this.progressw = null // 进度条宽度
    this.progressFinish = null // 播完的进度
    this.videoWrapper = null // 播放器区域
    this.startAndPause = null // 开始暂停键
    this.startAndPauseStart = null // 开始按钮
    this.startAndPausePause = null // 暂停按钮
    this.rollTime = null // 滚动时间
    this.playDot = null // 拖拽点
    this.playing = false
    this.dbClickTimer = null // 但双击定时器
    this.voiceDot = null // 声音按钮
    this.voiceProgress = null // 声音进度条
    this.voiceProgressFinish = null // 声音进度条完成
    this.voiceNum = null // 声音值
    this.voiceBtn = null // 声音按钮
    this.webFullScreen = null // 网页全屏
    this.isFullScreen = false // 是否全屏
    this.isWebFullScreen = false // 是否网页全屏
    this.progresscache = null // 缓存进度条
    this.speedWrapper = null // 倍速ul
    this.speedText = null // 倍速文字
    this.picture = null // 画中画dom
    this.getEle()
  }

  getEle() {
    this.el = document.getElementsByClassName('snail-wrapper')[0]
    this.playVideo = document.getElementById('snailPlayVideo')
    this.playVideo.getElementsByTagName('source')[0].setAttribute('src', this.src)
    this.videoSrc = this.playVideo.getElementsByTagName('source')[0]
    // console.log(this.src, 'videmo')
    this.playFunc = document.getElementsByClassName('sn-player-progress-wrapper')[0]
    this.fullScreen = document.getElementsByClassName('snail-player-fullscreen')[0]
    this.playBottom = document.getElementsByClassName('sn-player-bottom-wrapper')[0]
    this.playerBtn = document.getElementsByClassName('sn-player-btn')[0]
    this.progress = utils.classEle('sn-player-progress')
    this.progressFinish = utils.classEle('sn-player-progress-player')
    this.videoWrapper = utils.classEle('sn-player-video-wrapper')

    this.startAndPause = utils.classEle('sn-player-start-end-box')
    this.startAndPauseStart = utils.classEle('sn-player-start-end-start')
    this.startAndPausePause = utils.classEle('sn-player-start-end-pause')

    this.rollTime = utils.classEle('sn-player-roll-time')
    this.playDot = utils.classEle('sn-player-progress-player-dot')
    this.voiceDot = utils.classEle('sn-player-progress-voice-dot')

    this.voiceBtn = utils.classEle('sn-player-voice-controller')
    this.voiceProgress = utils.classEle('sn-player-voice-progress')
    this.voiceProgressFinish = utils.classEle('sn-player-voice-progress-finish')

    this.voiceNum = utils.classEle('sn-player-voice-number')

    this.progressw = this.progress.getBoundingClientRect().width


    // 网页全屏
    this.webFullScreen = utils.classEle('snail-player-web-fullscreen')

    // 缓存进度条
    this.progresscache = utils.classEle('sn-player-progress-cache')

    // 倍速
    this.speedWrapper = utils.classEle('sn-player-speed-ul')
    this.speedText = utils.classEle('sn-player-detail-speed-btn')

    this.picture =  document.getElementById('picture')


    setTimeout(() => {
      this.init()
    }, 300)

    this.funcToShow()

    this.setValue()

    this.videoFunc()
    // 视频进度条
    this.eventFun()

    // 声音进度条
    this.voiceProgressFun()

    //画中画技术
    this.pictureInPicture()
  }

  init() {
    this.playerOperate()
    // 总时间
    this.totalTime = utils.formatSeconds(this.playVideo.duration)
    utils.changeInnerText('sn-player-total-time', this.totalTime)

    // 播放时间当前时间
    this.playVideo.ontimeupdate = () => {
      this.currentTime = utils.formatSeconds(this.playVideo.currentTime)
      utils.changeInnerText('sn-player-current-time', this.currentTime)
      // 进度条滚动
      this.progressFinish.style.width = this.progressCalculate() + 'px'
      this.playDot.style.left = this.progressCalculate() + 'px'

      // 缓存进度条
      let percentage = +(this.playVideo.buffered.end(this.playVideo.buffered.length - 1) / this.playVideo.duration).toFixed(2)
      this.progresscache.style.width = Math.floor(this.progress.getBoundingClientRect().width * percentage) + 'px'

    }

    // 播放结束后
    this.playVideo.onended = () => {
      utils.hiddenClass('sn-player-player-pause')
      utils.showClass('sn-player-player-start')
      utils.removeClass(this.startAndPauseStart, 'sn-player-start-end-box-active')
      utils.addClass(this.startAndPausePause, 'sn-player-start-end-box-active')
      this.playing = false
    }

    // 点击任意播放器区域，暂停或开始
    this.videoWrapper.onclick = () => this.playAndPause()

    // 全屏
    this.fullScreen.onclick = () => {
      this.fullScreenFun()
    }

    // 网页全屏
    this.webFullScreen.onclick = () => {
      this.webFullScreenFun()
    }

    // 双击全屏或退出全屏
    this.videoWrapper.ondblclick = () => {
      clearTimeout(this.dbClickTimer)
      this.fullScreenFun()
    }

    let currentTime = (offsetY) => {
      return (offsetY / this.progressw * this.playVideo.duration).toFixed(2)
    }
    // 点击进度条，定位到该位置，播放
    this.progress.onclick = (e) => {
      this.playDot.style.left = e.offsetX + 'px'
      this.progressFinish.style.width = this.playDot.style.left
      this.playVideo.currentTime = currentTime(e.offsetX)
    }

    // 声音按钮
    this.voiceFunc()
    this.voiceBtn.onclick = () =>  {
      this.voiceFunc()
    }

    this.voiceProgress.onclick = (event) => {
      let offsetY = parseInt(this.voiceProgress.getBoundingClientRect().top); // 获取当前的y轴距离
      let topNum = 100 - (event.clientY - offsetY)
      utils.showClass('sn-player-voice-open')
      utils.hiddenClass('sn-player-voice-close')
      if (topNum <= 0) {
        topNum = 0
        utils.hiddenClass('sn-player-voice-open')
        utils.showClass('sn-player-voice-close')
      }else if (topNum >= 100) {
        topNum = 100
        utils.showClass('sn-player-voice-open')
        utils.hiddenClass('sn-player-voice-close')
      }
      this.voiceDot.style.bottom =  topNum + 'px'
      this.voiceProgressFinish.style.height = this.voiceDot.style.bottom

      // 赋值
      utils.changeInnerText('sn-player-voice-number', topNum)
      utils.set('snPlayerVolume', topNum)
      // 控制声音
      this.playVideo.volume = topNum / 130
    }


    // 倍速
    this.speedWrapper.onclick = (e) => {
      if(e.target.innerHTML.indexOf('<li') <= -1) {
        utils.clickfu(e.target, 'sn-player-speed-active')
        this.playVideo.playbackRate = e.target.innerHTML.replace('x', '')
        if(e.target.innerHTML !== '1x') {
          this.speedText.innerHTML = e.target.innerHTML
        }else {
          this.speedText.innerHTML = '倍速'
        }
      }
    }
  }


  // 声音组件
  voiceFunc() {
    let snPlayerVolume = utils.get('snPlayerVolume')
    this.voiceDot.style.bottom = snPlayerVolume + 'px'
    this.voiceProgressFinish.style.height = snPlayerVolume + 'px'

    if(this.voiceNum.innerHTML <= 0) {
      this.playVideo.volume = snPlayerVolume / 130
      utils.showClass('sn-player-voice-open')
      utils.hiddenClass('sn-player-voice-close')
      utils.changeInnerText('sn-player-voice-number', snPlayerVolume)
    }else {
      utils.hiddenClass('sn-player-voice-open')
      utils.showClass('sn-player-voice-close')
      utils.changeInnerText('sn-player-voice-number', 0)
      this.playVideo.volume = 0 / 130
      this.voiceDot.style.bottom = 0 + 'px'
      this.voiceProgressFinish.style.height = 0 + 'px'
    }
  }



  // 监听事件
  eventFun() {
    let _this = this
    // 鼠标移动时，时间随着移动
    this.progress.addEventListener('mouseover', (e) => {
      this.progress.onclick = (e) => {
        this.playDot.style.left = e.offsetX + 'px'
        this.progressFinish.style.width = this.playDot.style.left
        this.playVideo.currentTime = currentTime(e.offsetX)
      }
    })
    this.progress.addEventListener('mousemove', (e) => {
      let left = Math.round(Number(this.playDot.style.left.replace('px', '')))
      if(e.target.getAttribute('class') === 'sn-player-progress-player-dot') {
        this.rollTime.style.left = left -18 + 'px'
        utils.changeInnerText('sn-player-roll-time', this.progressTime(left))
      }else {
        this.rollTime.style.left = e.offsetX - 20 + 'px'
        utils.changeInnerText('sn-player-roll-time', this.progressTime(e.offsetX))
      }
      utils.showClass('sn-player-roll-time')
      // 光标移动到拖砖点上，显示时间
    })

    this.progress.addEventListener('mouseout', (e) => {
      // this.playVideo.pause()
      utils.hiddenClass('sn-player-roll-time')
    })


    let playDotFun = (event) => {
      this.playVideo.pause()
      let leftNum = ''
      this.playDot.style.cursor = "pointer";
      let offsetX = parseInt(this.playDot.style.left); // 获取当前的x轴距离
      let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
      // 鼠标移动的时候不停的修改div的left和top值
      document.onmousemove =  (event) => {
        leftNum = event.clientX - innerX
        this.playDot.style.left = leftNum + "px";
        // 边界判断
        if (parseInt(this.playDot.style.left) <= 0) {
          leftNum = 0
          this.playDot.style.left = "0px";
        }
        if (parseInt(this.playDot.style.left) >= window.innerWidth - parseInt(this.playDot.style.width)) {
          leftNum = window.innerWidth - parseInt(this.playDot.style.width)
          this.playDot.style.left = leftNum + "px";
        }
        this.progressFinish.style.width = this.playDot.style.left
        this.playVideo.currentTime = currentTime(leftNum)


      }
      document.onmouseup =  () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.progress.onclick = null
        this.playVideo.play()
        // cancel()
      }
    }

    let currentTime = (offsetY) => {
      return (offsetY / this.progressw * this.playVideo.duration).toFixed(2)
    }

    this.playDot.addEventListener('mousedown', playDotFun, false)


    // 监听键盘事件
    // 1，监听空格控制播放暂停
    document.addEventListener('keydown', function(e){
      if (e.keyCode === 32) {
        _this.playAndPause()
      }
    });

  }



  // 播放暂停方法
  playAndPause() {
    clearTimeout(this.dbClickTimer)
    this.dbClickTimer = setTimeout(() => {
      if (!this.playing) {
        this.playVideo.play()
        utils.hiddenClass('sn-player-player-start')
        utils.showClass('sn-player-player-pause')
        utils.addClass(this.startAndPauseStart, 'sn-player-start-end-box-active')
        utils.removeClass(this.startAndPausePause, 'sn-player-start-end-box-active')
        this.playing = true
      } else {
        this.playVideo.pause()
        utils.hiddenClass('sn-player-player-pause')
        utils.showClass('sn-player-player-start')
        utils.removeClass(this.startAndPauseStart, 'sn-player-start-end-box-active')
        utils.addClass(this.startAndPausePause, 'sn-player-start-end-box-active')
        this.playing = false
      }
    }, 300)
  }



  // 声音进度条
  voiceProgressFun() {

    let voiceDotFun = (event) => {
      let offsetY = parseInt(this.voiceProgress.getBoundingClientRect().top); // 获取当前的y轴距离

      let topNum = ''

      // 鼠标移动的时候不停的修改div的left和top值
      document.onmousemove =  (event) => {
        topNum = 100 - (event.clientY - offsetY)
        this.voiceDot.style.bottom = 100 - (event.clientY - offsetY) + "px";
        // 边界判断
        if (parseInt(this.voiceDot.style.bottom) <= 0) {
          topNum = 0
          this.voiceDot.style.bottom = "0px";
          // 控制按钮
          utils.hiddenClass('sn-player-voice-open')
          utils.showClass('sn-player-voice-close')
        }else {
          utils.showClass('sn-player-voice-open')
          utils.hiddenClass('sn-player-voice-close')
        }

        if (parseInt(this.voiceDot.style.bottom) >= 100) {
          topNum = 100
          this.voiceDot.style.bottom = "100px";
        }

        this.voiceProgressFinish.style.height = topNum + 'px'

        // 赋值
        utils.changeInnerText('sn-player-voice-number', topNum)

        utils.set('snPlayerVolume', topNum)
        // 控制声音
        this.playVideo.volume = topNum / 130


      }
      document.onmouseup =  () => {
        document.onmousemove = null;
        document.onmouseup = null;
        // this.voiceDot.play()
        // cancel()
      }
    }


    this.voiceDot.addEventListener('mousedown', voiceDotFun, false)


  }


  // 计算进度条时间
  progressTime(offsetY) {
    return utils.formatSeconds((offsetY / this.progressw * this.playVideo.duration).toFixed(2))
  }


  // 进度条计算公式
  progressCalculate() {
    return (this.progressw / this.playVideo.duration * this.playVideo.currentTime).toFixed(2)
  }

  // 声音计算公式
  voiceCalculate(Y, y, X) {
    let x =  y / Y * X
    return x
  }

  funcToShow() {
    this.playVideo.onmouseover = () => {
      clearTimeout(this.timer)
      utils.addClass(this.playFunc, 'func-active')
    }

    this.playVideo.onmouseout = () => {
      this.timer = setTimeout(() => {
        utils.removeClass(this.playFunc, 'func-active')
      }, 100)
    }

    this.playFunc.onmouseover = () => {
      clearTimeout(this.timer)
      utils.addClass(this.playFunc, 'func-active')
    }
    this.playFunc.onmouseout = () => {
      this.timer = setTimeout(() => {
        utils.removeClass(this.playFunc, 'func-active')
      }, 100)
    }
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

  // 网页全屏
  webFullScreenFun() {
    if (!this.isWebFullScreen) {
      utils.addClass(this.el, 'fullscreen-active')
      utils.addClass(this.playVideo, 'fullscreen-active')
      utils.showClass('snail-player-web-close-fullscreen-btn')
      utils.hiddenClass('snail-player-web-fullscreen-btn')
      utils.changeInnerText('web-fullscreen-icon', '退出网页全屏')
      utils.addClass(this.playBottom, 'sn-player-web-fullscreen-bottom-active')
      this.isWebFullScreen = true
    } else {
      utils.removeClass(this.el, 'fullscreen-active')
      utils.removeClass(this.playVideo, 'fullscreen-active')
      utils.hiddenClass('snail-player-web-close-fullscreen-btn')
      utils.showClass('snail-player-web-fullscreen-btn')
      utils.changeInnerText('web-fullscreen-icon', '进入网页全屏')
      utils.removeClass(this.playBottom, 'sn-player-web-fullscreen-bottom-active')
      this.isWebFullScreen = false
    }
  }


  // 设置值
  setValue() {

  }

  videoFunc() {

  }

  // 操作
  playerOperate() {
    this.playerBtn.onclick = () => {
      if (!this.playing) {
        this.playVideo.play()
        utils.hiddenClass('sn-player-player-start')
        utils.showClass('sn-player-player-pause')
        this.playing = true
      } else {
        this.playVideo.pause()
        utils.hiddenClass('sn-player-player-pause')
        utils.showClass('sn-player-player-start')
        this.playing = false
      }
    }
  }


  // 画中画技术

  pictureInPicture() {
    var pipWindow;
    let _this = this
    this.picture.addEventListener('click', function(event) {
      // 禁用按钮，防止二次点击
      this.disabled = true;
      try {
        if (_this.playVideo !== document.pictureInPictureElement) {
          // 尝试进入画中画模式
          _this.playVideo.requestPictureInPicture();
        } else {
          // 退出画中画
          document.exitPictureInPicture();
        }
      } catch(error) {
        // log('&gt; 出错了！' + error);
      } finally {
        this.disabled = false;
      }
    });

// 点击切换按钮可以触发画中画模式，
// 在有些浏览器中，右键也可以切换，甚至可以自动进入画中画模式
// 因此，一些与状态相关处理需要在专门的监听事件API中执行
    _this.playVideo.addEventListener('enterpictureinpicture', function(event) {
      console.log('&gt; 视频已进入Picture-in-Picture模式');
      pipWindow = event.pictureInPictureWindow;
      console.log('&gt; 视频窗体尺寸为：'+ pipWindow.width +' x ' + pipWindow.height);

      // 添加resize事件，一切都是为了测试API
      pipWindow.addEventListener('resize', onPipWindowResize);
    });
// 退出画中画模式时候
    _this.playVideo.addEventListener('leavepictureinpicture', function(event) {
      console.log('&gt; 视频已退出Picture-in-Picture模式');
      // 移除resize事件
      pipWindow.removeEventListener('resize', onPipWindowResize);
    });
// 视频窗口尺寸改变时候执行的事件
    let onPipWindowResize = function (event) {
      console.log('&gt; 窗口尺寸改变为：'+ pipWindow.width +' x ' + pipWindow.height);
    }
    /* 特征检测 */
    if ('pictureInPictureEnabled' in document == false) {
      console.log('当前浏览器不支持视频画中画。');
      // togglePipButton.disabled = true;
    }
  }

}

export default main

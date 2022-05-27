
class Utils {
  constructor() {

  }
  hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += ' ' + cls
  }
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
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

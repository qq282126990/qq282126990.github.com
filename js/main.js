$(document).ready(function () {


  $('a.blog-button').click(function () {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 2000) {
      $('.panel-cover').addClass('panel-cover--collapsed');
    } else {
      $('.panel-cover').css('max-width', currentWidth);
      $('.panel-cover').animate({ 'max-width': '320px', 'width': '22%' }, 400, swing = 'swing', function () { });
    }


  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function () {
    // 导航按钮被点击
    // this.style.backgroundColor = '#fff'; 设置颜色后会自动消失
  });
});


const data = {
  a: {
    b: 1
  }
}

function walk (data) {
  for (let key in data) {
    const dep = []
    let val = data[key] // 缓存字段原有的值
    // 如果 val 是对象，递归调用 walk 函数将其转为访问器属性
    const nativeString = Object.prototype.toString.call(val)

    if (nativeString === '[object Object]') {
      walk(val)
    }

    Object.defineProperty(data, key, {
      set (newVal) {
        // 如果值没有变什么都不做
        if (newVal === val) return
        // 使用新值替换旧值
        val = newVal

        dep.forEach(fn => fn())
      },
      get () {
        // 此时 Target 变量中保存的就是依赖函数
        dep.push(Target)

        // 将该值返回
        return val
      }
    })
  }
}


// Target 是全局变量
let Target = null;
walk(data)

function $watch (exp, fn) {
  Target = fn
  let pathArr,
      obj = data
  // 检查 exp 中是否包含 .
  if (/\./.test(exp)) {
    // 将字符串转为数组，例：'a.b' => ['a', 'b']
    pathArr = exp.split('.')
    // 使用循环读取到 data.a.b
    pathArr.forEach(p => {
      obj = obj[p]
    })
    return
  }
  data[exp]
}


$watch('a.b', () => {
  console.log('修改了字段 a.b')
})
// 在<pre tabIndex="0" className="chroma">下方插入<div className="hljs-tag">markdown</div>的代码，其中markdown为代码的语言。
var pre = document.getElementsByTagName("pre");
for (var i = 0; i < pre.length; i++) {
  var code = pre[i].getElementsByTagName("code")[0];
  var lang = code.className;
  var div = document.createElement("div");
  div.className = "hljs-tag";
  div.innerHTML = lang;
  pre[i].insertBefore(div, code);
}
// 在<div className="hljs-tag">markdown</div>下面继续插入<div className="hljs-tag-shadow">markdown</div>的代码，其中markdown为代码的语言。
var hljsTag = document.getElementsByClassName("hljs-tag");
for (var i = 0; i < hljsTag.length; i++) {
  var div = document.createElement("div");
  div.className = "hljs-tag-shadow";
  div.innerHTML = hljsTag[i].innerHTML;
  hljsTag[i].insertAdjacentElement("afterend", div);
}
// 去掉"hljs-tag"和"hljs-tag-shadow"中的language-，只保留markdown。
var hljsTag = document.getElementsByClassName("hljs-tag");
for (var i = 0; i < hljsTag.length; i++) {
  hljsTag[i].innerHTML = hljsTag[i].innerHTML.replace("language-", "");
}
var hljsTagShadow = document.getElementsByClassName("hljs-tag-shadow");
for (var i = 0; i < hljsTagShadow.length; i++) {
  hljsTagShadow[i].innerHTML = hljsTagShadow[i].innerHTML.replace(
    "language-",
    ""
  );
}
// 如果"hljs-tag"和"hljs-tag-shadow"中的code.className没有值，则这2个div不显示。同时，将当前所属的.post-content pre code的padding值修改为16px;但是不影响其他.post-content pre code的padding值为padding: 32px 16px 16px;。
var hljsTag = document.getElementsByClassName("hljs-tag");
var hljsTagShadow = document.getElementsByClassName("hljs-tag-shadow");
var pre = document.getElementsByTagName("pre");
for (var i = 0; i < hljsTag.length; i++) {
  if (hljsTag[i].innerHTML == "") {
    hljsTag[i].style.display = "none";
    hljsTagShadow[i].style.display = "none";
    pre[i].getElementsByTagName("code")[0].style.padding = "16px";
  }
}
// 如果"hljs-tag"和"hljs-tag-shadow"中的code.className有值，则这2个div显示。
var hljsTag = document.getElementsByClassName("hljs-tag");
var hljsTagShadow = document.getElementsByClassName("hljs-tag-shadow");
for (var i = 0; i < hljsTag.length; i++) {
  if (hljsTag[i].innerHTML != "") {
    hljsTag[i].style.display = "block";
    hljsTagShadow[i].style.display = "block";
  }
}

// 控制Hamburger按钮
var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-menu-main-mobile');
var menuContainer = document.querySelector('#menu-main-mobile');
var hamburgerIcon = document.querySelector('.hamburger');

if (menuTrigger !== null) {
  menuTrigger.addEventListener('click', function (e) {
    menuContainer.classList.toggle('open');
    hamburgerIcon.classList.toggle('is-active');
    body.classList.toggle('lock-scroll');
  });
}

// 自动隐藏菜单栏
const f = document.querySelector(".header"),
  t = window.scrollY,
  a = 200,
  n = 100;
let o = 0,
  r = t;
window.addEventListener("scroll", () => {
  const t = window.scrollY;
  t > r && t > a ? f.classList.add("hidden") : t < r && (o += r - t, o > n && (f.classList.remove("hidden"), o =
    0)), r = t
})
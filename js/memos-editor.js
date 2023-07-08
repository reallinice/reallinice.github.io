var memosDom = document.querySelector(memosData.dom)
var editIcon =
  "<div class='load-memos-editor post-description'>Why do we remember bеautiful lies? We end up rеgretting them most of our lives.</div>"
var memosEditorCont =
  '<div class="memos-editor animate__animated animate__fadeIn d-none col-12"><div class="memos-editor-body mb-3 p-3"><div class="memos-editor-inner animate__animated animate__fadeIn"><div class="memos-editor-content"><textarea class="memos-editor-inputer text-sm" rows="1" placeholder="唠叨点什么..."></textarea></div><div class="memos-editor-tools pt-3"><div class="d-flex"><div class="button outline action-btn tag-btn mr-2"><img src="https://www.lixiangqian.com/img/memos/memos_tag.svg"></div><div class="button outline action-btn image-btn mr-2" onclick="this.lastElementChild.click()"><img src="https://www.lixiangqian.com/img/memos/memos_img_up.svg"><input class="memos-upload-image-input d-none" type="file" accept="image/*"></div><div class="button outline p-2 action-btn todo-btn mr-2"><img src="https://www.lixiangqian.com/img/memos/memos_list.svg"></div><div class="button outline action-btn code-btn mr-2"><img src="https://www.lixiangqian.com/img/memos/memos_code.svg"></div><div class="button outline action-btn mr-2 link-btn"><img src="https://www.lixiangqian.com/img/memos/memos_link.svg"></div><div class="button outline action-btn p-2 random-btn"><img src="https://www.lixiangqian.com/img/memos/memos_random_n.svg"></div><div class="button outline action-btn switchUser-btn"><img src="https://www.lixiangqian.com/img/memos/memos_user.svg"></div></div><div class="d-flex flex-fill"><div class="memos-tag-list d-none mt-2 animate__animated animate__fadeIn"></div></div></div><div class="memos-editor-footer border-t pt-3 mt-3"><div class="editor-selector mr-2"><select class="select-memos-value outline px-2 py-1"><option value="PUBLIC">所有人可见</option><option value="PROTECTED">仅登录可见</option><option value="PRIVATE">仅自己可见</option></select></div><div class="editor-submit d-flex flex-fill justify-content-end"><div class="primary submit-memos-btn px-3 py-1">唠叨一下</div></div></div></div><div class="memos-editor-option animate__animated animate__fadeIn"><input name="memos-api-url" class="memos-open-api-input input-text flex-fill mr-3 px-2 py-1" type="text" value="" maxlength="120" placeholder="OpenAPI"><div class="memos-open-api-submit"><div class="primary submit-openapi-btn px-3 py-1">保存</div></div></div></div><div class="memos-random d-none"></div></div>'

const element = document.querySelector(".intro") // 选择器是你想要操作的元素的选择器
element.insertAdjacentHTML("afterend", editIcon)
memosDom.insertAdjacentHTML("afterbegin", memosEditorCont)

var memosEditorInner = document.querySelector(".memos-editor-inner")
var memosEditorOption = document.querySelector(".memos-editor-option")
var memosRadomCont = document.querySelector(".memos-random")

var taglistBtn = document.querySelector(".tag-btn")
var todoBtn = document.querySelector(".todo-btn")
var todoBtn = document.querySelector(".todo-btn")
var codeBtn = document.querySelector(".code-btn")
var linkBtn = document.querySelector(".link-btn")
var randomBtn = document.querySelector(".random-btn")
var switchUserBtn = document.querySelector(".switchUser-btn")
var loadEditorBtn = document.querySelector(".load-memos-editor")
var submitApiBtn = document.querySelector(".submit-openapi-btn")
var submitMemoBtn = document.querySelector(".submit-memos-btn")
var memosVisibilitySelect = document.querySelector(".select-memos-value")
var openApiInput = document.querySelector(".memos-open-api-input")
var uploadImageInput = document.querySelector(".memos-upload-image-input")
var memosTextarea = document.querySelector(".memos-editor-inputer")

document.addEventListener("DOMContentLoaded", () => {
  getEditIcon()
})

function getEditIcon() {
  var memosContent = "",
    memosVisibility = "",
    memosResource = []
  var memosCount =
    window.localStorage && window.localStorage.getItem("memos-response-count")
  var memosPath =
    window.localStorage && window.localStorage.getItem("memos-access-path")
  var memosOpenId =
    window.localStorage && window.localStorage.getItem("memos-access-token")
  var getEditor =
    window.localStorage && window.localStorage.getItem("memos-editor-display")
  var isHide = getEditor === "hide"
  memosTextarea.addEventListener("input", (e) => {
    memosTextarea.style.height = "inherit"
    memosTextarea.style.height = e.target.scrollHeight + "px"
  })

  if (getEditor !== null) {
    document.querySelector(".memos-editor").classList.toggle("d-none", isHide)
    getEditor == "show" ? hasMemosOpenId() : ""
  }

  loadEditorBtn.addEventListener("click", function () {
    getEditor != "show" ? hasMemosOpenId() : ""
    document.querySelector(".memos-editor").classList.toggle("d-none")
    window.localStorage &&
      window.localStorage.setItem(
        "memos-editor-display",
        document.querySelector(".memos-editor").classList.contains("d-none")
          ? "hide"
          : "show"
      )
    getEditor =
      window.localStorage && window.localStorage.getItem("memos-editor-display")
  })

  taglistBtn.addEventListener("click", function () {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    if (memosPath && memosOpenId) {
      document.querySelector(".memos-tag-list").classList.toggle("d-none")
    }
  })

  todoBtn.addEventListener("click", function () {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    if (memosPath && memosOpenId) {
      let memoTodo = "- [ ] \n"
      memosTextarea.value += memoTodo
      memosTextarea.style.height = memosTextarea.scrollHeight + "px"
    }
  })

  codeBtn.addEventListener("click", function () {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    if (memosPath && memosOpenId) {
      let memoCode = "```\n\n```"
      let textareaH = memosTextarea.clientHeight
      memosTextarea.value += memoCode
      memosTextarea.style.height = memosTextarea.scrollHeight + "px"
    }
  })

  linkBtn.addEventListener("click", function () {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    if (memosPath && memosOpenId) {
      let memoLink = "[]()"
      memosTextarea.value += memoLink
    }
  })

  randomBtn.addEventListener("click", function () {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    memosCount =
      window.localStorage && window.localStorage.getItem("memos-response-count")
    if (memosPath && memosOpenId) {
      let randomNum = random(0, memosCount)
      let randomUrl = memosPath + "/api/memo/all?&limit=1&offset=" + randomNum
      fetch(randomUrl)
        .then((res) => {
          if (res.status == 200) {
            return res.json()
          } else {
            cocoMessage.error("出错了，再检查一下吧!")
          }
        })
        .then((resdata) => {
          updateAvatarUrl(resdata.data)
        })
        .catch((err) => {
          cocoMessage.error("网络错误")
        })
    }
  })

  uploadImageInput.addEventListener("change", () => {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    if (memosPath && memosOpenId) {
      let filesData = uploadImageInput.files[0]
      if (uploadImageInput.files.length !== 0) {
        uploadImage(filesData)
      }
    }
  })

  async function uploadImage(data) {
    const imageData = new FormData()
    const blobUrl = memosPath + "/api/resource/blob?openId=" + memosOpenId
    imageData.append("file", data, data.name)
    const resp = await fetch(blobUrl, {
      method: "POST",
      body: imageData,
    })
    const res = await resp.json().then((res) => {
      if (res.data.id) {
        cocoMessage.success("上传成功", () => {
          memosResource.push(res.data.id)
          window.localStorage &&
            window.localStorage.setItem(
              "memos-resource-list",
              JSON.stringify(memosResource)
            )
        })
      }
    })
  }

  switchUserBtn.addEventListener("click", function () {
    memosPath =
      window.localStorage && window.localStorage.getItem("memos-access-path")
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    if (memosPath && memosOpenId) {
      memosEditorOption.classList.remove("d-none")
      memosEditorInner.classList.add("d-none")
      memosRadomCont.innerHTML = ""
      openApiInput.value = ""
    }
  })

  submitApiBtn.addEventListener("click", function () {
    if (openApiInput.value == null || openApiInput.value == "") {
      cocoMessage.info("内容不能为空")
    } else {
      getMemosData(openApiInput.value)
    }
  })

  submitMemoBtn.addEventListener("click", function () {
    memosContent = memosTextarea.value
    memosVisibility = memosVisibilitySelect.value
    memosResource =
      window.localStorage &&
      JSON.parse(window.localStorage.getItem("memos-resource-list"))
    memosOpenId =
      window.localStorage && window.localStorage.getItem("memos-access-token")
    let hasContent = memosContent.length !== 0
    if (memosOpenId && hasContent) {
      let memoUrl = memosPath + "/api/memo?openId=" + memosOpenId
      let memoBody = {
        content: memosContent,
        visibility: memosVisibility,
        resourceIdList: memosResource,
      }
      fetch(memoUrl, {
        method: "post",
        body: JSON.stringify(memoBody),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        if (res.status == 200) {
          cocoMessage.success("发送成功", () => {
            location.reload()
          })
        }
      })
    } else if (!hasContent) {
      cocoMessage.info("内容不能为空")
    } else {
      cocoMessage.info("请设置 Memos Open API", () => {
        memosEditorInner.classList.add("d-none")
        memosEditorOption.classList.remove("d-none")
      })
    }
  })

  function hasMemosOpenId() {
    if (!memosOpenId) {
      memosEditorInner.classList.add("d-none")
      cocoMessage.info("请设置 Memos Open API")
    } else {
      memosEditorOption.classList.add("d-none")
      // cocoMessage.success('准备就绪');
      let tagUrl = memosPath + "/api/tag?openId=" + memosOpenId
      let response = fetch(tagUrl)
        .then((response) => response.json())
        .then((resdata) => {
          return resdata.data
        })
        .then((response) => {
          let taglist = ""
          response.map((t) => {
            taglist +=
              '<div class="memos-tag d-flex text-xs mt-2 mr-2"><a class="d-flex px-2 justify-content-center" onclick="setMemoTag(this)">#' +
              t +
              "</a></div>"
          })
          document.querySelector(".memos-tag-list").innerHTML = taglist
          memosRadomCont.classList.remove("d-none")
        })
        .catch((err) => cocoMessage.error("Memos Open API 有误，请重新输入!"))
    }
  }

  function random(a, b) {
    var choices = b - a + 1
    return Math.floor(Math.random() * choices + a)
  }

  function getMemosData(e) {
    let apiReg = /openId=([^&]*)/,
      urlReg = /(.+?)(?:\/api)/
    fetch(e)
      .then((res) => {
        if (res.status == 200) {
          return res.json()
        } else {
          cocoMessage.error("出错了，再检查一下吧!")
        }
      })
      .then((resdata) => {
        if (typeof resdata !== "undefined") {
          let apiRes = e.match(apiReg),
            urlRes = e.match(urlReg)[1]
          memosOpenId = apiRes[1]
          memosPath = urlRes
          memosCount = resdata.data.length
          window.localStorage &&
            window.localStorage.setItem("memos-access-path", urlRes)
          window.localStorage &&
            window.localStorage.setItem("memos-access-token", memosOpenId)
          window.localStorage &&
            window.localStorage.setItem("memos-response-count", memosCount)
          cocoMessage.success("保存成功", () => {
            memosEditorOption.classList.add("d-none")
            memosEditorInner.classList.remove("d-none")
            memosPath =
              window.localStorage &&
              window.localStorage.getItem("memos-access-path")
            memosOpenId =
              window.localStorage &&
              window.localStorage.getItem("memos-access-token")
            hasMemosOpenId()
          })
        }
      })
  }

  function updateAvatarUrl(e) {
    let avatarUrl = memosPath + "/api/user/me?openId=" + memosOpenId
    fetch(avatarUrl)
      .then((res) => {
        if (res.status == 200) {
          return res.json()
        } else {
          cocoMessage.error("出错了，再检查一下吧!")
        }
      })
      .then((resdata) => {
        let d = resdata.data
        e.map((item) => {
          return (item.avatarUrl = d.avatarUrl)
        })
        updateHTMl(e)
      })
  }

  // 插入 html
  function updateHTMl(data) {
    var result = "",
      resultAll = ""
    const TAG_REG = /#([^\s#]+?) /g,
      IMG_REG = /\!\[(.*?)\]\((.*?)\)/g //content 内 md 格式图片
    marked.setOptions({
      breaks: false,
      smartypants: false,
      langPrefix: "language-",
      headerIds: false,
      mangle: false,
    })
    for (var i = 0; i < data.length; i++) {
      var bbContREG = data[i].content.replace(TAG_REG, "").replace(IMG_REG, "")
      bbContREG = marked.parse(bbContREG)

      //解析 content 内 md 格式图片
      var IMG_ARR = data[i].content.match(IMG_REG) || "",
        IMG_ARR_Grid = ""
      if (IMG_ARR) {
        var IMG_ARR_Length = IMG_ARR.length,
          IMG_ARR_Url = ""
        if (IMG_ARR_Length !== 1) {
          var IMG_ARR_Grid = " grid grid-" + IMG_ARR_Length
        }
        IMG_ARR.forEach((item) => {
          let imgSrc = item.replace(/!\[.*?\]\((.*?)\)/g, "$1")
          IMG_ARR_Url +=
            '<figure class="gallery-thumbnail"><img loading="lazy" decoding="async" class="img thumbnail-image" loading="lazy" decoding="async" src="' +
            imgSrc +
            '"/></figure>'
        })
        bbContREG +=
          '<div class="resimg' + IMG_ARR_Grid + '">' + IMG_ARR_Url + "</div>"
      }
      //TAG 解析
      var tagArr = data[i].content.match(TAG_REG)
      var memosTag = ""

      if (tagArr) {
        memosTag = tagArr
          .map(function (tag) {
            var tagText = String(tag).replace(/[#]/g, "")
            return '<p class="tag-span"># ' + tagText + "</p>"
          })
          .join("")
      } else {
        memosTag = '<p class="tag-span"># 日常</p>'
      }

      //解析内置资源文件
      if (data[i].resourceList && data[i].resourceList.length > 0) {
        var resourceList = data[i].resourceList
        var imgUrl = "",
          resUrl = "",
          resImgLength = 0
        for (var j = 0; j < resourceList.length; j++) {
          var restype = resourceList[j].type.slice(0, 5)
          var resexlink = resourceList[j].externalLink
          var resLink = "",
            fileId = ""
          if (resexlink) {
            resLink = resexlink
          } else {
            fileId = resourceList[j].publicId || resourceList[j].filename
            resLink = memos + "o/r/" + resourceList[j].id + "/" + fileId
          }
          if (restype == "image") {
            imgUrl +=
              '<figure class="gallery-thumbnail"><img loading="lazy" decoding="async" class="img thumbnail-image" src="' +
              resLink +
              '"/></figure>'
            resImgLength = resImgLength + 1
          }
          if (restype !== "image") {
            resUrl +=
              '<a target="_blank" rel="noreferrer" href="' +
              resLink +
              '">' +
              resourceList[j].filename +
              "</a>"
          }
        }
        if (imgUrl) {
          var resImgGrid = ""
          if (resImgLength !== 1) {
            var resImgGrid = "grid grid-" + resImgLength
          }
          bbContREG +=
            '<div class="resimg ' + resImgGrid + '">' + imgUrl + "</div></div>"
        }
        if (resUrl) {
          bbContREG += '<p class="datasource">' + resUrl + "</p>"
        }
      }
      result += `
      <li class="memos-random-background">
      <div class="memos-pl">
      ${memosTag}
          </div>
          <div class="datacont">${bbContREG}</div>
          <div class="memos_diaoyong_top">
          <span class="memos_diaoyong_from">
            @ <a href="/memos">reallinice</a>
          </span>
          <span class="memos_diaoyong_time">${moment(
            data[i].createdTs * 1000
          ).twitterLong()}</span>
      </div>
      </li>`
    } // end for
    var bbBefore = "<section class='bb-timeline'><ul class='bb-list-ul'>"
    var bbAfter = "</ul></section>"
    memosRadomCont.innerHTML = result
  }
}

function setMemoTag(e) {
  let memoTag = e.textContent + " "
  memosTextarea.value += memoTag
}

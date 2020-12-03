const express = require('express')
const open = require('open')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const svgCaptcha = require('svg-captcha')
const cors = require('cors')
const http = require('http')
const WebSocket = require('ws')
const _ = require('lodash')
const image = require("imageinfo");


/* const { createProxyMiddleware } = require('http-proxy-middleware') */



const app = express()
const port = 8081
const server = http.createServer(app)//express返回的app就是用来传给createServer的
const wss = new WebSocket.Server({ server })



//投票id到定阅这个投票信息更新的websocker的映射
var voteIdMapWs = {}

wss.on('connection', async (ws, req) => {
  var voteId = req.url.split('/').slice(-1)[0]
  console.log('将会把投票', voteId, '的实时信息发送到客户端')

  var voteInfo = await db.get('SELECT rowid AS id, * FROM votes WHERE id = ?', voteId)
  if (Date.now() > new Date(voteInfo.deadline).getTime()) {
    ws.close()
  }

  if (voteId in voteIdMapWs) {
    voteIdMapWs[voteId].push(ws)
  } else {
    voteIdMapWs[voteId] = [ws]
  }

  ws.on('close', () => {
    voteIdMapWs[voteId] = voteIdMapWs[voteId].filter(it => it !== ws)
  })
})


/***
 *   http-proxy-middleware
 */
/* const options = {
  target: 'http://localhost:3000/', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {},
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:8081': 'http://localhost:3000',
  },
};
const exampleProxy = createProxyMiddleware(options);
app.use('/api', exampleProxy); */

/*
*数据库
*/
let db
const dbPromise = require('./vote-db.js')
const { slice } = require('lodash')
dbPromise.then(value => {
  db = value
})


app.locals.pretty = true
//跨域设置
var webPath = ['http://localhost:3000/', 'http://localhost:3001/']
app.use(cors({
  maxAge: 86400,
  origin: webPath,
  credentials: true,
}))

// 上传地址：
const uploader = multer({ dest: __dirname + '/uploads/' })
const uploader_resources = multer({ dest: __dirname + '/resources/vote_img' })

// 访问地址：
app.use(express.static(__dirname + '/static'))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/resources', express.static(__dirname + '/resources'))
app.use(express.json()) //Content-Type: application/json
app.use(express.urlencoded({ extended: true })) //Content-Type: application/x-www-form-urlencoded

// cookie & session
app.use(cookieParser('lkjweoij2o3i409e'))
var sessionStroe = Object.create(null)
app.use(function sessionMW(req, res, next) {
  if (req.cookies) {
    req.session = sessionStroe[req.cookies.sessionId]
    if (!req.session) {
      req.session = sessionStroe[req.cookies.sessionId] = {}
    }
  } else {
    let id = Math.random().toString(16).slice(2)
    req.session = sessionStroe[id] = {}
    res.cookie('sessionId', id, {
      maxAge: 86400000,
    })
  }
  next()
})
app.use(async (req, res, next) => {
  if (req.signedCookies.user) {
    req.user = await db.get('SELECT * FROM user WHERE name = ?', req.signedCookies.user)
  }
  next()
})


// *
app.get('/userinfo', async (req, res, next) => {
  //console.log('req.user:', req.user)
  if (req.user) {
    res.json(req.user)
  } else {
    res.json({
      code: 0,
      msg: '未登录'
    })
  }
})

// *
app.get('/getcarousel', async (req, res, next) => {
  function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
      var stat = fs.statSync(path + itm);
      if (stat.isDirectory()) {
        //递归读取文件
        readFileList(path + itm + "/", filesList)
      } else {
        var obj = {};//定义一个对象存放文件的路径和名字
        obj.path = path;//路径
        obj.filename = itm//名字
        filesList.push(obj);
      }
    })
  };
  var getFiles = {
    getFileList: function (path) {
      var filesList = [];
      readFileList(path, filesList);
      return filesList;
    },
    getImageFiles: function (path) {
      var imageList = [];
      this.getFileList(path).forEach((item) => {
        var ms = image(fs.readFileSync(item.path + item.filename));
        ms.mimeType && (imageList.push(item.path + item.filename))
      });
      console.log(imageList)
      res.send(imageList);
      return imageList;
    }
  }
  getFiles.getImageFiles("./resources/carousel/")
})
//*Login_and_register_carousel
app.get('/Login_and_register_carousel', async (req, res, next) => {
  function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
      var stat = fs.statSync(path + itm);
      if (stat.isDirectory()) {
        //递归读取文件
        readFileList(path + itm + "/", filesList)
      } else {
        var obj = {};//定义一个对象存放文件的路径和名字
        obj.path = path;//路径
        obj.filename = itm//名字
        filesList.push(obj);
      }
    })
  };
  var getFiles = {
    getFileList: function (path) {
      var filesList = [];
      readFileList(path, filesList);
      return filesList;
    },
    getImageFiles: function (path) {
      var imageList = [];
      this.getFileList(path).forEach((item) => {
        var ms = image(fs.readFileSync(item.path + item.filename));
        ms.mimeType && (imageList.push(item.path + item.filename))
      });
      console.log(imageList)
      res.send(imageList);
      return imageList;
    }
  }
  getFiles.getImageFiles("./resources/Login_and_register_carousel/")
})

// * 精彩案例
app.get('/getvotecard', async (req, res, next) => {
  function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
      var stat = fs.statSync(path + itm);
      if (stat.isDirectory()) {
        //递归读取文件
        readFileList(path + itm + "/", filesList)
      } else {
        var obj = {};//定义一个对象存放文件的路径和名字
        obj.path = path;//路径
        obj.filename = itm//名字
        filesList.push(obj);
      }
    })
  };
  var getFiles = {
    getFileList: function (path) {
      var filesList = [];
      readFileList(path, filesList);
      return filesList;
    },
    getImageFiles: function (path) {
      var imageList = [];
      this.getFileList(path).forEach((item) => {
        var ms = image(fs.readFileSync(item.path + item.filename));
        // vote:id   avator path   title   desc
        let voteId
        let info = {}


        ms.mimeType && (imageList.push(item.path + item.filename))
      });
      res.send(imageList);
      return imageList;
    }
  }
  getFiles.getImageFiles("./resources/carousel/")
})


//* 接收创建投票的图片，返回图片所在位置
app.post('/createvoteimg', uploader_resources.single('img'), async (req, res, next) => {
  console.log('req.body::::::::::::', req.body)
  console.log('req.files::::::::::::', req.file)

  var file = req.file

  var targetName = file.path + '-' + file.originalname

  await fsp.rename(file.path, targetName)

  var imgOnlineUrl = '/resources/vote_img/' + path.basename(targetName)
  console.log('avatarOnlineUrl::::::', imgOnlineUrl)
  res.json({ imgOnlineUrl })

})

//* 接收创建投票的信息，返回投票id
app.post('/createvote', async (req, res, next) => {
  if (req.user) {
    /**
     * {
     *   title,
     *   desc,
     *   options: ['foo', 'bar'],
     *   deadline,
     *   anonymous,
     *   isMultiple
     * }
     */
    var voteInfo = req.body
    await db.run(
      'INSERT INTO votes VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [voteInfo.title, voteInfo.desc, req.user.id, voteInfo.deadline,
      voteInfo.anonymous, new Date().toISOString(), voteInfo.isMultiple, voteInfo.img
      ]
    )

    var vote = await db.get('SELECT rowid AS id, * FROM votes ORDER BY id DESC LIMIT 1')
    for (var option of voteInfo.options) {
      await db.run(
        'INSERT INTO options VALUES (?, ?, ?)',
        [vote.id, option, 0]
      )
    }

    res.json({
      voteId: vote.id,
      code: 3
    })
  } else {
    res.json({
      code: -3,
      msg: '未登陆无法创建投票'
    })
  }

})






app.route('/login')
  .post(async (req, res, next) => {
    //console.log('req.body:', req.body)
    var loginInfo = req.body
    var user = await db.get(
      'SELECT * FROM users WHERE name = ? AND password = ?',
      [loginInfo.name, loginInfo.password]
    )
    if (user) {
      res.cookie('user', user.name, {
        maxAge: 86400000,
        signed: true,
      })
      res.json(user)
    } else {
      res.json({
        code: -1,
        msg: '登陆失败，用户名或密码错误'
      })
    }
  })

// 创建投票页面
app.post('/vote', async (req, res, next) => {
  if (req.user) {
    /**
     * {
     *   title,
     *   desc,
     *   options: ['foo', 'bar'],
     *   deadline,
     *   anonymous,
     *   isMultiple
     * }
     */
    var voteInfo = req.body
    await db.run(
      'INSERT INTO votes VALUES (?, ?, ?, ?, ?, ?, ?)',
      [voteInfo.title, voteInfo.desc, req.user.id, voteInfo.deadline,
      voteInfo.anonymous, new Date().toISOString(), voteInfo.isMultiple
      ]
    )

    var vote = await db.get('SELECT rowid AS id, * FROM votes ORDER BY id DESC LIMIT 1')
    for (var option of voteInfo.options) {
      await db.run(
        'INSERT INTO options VALUES (?, ?, ?)',
        [vote.id, option, 0]
      )
    }

    res.json({
      voteId: vote.id
    })
  } else {
    res.status(401 /* Unauthorized */).json({
      code: -1,
      msg: '未登陆无法创建投票'
    })
  }
})

// 投票界面
app.get('/vote/:id', async (req, res, next) => {
  //console.log('/vote/:id')
  var id = req.params.id
  var vote = await db.get('SELECT rowid AS id, * FROM votes WHERE id = ?', id)
  if (vote) {
    var options = await db.all('SELECT rowid AS id, * FROM options WHERE voteId = ?', id)
    var votings = await db.all('SELECT votings.rowid AS id, * FROM votings JOIN user ON userId = user.id WHERE voteId = ?', id)
    vote.options = options
    vote.votings = votings
    //console.log(votings)
    res.json(vote)
  } else {
    res.json({
      code: 0
    })
  }
})

// 删除投票
app.post('/deleteVote', async (req, res, next) => {
  await db.run('DELETE FROM votes WHERE rowid = ?', req.body.deleteVoteId)
  await db.run('DELETE FROM options WHERE voteId = ?', req.body.deleteVoteId)
  await db.run('DELETE FROM votings WHERE voteId = ?', req.body.deleteVoteId)
  res.end()
})

// 用户对某个选项发起的投票
app.post('/voteup/:voteId', async (req, res, next) => {
  var voteId = req.params.voteId
  var body = req.body
  var vote = await db.get('SELECT rowid AS id, * FROM votes WHERE id = ?', voteId)

  if (Date.now() > new Date(vote.deadline).getTime()) {
    res.status(401).end({
      code: -1,
      msg: '该问题已过截止日期，不能再投票'
    })
    return
  }
  //console.log(!vote.isMultiple)
  if (!vote.isMultiple) {//单选

    // 删除之前可能投的一票
    await db.run('DELETE FROM votings WHERE userId = ? AND voteId = ?', req.user.id, voteId)
    // 增加这次的选项
    await db.run('INSERT INTO votings VALUES (?, ?, ?)', [voteId, body.optionId, req.user.id])
    res.end()
  } else {//多选
    //console.log('多选加票', req.body)
    await db.run('DELETE FROM votings WHERE voteId = ? AND optionId = ? AND userId = ?', [voteId, body.optionId, req.user.id])
    if (!req.body.isVoteDown) {
      await db.run('INSERT INTO votings VALUES (?, ?, ?)', [voteId, body.optionId, req.user.id])
    }
    res.end()
  }
  broadcast(voteId)
})

var broadcast = _.throttle(async function broadcast(voteId) {
  var websockets = voteIdMapWs[voteId] || []
  var votings = await db.all('SELECT votings.rowid AS id, * FROM votings JOIN user ON userId = user.id WHERE voteId = ?', voteId)
  for (var ws of websockets) {
    ws.send(JSON.stringify(votings))
  }
}, 500, { leading: false })


app.get('/myvotetest', async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      code: -1,
      msg: '用户未登录'
    })
    return
  }
  var myVotes = [
    { id: 0, title: '标题', time: '时间' },
    { id: 1, title: '标dsaf题', time: '时间' },
    { id: 2, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标asdf题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 4, title: '标题', time: '时间' },
    { id: 0, title: '标dfas题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标asd题', time: '时间' },
    { id: 0, title: '标f题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标xz题', time: '时间' },
    { id: 2, title: '标题', time: '时间' },
    { id: 0, title: '标c题', time: '时间' },
    { id: 0, title: '标zxr题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 55, title: '标题', time: '时间' },
    { id: 50, title: '标e题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标r题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 2, title: '标题', time: '时间' },
    { id: 0, title: '标y题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标tu题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 2, title: '标题y', time: '时间' },
    { id: 2, title: '标题i', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标u题', time: '时间' },
    { id: 2, title: '标o题', time: '时间' },
    { id: 2, title: '标iu题', time: '时间' },
    { id: 0, title: '标o题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标op题', time: '时间' },
    { id: 0, title: '标io题', time: '时间' },
    { id: 2, title: '标题', time: '时间' },
    { id: 2, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 2, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 2, title: '标题yufi', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标uy题', time: '时间' },
    { id: 0, title: '标r题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标r题', time: '时间' },
    { id: 0, title: '标i题', time: '时间' },
    { id: 1, title: '标题', time: '时间' },
    { id: 1, title: '标题', time: '时间' },
    { id: 6, title: '标题', time: '时间' },
    { id: 1, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 6, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 6, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 6, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 6, title: '标题', time: '时间' },
    { id: 7, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 7, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 90, title: '标题', time: '时间' },
    { id: 90, title: '标题', time: '时间' },
    { id: 90, title: '标题', time: '时间' },
    { id: 90, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 0, title: '标题', time: '时间' },
    { id: 99, title: '标题', time: '时间' },
    { id: 100, title: '标题', time: '时间' },
  ]
  res.json(myVotes)
})
app.get('/myvote', async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      code: -1,
      msg: '用户未登录'
    })
    return
  }
  var myVotes = await db.all('SELECT rowid AS id, * FROM votes WHERE userId = ?', req.user.id)

  var myVoteTable = myVotes.map((item, idx) => {
    var condition = (new Date(item.deadline).getTime()) - (new Date(item.createdAt).getTime()) > 0 ? '进行中' : '已完成'
    var newItem = {
      id: item.id,
      title: item.title,
      deadline: item.deadline,
      createdAt: item.createdAt,
      condition
    }
    return newItem
  })

  res.json(myVoteTable)
})

app.get('/logout', async (req, res, next) => {
  res.clearCookie('user')
  res.end()
})

//注册
app.post('/register', async (req, res, next) => {
  if (req.body) {
    var a = req.body.username.toString()[0]
    if (a == '+' || a == '-' || a == '*' || a == '/') {
      res.json({
        code: 2,
        msg: "该用户名不符合要求"
      })
    }
  }
  try {
    //console.log(req.body)
    await db.run('INSERT INTO users VALUES (?, ?, ?, ?)', [req.body.username, req.body.password, req.body.useremail, '/uploads/default-avatar.png']);
    //console.log('222 run ')
    res.json({
      code: 0,
      msg: '注册成功，请前往登录'
    })
  } catch (e) {
    //console.log(e)
    res.json({
      code: -1,
      msg: '注册失败',
      error: e
    })
  }
})

// 修改账户信息
app.post('/revise/username', async (req, res, next) => {
  var hasName = await db.get('SELECT * FROM users WHERE name = ?', req.body.username)
  if (hasName) {
    res.json({
      code: 0,
      msg: '该名称已被占用，请重新命名'
    })
  }
  console.log(req.user)
  try {
    await db.run('UPDATE users SET name = ? WHERE email = ?', req.body.username, req.user.email)
    res.json({
      code: 1,
      msg: '用户名修改成功'
    })
  } catch (e) {
    console.log(e)
    res.json({
      code: 0,
      msg: '用户名修改失败，请重新尝试'
    })
  }
})
app.post('/revise/password', async (req, res, next) => {
  var oldPassword = req.body.oldPassword
  var newPassword = req.body.newPassword
  /* var isUser = await db.get('SELECT * FROM users WHERE name = ?', req.user.name) */
  if (oldPassword == req.user.password) {
    try {
      await db.run('UPDATE users SET password = ? WHERE email = ?', newPassword, req.user.email)
      res.json({
        code: 5,
        msg: '修改成功'
      })
    } catch (e) {
      res.json({
        code: -5,
        msg: e
      })
    }

  } else {
    res.json({
      code: -5.5,
      msg: '旧密码错误，修改失败'
    })
  }
})
app.post('/revise/avatar', uploader.single('avatar'), async (req, res, next) => {
  console.log('进来了')
  var file = req.file
  var targetName = file.path + '-' + file.originalname
  await fsp.rename(file.path, targetName)
  var newAvatarUrl = '/uploads/' + path.basename(targetName)
  console.log('newAvatarUrl::::::', newAvatarUrl)
  try {
    await db.run('UPDATE users SET avatar = ? WHERE email = ?', newAvatarUrl, req.user.email)
    res.json({
      code: 1,
      msg: '头像修改成功',
      newAvatarUrl
    })
  } catch (e) {
    console.log(e)
    res.json({
      code: 0,
      msg: '头像修改失败，请重新尝试',
      newAvatarUrl
    })
  }
})

// 用户名 和 邮箱 冲突检测接口
app.post('/username-conflict-check', async (req, res, next) => {
  //console.log('-----------req.body.username', req.body.username)
  try {
    var username = await db.get('SELECT * FROM users WHERE name = ?', req.body.username)
    //console.log('----------username:', username)
    if (username) {
      res.json({
        code: 0,
        msg: "该用户名已存在，请更换其他名称"
      })
    } else {
      res.json({
        code: 1,
        msg: "用户名符合要求"
      })
    }
  }
  catch (e) {
    console.log(e)
  }
})

app.post('/email-conflict-check', async (req, res, next) => {
  try {
    var useremail = await db.get('SELECT * FROM users WHERE email = ?', req.body.useremail)
    if (useremail) {
      res.json({
        code: 0,
        msg: "该邮箱已被注册"
      })
    }
    res.end()
  } catch (e) {
    console.log(e)
  }
})



/*
*   TodoList
*
 */
var list = ['T110E5', 'IS-4', 'E100', 'CS-63', 'AMX-50B']
app.get('/list/li/h', (req, res, next) => {
  console.log("/list")
  res.json({ list })
})



server.listen(port, '127.0.0.1', () => {
  console.log('server listening on port', port)
  // open('http://localhost:' + port)
})



/*
 app.use((req, res, next) => {
  //console.log(req.cookies, res.cookie)
  next()
})
 */
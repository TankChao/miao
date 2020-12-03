


export const voteCard = [{
  id: 1,
  title: '大熊猫命名',
  desc: '大熊猫 花花 生下来一公一母两只熊猫幼崽，现在网上征集命名投票，共选出三组网友起的名字，请选择您认为合适的名字',
  src: '/resources/vote_img/2acde28192448b9edef0724b4189a849-case_1.jpg',
  avatar: '/uploads/default-avatar.png',
  voteUrl: 'http://localhost:3000/#/viewvote/1'
}, {
  id: 2,
  title: '琅琊榜角色',
  desc: 'XXX影视公司计算拍摄琅琊榜第二季，为了能够更好的迎合观众胃口，将尽力邀请原班人马，所以在这里请选出你认为最好的角色。',
  src: '/resources/vote_img/5c1e533c0d7d6abacf35d7b2a9bb11f4-case_2.jpg',
  avatar: '/uploads/default.png',
  voteUrl: 'http://localhost:3000/#/viewvote/2'
}, {
  id: 3,
  title: '坦克世界车龄调查',
  desc: '坦克世界历经30个月的等待，终于迎来了更新，XXX游戏论坛为了鼓励各位车长对这块游戏的挚爱，将策划一次游戏比赛；为了准备奖品，将调查各位玩家最喜欢的一辆八级金币战车，按受欢迎程度作为参赛奖品。',
  src: '/resources/vote_img/46106f5312a4187424dda4d9220effdc-case_3.jpg',
  avatar: '/uploads/default.png',
  voteUrl: 'http://localhost:3000/#/viewvote/3'
}, {
  id: 4,
  title: '畅销水果调查',
  desc: 'XXX连锁超市计划在 XX 市开店，由于是新地方，且节约库存，防止浪费，需要调查当地市民平时购买最多的水果，请 XX 市民帮助参与调研。',
  src: '/resources/vote_img/7ed2f07e1d6ac7e0db28c126b59ffee9-case_4.jpg',
  avatar: '/uploads/default-avatar.png',
  voteUrl: 'http://localhost:3000/#/viewvote/4'
}, {
  id: 5,
  title: '煎蛋口味',
  desc: 'XXX饭店的煎蛋一直很畅销，为了应对早高峰的早餐问题，现在需要调查市民最喜欢的煎蛋口味',
  src: '/resources/vote_img/029a3e77d7a0a0a1ad2ad76b1b62a2c4-case_6.jpg',
  avatar: '/uploads/tong.webp',
  voteUrl: 'http://localhost:3000/#/viewvote/5'
}, {
  id: 6,
  title: '你家猫咪吃什么牌子猫粮',
  desc: '你家猫咪吃什么牌子猫粮',
  src: '/resources/vote_img/0935f19ed05c27060159dd65cbd4ec6e-u=1313675812,3986899066&fm=26&gp=0.jpg',
  avatar: '/uploads/default-avatar.png',
  voteUrl: 'http://localhost:3000/#/viewvote/6'
}];



const data = [
  { codo: 0, msg: '未登录' },
  { codo: 1, msg: '已登录' },
  { codo: -1, msg: '用户名或密码不正确' },
  { codo: 2, msg: '录播图加载成功' },

  { codo: -3, msg: '创建投票失败' },
  { codo: 3, msg: '创建投票成功' },

  { codo: 5, msg: '密码修改成功' },
  { codo: -5, msg: '修改失败' },
  { codo: -5.5, msg: '旧密码错误，修改失败' },

]
import Mock from 'mockjs'

// 为避免语法错误，这里提供一个有效的 menuList（20 条示例数据）
const menuList = [
  { id: 1, name: '香辣小龙虾', price: 88, stock: 20, img: '../src/assets/img/foodimg/小龙虾.jpg', desc: '精选鲜活小龙虾，秘制香辣酱料爆炒，鲜香麻辣，回味无穷', category: '热菜' },
  { id: 2, name: '凉拌黄瓜', price: 16, stock: 50, img: '../src/assets/img/foodimg/0.png', desc: '新鲜黄瓜切丝，搭配蒜末、生抽、香醋凉拌，清爽解腻', category: '凉菜' },
  { id: 3, name: '番茄鸡蛋汤', price: 12, stock: 30, img: '../src/assets/img/foodimg/鸡蛋汤.jpeg', desc: '番茄熬制浓汤，加入嫩滑鸡蛋，酸甜开胃，营养丰富', category: '汤品' },
  { id: 4, name: '水煮鱼', price: 68, stock: 15, img: '../src/assets/img/foodimg/水煮鱼.png', desc: '选用新鲜草鱼，搭配豆芽、辣椒，麻辣鲜香，鱼肉嫩滑', category: '热菜' },
  { id: 5, name: '拍黄瓜', price: 14, stock: 40, img: '../src/assets/img/foodimg/拍黄瓜.jpeg', desc: '黄瓜拍碎，加入香菜、小米辣，口感爽脆，香辣可口', category: '凉菜' },
  { id: 6, name: '东坡肉', price: 58, stock: 10, img: '../src/assets/img/foodimg/东坡肉.jpeg', desc: '精选五花肉，慢火焖煮，色泽红亮，肥而不腻，入口即化', category: '热菜' },
  { id: 7, name: '夫妻肺片', price: 32, stock: 25, img: '../src/assets/img/foodimg/夫妻肺片.jpeg', desc: '牛腱肉、牛舌切片，搭配红油、芝麻，麻辣鲜香，经典川菜', category: '凉菜' },
  { id: 8, name: '冬瓜海带排骨汤', price: 28, stock: 18, img: '../src/assets/img/foodimg/冬瓜汤.jpeg', desc: '排骨熬制高汤，加入冬瓜、海带，清淡滋补，适合秋冬', category: '汤品' },
  { id: 9, name: '宫保鸡丁', price: 36, stock: 22, img: '../src/assets/img/foodimg/宫保鸡丁.jpeg', desc: '鸡腿肉切丁，搭配花生米、干辣椒，酸甜微辣，下饭神器', category: '热菜' },
  { id: 10, name: '凉拌三丝', price: 18, stock: 35, img: '../src/assets/img/foodimg/凉拌三丝.jpeg', desc: '土豆丝、胡萝卜丝、粉丝凉拌，色彩鲜艳，口感丰富', category: '凉菜' },
  { id: 11, name: '菌菇鸡汤', price: 42, stock: 12, img: '../src/assets/img/foodimg/菌菇鸡汤.jpg', desc: '老母鸡慢炖，加入多种菌菇，汤鲜味美，营养滋补', category: '汤品' },
  { id: 12, name: '麻婆豆腐', price: 22, stock: 30, img: '../src/assets/img/foodimg/麻婆豆腐.jpeg', desc: '嫩豆腐搭配牛肉末，麻辣鲜香，豆腐嫩滑，香辣下饭', category: '热菜' },
  { id: 13, name: '凉拌藕片', price: 16, stock: 28, img: '../src/assets/img/foodimg/凉拌藕片.jpeg', desc: '莲藕切片焯水，搭配蒜蓉、香油，清脆爽口，解腻开胃', category: '凉菜' },
  { id: 14, name: '酸辣土豆丝', price: 12, stock: 45, img: '../src/assets/img/foodimg/酸辣土豆丝.png', desc: '土豆丝爆炒，加入醋、辣椒，酸辣开胃，家常必备', category: '热菜' },
  { id: 15, name: '皮蛋豆腐', price: 15, stock: 20, img: '../src/assets/img/foodimg/麻婆豆腐.jpeg', desc: '内酯豆腐切块，搭配皮蛋、生抽，清淡爽口，简单美味', category: '凉菜' },
  { id: 16, name: '玉米排骨汤', price: 26, stock: 25, img: '../src/assets/img/foodimg/玉米排骨汤.png', desc: '排骨炖烂，加入甜玉米，汤甜肉香，老少皆宜', category: '汤品' },
  { id: 17, name: '鱼香肉丝', price: 28, stock: 20, img: '../src/assets/img/foodimg/鱼香肉丝.jpeg', desc: '猪肉丝搭配木耳、胡萝卜，鱼香酱汁调味，酸甜适口', category: '热菜' },
  { id: 18, name: '凉拌皮蛋', price: 12, stock: 30, img: '../src/assets/img/foodimg/凉拌皮蛋.jpeg', desc: '皮蛋切块，搭配姜末、醋，风味独特，下酒小菜', category: '凉菜' },
  { id: 19, name: '香菇青菜', price: 16, stock: 35, img: '../src/assets/img/foodimg/香菇青菜.jpeg', desc: '香菇切片，青菜焯水，清炒调味，清淡少油，健康美味', category: '热菜' },
  { id: 20, name: '扬州炒饭', price: 18, stock: 40, img: '../src/assets/img/foodimg/扬州炒饭.jpg', desc: '米饭搭配鸡蛋、火腿、胡萝卜丁，粒粒分明，鲜香可口', category: '主食' }
]

// 分类数据（根据 category 字段进行过滤）
const categoryList = [
  { id: 1, name: '热菜', children: [{ id: 101, name: '招牌热菜', menuList: menuList.filter(item => item.category === '热菜') }] },
  { id: 2, name: '凉菜', children: [{ id: 201, name: '清爽凉菜', menuList: menuList.filter(item => item.category === '凉菜') }] },
  { id: 3, name: '汤品', children: [{ id: 301, name: '滋补汤品', menuList: menuList.filter(item => item.category === '汤品') }] },
  { id: 4, name: '主食', children: [{ id: 401, name: '经典主食', menuList: menuList.filter(item => item.category === '主食') }] }
]

// 拦截分类请求
Mock.mock('/api/category', 'get', () => {
  return {
    code: 200,
    msg: 'success',
    data: categoryList
  }
})

// 拦截菜谱详情请求
Mock.mock(/\/api\/menu-detail\/.*/, 'get', (options) => {
  const id = options.url.split('/').pop()
  const menu = menuList.find(item => item.id == id)
  return {
    code: 200,
    msg: 'success',
    data: {
      ...menu,
      imgs: [menu.img, `https://picsum.photos/seed/menu${id}1/300/200`, `https://picsum.photos/seed/menu${id}2/300/200`]
    }
  }
})
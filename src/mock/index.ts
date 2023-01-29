import Mock from 'mockjs'
export const Goodslist = Mock.mock({
  'GoodsList|123': [
    {
      "shopId|+1": 0,//生成商品id，自增1
      "shopMsg": "@ctitle(10)", //生成商品信息，长度为10个汉字
      "shopName": "@cname",//生成商品名 ， 都是中国人的名字
      "salesPrice|666-888": 30, //随机生成商品价格 在30-1000之间
      "salesQuantity|123-1156": 30,
      "hasSaled|123-789": 40,
      "salesAllowance|545-1611": 30,
      "shopLogo": "@Image('100x30','#419eff','#ffffff','商品')", //生成随机图片，大小/背景色/字体颜色/文字信息
      "shopKind": "家用"
    }
  ]
})
Mock.mock('/GoodsList/list', 'get', { code: 200, data: Goodslist })

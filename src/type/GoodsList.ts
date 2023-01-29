// == mock数据 ==
export interface TypeMock {
  shopId: number; // id
  shopName: string; // 商品名
  shopMsg: string; // 商品介绍
  salesPrice: number; // 商品价格
  salesQuantity: number; // 商品数量
  hasSaled: number; // 已售
  salesAllowance: number; // 余量
  shopLogo: string, // 图片
  shopKind: string // 分类
}
export class MockData {
  MockData: TypeMock[] = [{
    shopId: 0,
    shopName: '',
    shopMsg: '',
    salesPrice: 0,
    salesQuantity: 0,
    hasSaled: 0,
    salesAllowance: 0,
    shopLogo: '',
    shopKind: ''
  }]
}
// == 数据搜索 ==
export interface TypeSearch {
  shopId: number;
  shopName: string;
}
export class SearchData {
  SearchData: TypeSearch = {
    shopId: null,
    shopName: ''
  }
}


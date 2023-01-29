// == mock数据 ==
export interface TypeUserMock {
  UserId: string,
  UserName: string,
  data: string,
  authority: string,
  OpenAuthority: Boolean
}
export class Mockdata {
  Mockdata: TypeUserMock[] = [
    {
      UserId: '',
      UserName: '',
      data: '',
      authority: '',
      OpenAuthority: null
    }
  ]
}
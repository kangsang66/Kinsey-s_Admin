
// TOKEN有效期
const MAX_TOKEN_TIME = 2 * 60 * 60 * 1000

// 获取
const getTokenTime = () => {
  return localStorage.getItem('token-time')
}
// 是否过期   发起请求时判断token是否过期
export const diffTokenTime = () => {
  // 现在的时间
  const currentTime = Date.now()
  // 保存的时间
  const tokenTime = Number(getTokenTime())
  console.log(currentTime - tokenTime);

  return currentTime - tokenTime > MAX_TOKEN_TIME
}
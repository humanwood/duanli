// Cloudflare Pages 密码访问鉴权 - Basic Auth 基础认证
export const onRequest = async (context) => {
  // 配置鉴权账号密码【修改这里即可】
  const AUTH_USER = "admin";
  const AUTH_PASS = "duanli2027shangshi.";

  // 从请求头获取前端传入的授权信息
  const credentials = context.request.headers.get("Authorization");

  // 情况1：无授权信息，弹出浏览器账号密码输入框
  if (!credentials || !credentials.startsWith("Basic ")) {
    return new Response("Unauthorized - 请输入账号密码访问", {
      status: 401,
      headers: { 
        "WWW-Authenticate": 'Basic realm="Protected Area"' 
      }
    });
  }

  // Base64解码授权头内容，并拆分 用户名:密码 为数组
  const [user, pass] = atob(credentials.slice(6)).split(":");

  // 情况2：账号密码匹配成功，放行请求、正常展示页面
  if (user === AUTH_USER && pass === AUTH_PASS) {
    return await context.next();
  }

  // 情况3：账号或密码错误，返回鉴权失败提示
  return new Response("Invalid credentials - 账号或密码错误", { 
    status: 401 
  });
};

import Cookie from 'js-cookie';
function isLogin() {
  return Cookie.get('sign')
}
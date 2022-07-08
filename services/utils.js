function getCookie(req, cookieName){
  let headerCookie = req.headers.cookie;
  if(headerCookie === undefined){
    return '';
  }else{
    let cookies = headerCookie.split(';');
    if(cookies === undefined){
      cookies = [headerCookie];
    }
    for(let i = 0; i < cookies.length; i++){
      let arr = cookies[i].trim().split('=');
      if(arr[0] === cookieName){
        return arr[1];
      }
    }
    return '';
  }
}

module.exports = {
  getCookie
}
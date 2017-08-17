(function ($, doc, win) {

  function setUserInfo(user){
    console.log('setUserInfo', user)
    var $li = $('#header .menu-btn')
    var $a = $('<a class="user-info-btn" href="javascript:void(0)" >'+user.name+'</a>')
    $a.popover({
      container:'body',
      placement:'bottom',
      trigger:'manual',
      html: true,
      content:
        '<ul>' +
        ' <li><a href="javascript:void(0)">退出</a></li>' +
        '</ul>',
      template:
        '<div class="popover user-info-popover" role="tooltip">' +
        ' <div class="arrow"></div>' +
        ' <div class="popover-content"></div>' +
        '</div>'
    })
    $li.empty().append($a)
    $a.on('click',function(){
      $a.popover('toggle')
    })
    $('body').click(function(e){
      if ($(e.target).hasClass('user-info-btn')) {
        return
      }
      if ($(e.target).parents('.user-info-popover').length) {
        return
      }
      $a.popover('hide')
    })
  }

  var token = Cookies.get("X-Access-Token");
  if (!!token) {
    $.ajax({
      type:"GET",
      url: boxlinker.settings.api.userinfo,
      headers:{
        'X-Access-Token': token
      },
      dataType:'json',
      success:function(ret){
        switch (ret.status) {
          case 0:     //ok
            setUserInfo(ret.results)
            break;
          default:
            console.error("获取用户信息失败 ", ret)
        }
      },
      error: function(){}
    })
  }


})(jQuery, document, window);
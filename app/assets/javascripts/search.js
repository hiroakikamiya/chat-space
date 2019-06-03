$(function() {

var search_list = $("#user-search-result");
var menmber_list = $("#chat-group-users");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
  search_list.append(html);
}

function appendErrMsgToHTML(errorMessage){
  var html = `<div class="chat-group-user clearfix">
                ${errorMessage}
              </div>`
  search_list.append(html);
}

function includememberHTML(name, id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  menmber_list.append(html);
}
  
  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click', ".user-search-add", function(){
    $(this).parent().remove();
    var name = $(this).data('user-name')
    var id   = $(this).data('user-id')
    includememberHTML(name, id);
  })
  $(document).on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  })
});
$(function(){
  function buildHTML(message){
    var image = ( message.image != null )? `<img class="lower-message__image", src="${message.image}">` : "" ;
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${message.contents}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.new_message')[0].reset()
      $button = $('.form-box__submit')
      $.rails.enableElement($button)
      $button.removeAttr('disabled')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('id');
    var group_id = $('.contents').data('id');
    var url = `/groups/${group_id}/api/messages`
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      console.log(messages)
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      
    })
  };
  setInterval(reloadMessages, 5000);
});
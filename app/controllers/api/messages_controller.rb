class Api::MessagesController < ApplicationController
  def index
    respond_to do |format| 
      format.html # html形式でアクセスがあった場合は特に何もなし(@messages = Message.allして終わり）
      format.json { @messages = Message.where('id > ?', params[:id]) }
    end
  end

end

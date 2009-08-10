class Users::BooksController < ApplicationController

  before_filter :find_user


  def index
    @books = @user.books
  end


private

  def find_user
    @user = User.find(params[:user_id])
  end


end

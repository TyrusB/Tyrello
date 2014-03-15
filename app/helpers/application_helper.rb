module ApplicationHelper

  def login_user!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token

    current_user = user
  end

  def logout_user!
    fail
    current_user.reset_session_token!
    session[:session_token] = nil

    current_user = nil
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def require_login!
    redirect_to new_session_url if !logged_in?
  end

  def authenticity_token
    "<input type='hidden' name='authenticity_token' value='#{form_authenticity_token}' />".html_safe
  end

end

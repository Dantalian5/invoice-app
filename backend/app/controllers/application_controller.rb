class ApplicationController < ActionController::API
  SECRET_KEY = Rails.application.credentials[:jwt_secret_key]
  include Response

  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
    begin
      decoded, = JWT.decode(token, SECRET_KEY, true, algorithm: "HS256")
      raise JWT::ExpiredSignature if decoded["exp"] && Time.at(decoded["exp"]) < Time.now

      @current_user = User.find(decoded["user_id"])
      if decoded["jti"] != @current_user.token_jti
        error_response("Token has been revoked", :unauthorized)
      end
    rescue JWT::ExpiredSignature
      error_response("Session expired. Please login again", :unauthorized)
    rescue JWT::DecodeError
      error_response("Unauthorized", :unauthorized)
    end
  end

  # Error handling
  rescue_from ActiveRecord::RecordNotFound do |e|
    error_response("Resource not found", :not_found)
  end
  rescue_from ActiveRecord::RecordInvalid do |e|
    error_response(e.message, :unprocessable_entity)
  end
end

class AuthenticationController < ApplicationController
  SECRET_KEY = Rails.application.credentials[:jwt_secret_key]
  before_action :authorize_request, only: %i[ logout update_password ]

  # POST /signup
  def signup
    user = User.new(user_params)
    if user.save
      json_response({ message: "User created successfully" }, :created)
    else
      error_response(user.errors.full_messages)
    end
  end

  # POST /login
  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id, jti: user.token_jti })
      json_response({ token: token, message: "Login successful" }, :ok)
    else
      error_response({ error: "Invalid email or password" }, :unauthorized)
    end
  end

  # POST /logout
  def logout
    @current_user.update_column(:token_jti, SecureRandom.uuid) # Actualiza directamente sin validaciones
    json_response({ message: "Logout successful" }, :ok)
  end

  # POST /update_password
  def update_password
    if @current_user.update(password: params[:password], token_jti: SecureRandom.uuid)
      render json: { message: "Password updated successfully" }
    else
      render json: @current_user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end

  def encode_token(payload)
    payload[:exp] = 24.hours.from_now.to_i
    JWT.encode(payload, SECRET_KEY, "HS256")
  end
end

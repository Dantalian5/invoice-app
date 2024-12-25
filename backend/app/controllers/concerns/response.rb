module Response
  def json_response(object, status = :ok)
    render json: { data: object, status: status }, status: status
  end
  def error_response(errors, status = :unprocessable_entity)
    render json: { errors: errors, status: status }, status: status
  end
end

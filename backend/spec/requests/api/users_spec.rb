require 'swagger_helper'

RSpec.describe 'Users API', type: :request do
  path '/signup' do
    # POST /signup
    post('user signup') do
      tags 'Users'
      description 'Registers a new user.'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string, format: :email },
          password: { type: :string, minLength: 6 }
        },
        required: %w[email password]
      }

      response(201, 'created') do
        description 'User created successfully.'
        schema type: :object, properties: { message: { type: :string } }
        run_test!
      end

      response(422, 'unprocessable entity') do
        description 'Validation errors, such as email already taken or invalid data.'
        schema type: :object, properties: { errors: { type: :array, items: { type: :string } } }
        run_test!
      end
    end
  end

  path '/login' do
    # POST /login
    post('user login') do
      tags 'Users'
      description 'Authenticates a user and returns a JWT token.'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string, format: :email },
          password: { type: :string }
        },
        required: %w[email password]
      }

      response(200, 'successful') do
        description 'User authenticated successfully. A JWT token is returned.'
        schema type: :object, properties: {
          token: { type: :string },
          message: { type: :string }
        }
        run_test!
      end

      response(401, 'unauthorized') do
        description 'Invalid email or password.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end
end

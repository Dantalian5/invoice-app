# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Invoices API',
        description: 'API for managing invoices with authentication and all documented functionalities.',
        version: 'v1',
        contact: {
          name: 'MV',
          url: 'https://valenzuela.dev'
        }
      },
      paths: {},
      servers: [
        {
          url: 'https://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'www.example.com'
            }
          }
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: :http,
            scheme: :bearer,
            bearerFormat: :JWT
          }
        },
        schemas: {
          Invoice: {
            type: :object,
            properties: {
              id: { type: :string },
              created_at: { type: :string, format: :date },
              payment_due: { type: :string, format: :date },
              description: { type: :string },
              payment_terms: { type: :integer },
              client_name: { type: :string },
              client_email: { type: :string },
              status: { type: :string },
              total: { type: :number },
              sender_address: {
                type: :object,
                properties: {
                  street: { type: :string },
                  city: { type: :string },
                  postCode: { type: :string },
                  country: { type: :string }
                }
              },
              client_address: {
                type: :object,
                properties: {
                  street: { type: :string },
                  city: { type: :string },
                  postCode: { type: :string },
                  country: { type: :string }
                }
              },
              items: {
                type: :array,
                items: {
                  type: :object,
                  properties: {
                    name: { type: :string },
                    quantity: { type: :integer },
                    price: { type: :number },
                    total: { type: :number }
                  }
                }
              }
            }
          }
        }
      },
      security: [ { bearerAuth: [] } ]
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end

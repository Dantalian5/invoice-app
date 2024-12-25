require 'swagger_helper'

RSpec.describe 'Invoices API', type: :request do
  path '/invoices' do
    # GET /invoices
    get('list invoices') do
      tags 'Invoices'
      description 'Retrieves all invoices associated with the authenticated user.'
      security [ bearerAuth: [] ]
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/Invoice' }
        run_test!
      end

      response(401, 'unauthorized') do
        description 'JWT token is missing or invalid.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end

    # POST /invoices
    post('create invoice') do
      tags 'Invoices'
      description 'Creates a new invoice for the authenticated user.'
      security [ bearerAuth: [] ]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :invoice, in: :body, schema: {
        type: :object,
        properties: {
          created_at: { type: :string, format: :date },
          payment_due: { type: :string, format: :date },
          description: { type: :string },
          payment_terms: { type: :integer },
          client_name: { type: :string },
          client_email: { type: :string },
          status: { type: :string, enum: %w[draft pending paid] },
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
        },
        required: %w[created_at payment_due description payment_terms client_name client_email status total sender_address client_address items]
      }

      response(201, 'created') do
        schema '$ref' => '#/components/schemas/Invoice'
        run_test!
      end

      response(400, 'bad request') do
        description 'Invalid or incomplete request data.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end

      response(401, 'unauthorized') do
        description 'JWT token is missing or invalid.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end

  path '/invoices/{id}' do
    parameter name: :id, in: :path, type: :string, description: 'Invoice ID'

    # GET /invoices/{id}
    get('show invoice') do
      tags 'Invoices'
      description 'Retrieve a specific invoice by ID for the authenticated user.'
      security [ bearerAuth: [] ]
      produces 'application/json'

      response(200, 'successful') do
        schema '$ref' => '#/components/schemas/Invoice'
        run_test!
      end

      response(404, 'not found') do
        description 'Invoice not found or does not belong to the authenticated user.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end

      response(401, 'unauthorized') do
        description 'JWT token is missing or invalid.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end

    # PUT /invoices/{id}
    put('update invoice') do
      tags 'Invoices'
      description 'Updates a specific invoice for the authenticated user.'
      security [ bearerAuth: [] ]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :invoice, in: :body, schema: {
        type: :object,
        properties: {
          description: { type: :string },
          payment_terms: { type: :integer },
          client_name: { type: :string },
          client_email: { type: :string },
          status: { type: :string, enum: %w[draft pending paid] },
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

      response(200, 'updated') do
        schema '$ref' => '#/components/schemas/Invoice'
        run_test!
      end

      response(404, 'not found') do
        description 'Invoice not found or does not belong to the authenticated user.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end

      response(401, 'unauthorized') do
        description 'JWT token is missing or invalid.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end

    # DELETE /invoices/{id}
    delete('delete invoice') do
      tags 'Invoices'
      description 'Deletes a specific invoice for the authenticated user.'
      security [ bearerAuth: [] ]
      produces 'application/json'

      response(204, 'no content') do
        run_test!
      end

      response(404, 'not found') do
        description 'Invoice not found or does not belong to the authenticated user.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end

      response(401, 'unauthorized') do
        description 'JWT token is missing or invalid.'
        schema type: :object, properties: { error: { type: :string } }
        run_test!
      end
    end
  end
end

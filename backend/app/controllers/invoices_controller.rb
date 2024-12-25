class InvoicesController < ApplicationController
  before_action :authorize_request
  before_action :set_invoice, only: [ :show, :update, :destroy ]

  # GET /invoices
  def index
    invoices = @current_user.invoices
    json_response(invoices)
  end

  def show
    json_response(@invoice)
  end

  # POST /invoices
  def create
    invoice = @current_user.invoices.new(invoice_params)
    if invoice.save
      json_response(invoice, :created)
    else
      error_response(invoice.errors.full_messages)
    end
  end

  # PATCH/PUT /invoices/:id
  def update
    if @invoice.update(invoice_params)
      json_response(@invoice)
    else
      error_response(@invoice.errors.full_messages)
    end
  end

  # DELETE /invoices/:id
  def destroy
    @invoice.destroy
    head :no_content
  end

  private

  def set_invoice
    @invoice = @current_user.invoices.find(params[:id])
  end

  def invoice_params
    params.require(:invoice).permit(
      :created_at,
      :payment_due,
      :description,
      :payment_terms,
      :client_name,
      :client_email,
      :status,
      :total,
      sender_address: {},
      client_address: {},
      items: [ :name, :quantity, :price, :total ]
    )
  end
end

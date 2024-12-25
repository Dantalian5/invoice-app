class CreateInvoices < ActiveRecord::Migration[8.0]
  def change
    create_table :invoices, id: false do |t|
      t.string :id, primary_key: true
      t.date :created_at
      t.date :payment_due
      t.string :description
      t.integer :payment_terms
      t.string :client_name
      t.string :client_email
      t.string :status
      t.decimal :total
      t.json :sender_address
      t.json :client_address
      t.json :items
    end
  end
end

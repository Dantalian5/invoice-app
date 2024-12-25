class AddJtiToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :token_jti, :string
  end
end

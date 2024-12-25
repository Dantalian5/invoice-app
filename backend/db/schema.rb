# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_18_133028) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "invoices", id: :string, force: :cascade do |t|
    t.date "created_at"
    t.date "payment_due"
    t.string "description"
    t.integer "payment_terms"
    t.string "client_name"
    t.string "client_email"
    t.string "status"
    t.decimal "total"
    t.json "sender_address"
    t.json "client_address"
    t.json "items"
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_invoices_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "token_jti"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "invoices", "users"
end

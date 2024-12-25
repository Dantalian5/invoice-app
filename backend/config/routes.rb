Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/docs"
  mount Rswag::Api::Engine => "/docs"
  resources :invoices
  post "/signup", to: "authentication#signup"
  post "/login", to: "authentication#login"
  post "/logout", to: "authentication#logout"
end

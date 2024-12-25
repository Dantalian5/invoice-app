FactoryBot.define do
  factory :invoice do
    association :user
    created_at { Date.today }
    payment_due { Date.today + 30 }
    description { 'Test Invoice' }
    payment_terms { 30 }
    client_name { 'John Doe' }
    client_email { Faker::Internet.email }
    status { 'draft' }
    total { 1000.0 }
    sender_address { { street: '123 Main St', city: 'Anytown', postCode: '12345', country: 'USA' } }
    client_address { { street: '456 Elm St', city: 'Othertown', postCode: '54321', country: 'USA' } }
    items { [ { name: 'Web Design', quantity: 1, price: 1000.0, total: 1000.0 } ] }
  end
end

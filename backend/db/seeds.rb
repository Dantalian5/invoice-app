puts 'Seeding database...'

# Crear usuario de prueba
user = User.create!(
  email: 'test@example.com',
  password: 'password',
  token_jti: SecureRandom.uuid
)

# Datos de invoices
invoices = [
  {
    id: 'RT3080',
    created_at: '2021-08-18',
    payment_due: '2021-08-19',
    description: 'Re-branding',
    payment_terms: 1,
    client_name: 'Jensen Huang',
    client_email: 'jensenh@mail.com',
    status: 'paid',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      post_code: 'NR24 5WQ',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.90,
        total: 1800.90
      }
    ],
    total: 1800.90
  },
  {
    id: 'XM9141',
    created_at: '2021-08-21',
    payment_due: '2021-09-20',
    description: 'Graphic Design',
    payment_terms: 30,
    client_name: 'Alex Grim',
    client_email: 'alexgrim@mail.com',
    status: 'pending',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '84 Church Way',
      city: 'Bradford',
      post_code: 'BD1 9PB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Banner Design',
        quantity: 1,
        price: 156.00,
        total: 156.00
      },
      {
        name: 'Email Design',
        quantity: 2,
        price: 200.00,
        total: 400.00
      }
    ],
    total: 556.00
  },
  {
    id: 'RG0314',
    created_at: '2021-09-24',
    payment_due: '2021-10-01',
    description: 'Website Redesign',
    payment_terms: 7,
    client_name: 'John Morrison',
    client_email: 'jm@myco.com',
    status: 'paid',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '79 Dover Road',
      city: 'Westhall',
      post_code: 'IP19 3PF',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Website Redesign',
        quantity: 1,
        price: 14002.33,
        total: 14002.33
      }
    ],
    total: 14002.33
  },
  {
    id: 'RT2080',
    created_at: '2021-10-11',
    payment_due: '2021-10-12',
    description: 'Logo Concept',
    payment_terms: 1,
    client_name: 'Alysa Werner',
    client_email: 'alysa@email.co.uk',
    status: 'pending',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '63 Warwick Road',
      city: 'Carlisle',
      post_code: 'CA20 2TG',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Logo Sketches',
        quantity: 1,
        price: 102.04,
        total: 102.04
      }
    ],
    total: 102.04
  },
  {
    id: 'AA1449',
    created_at: '2021-10-07',
    payment_due: '2021-10-14',
    description: 'Re-branding',
    payment_terms: 7,
    client_name: 'Mellisa Clarke',
    client_email: 'mellisa.clarke@example.com',
    status: 'pending',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '46 Abbey Row',
      city: 'Cambridge',
      post_code: 'CB5 6EG',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'New Logo',
        quantity: 1,
        price: 1532.33,
        total: 1532.33
      },
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 2500.00,
        total: 2500.00
      }
    ],
    total: 4032.33
  },
  {
    id: 'TY9141',
    created_at: '2021-10-01',
    payment_due: '2021-10-31',
    description: 'Landing Page Design',
    payment_terms: 30,
    client_name: 'Thomas Wayne',
    client_email: 'thomas@dc.com',
    status: 'pending',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '3964 Queens Lane',
      city: 'Gotham',
      post_code: '60457',
      country: 'United States of America'
    },
    items: [
      {
        name: 'Web Design',
        quantity: 1,
        price: 6155.91,
        total: 6155.91
      }
    ],
    total: 6155.91
  },
  {
    id: 'FV2353',
    created_at: '2021-11-05',
    payment_due: '2021-11-12',
    description: 'Logo Re-design',
    payment_terms: 7,
    client_name: 'Anita Wainwright',
    client_email: 'anita.wainwright@mail.com',
    status: 'draft',
    sender_address: {
      street: '19 Union Terrace',
      city: 'London',
      post_code: 'E1 3EZ',
      country: 'United Kingdom'
    },
    client_address: {
      street: '',
      city: '',
      post_code: '',
      country: ''
    },
    items: [
      {
        name: 'Logo Re-design',
        quantity: 1,
        price: 3102.04,
        total: 3102.04
      }
    ],
    total: 3102.04
  }
]

# Crear invoices
# Helper para redondear números dentro de items
def round_items(items)
  items.map do |item|
    item = item.transform_keys(&:to_s) # Asegurar que todas las claves son strings
    {
      'name' => item['name'],
      'quantity' => item['quantity'].to_i,
      'price' => item['price'].to_f.round(2),
      'total' => item['total'].to_f.round(2)
    }
  end
end
# Crear invoices con datos ajustados
invoices.each do |invoice_data|
  invoice_data[:items] = round_items(invoice_data[:items]) # Redondear items
  invoice_data[:total] = invoice_data[:total].to_f.round(2) # Redondear total


  invoice = user.invoices.new(invoice_data)
  if invoice.save
    puts "Created invoice: #{invoice.id}"
  else
    puts "Failed to create invoice: #{invoice.errors.full_messages.join(', ')}"
  end
end

puts 'Seed data loaded successfully!'

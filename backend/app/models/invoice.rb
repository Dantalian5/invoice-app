class Invoice < ApplicationRecord
  # Associations
  belongs_to :user
  before_validation :generate_invoice_id, on: :create
  before_save :round_items_values
  # Basic Validations

  def as_json(options = {})
    super(options).tap do |hash|
      hash["items"] = items.map do |item|
        item.merge(
          "price" => format_decimal(item["price"]),
          "total" => format_decimal(item["total"])
        )
      end
      hash["total"] = format_decimal(total)
    end
  end

  validates :id, presence: true, uniqueness: { scope: :user_id, message: "Should be unique per user" }
  validates :client_email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Invalid email format" }
  validates :status, inclusion: { in: %w[draft pending paid], message: "%{value} is not a valid status" }
  validates :payment_terms, numericality: { only_integer: true, greater_than: 0 }
  validates :total, numericality: { greater_than_or_equal_to: 0 }
  validates :created_at, :payment_due,
            :description, :client_name,
            :client_email, :total,
            :sender_address, :client_address,
            :items, presence: true
  # Custom Validations
  validate :validate_items_format
  validate :validate_payment_dates


  private
  def generate_invoice_id
    return if self.id.present?
    loop do
      self.id = "#{generate_letters}#{generate_digits}"
      break unless Invoice.exists?(id: self.id)
    end
  end
  def generate_letters
    ("A".."Z").to_a.sample(2).join
  end
  def generate_digits
    rand(1000..9999).to_s
  end
  def validate_items_format
    return unless items.is_a?(Array)
    items.each_with_index do |item, index|
      unless item.is_a?(Hash)
        errors.add(:items, "Item at index #{index} must be a valid object")
        next
      end
      errors.add(:items, "Item at index #{index} must have a name") unless item["name"].is_a?(String)
      errors.add(:items, "Item at index #{index} must have a quantity") unless item["quantity"].is_a?(Integer) && item["quantity"] > 0
      errors.add(:items, "Item at index #{index} must have a price") unless item["price"].is_a?(Numeric) && item["price"] > 0
      errors.add(:items, "Item at index #{index} must have a total") unless item["total"].is_a?(Numeric) && item["total"] > 0
    end
  end
  def round_items_values
    # Redondea los valores dentro de los items antes de guardar
    self.items = items.map do |item|
      item.merge(
        "price" => item["price"].to_f.round(2),
        "total" => item["total"].to_f.round(2)
      )
    end
    self.total = total.to_f.round(2) # Redondea también el total general
  end
  def validate_payment_dates
    if created_at.present? && payment_due.present? && created_at > payment_due
      errors.add(:payment_due, "Payment due date must be after the invoice creation date")
    end
  end
  def format_decimal(value)
    "%.2f" % value.to_f
  end
end

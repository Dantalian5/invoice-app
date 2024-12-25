class User < ApplicationRecord
  has_secure_password
  has_many :invoices, dependent: :destroy

  before_create :generate_token_jti

  validates :email, presence: true, uniqueness: { case_sensitive: false, message: "Email already taken" }
  validates :password, presence: true, length: { minimum: 6 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Invalid email format" }

  private

  def generate_token_jti
    self.token_jti = SecureRandom.uuid
  end
end

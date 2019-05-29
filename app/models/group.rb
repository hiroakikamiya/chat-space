class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  validates :name, presence: true, uniqueness: true

  has_many :messages
end
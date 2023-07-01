# == Schema Information
#
# Table name: properties
#
#  id            :bigint           not null, primary key
#  area          :decimal(10, )
#  bedroom_count :integer
#  description   :string
#  listing_type  :string
#  name          :string
#  photos        :json
#  price_cents   :integer
#  tags          :text
#  title         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Property < ApplicationRecord
  before_save :strip_tags_spaces

  extend Enumerize

  has_many_attached :photos

  enumerize :listing_type, in: %i[rent buy], predicates: true, scope: :shallow

  monetize :price_cents

  validates :title, :name, :bedroom_count, :listing_type, :photos, :price, presence: true

  def strip_tags_spaces
    self.tags = tags.split(',')
                   .map(&:strip)
                   .reject(&:empty?)
                   .uniq
                   .join(',')
  end

  def keywords
    arr = tags.split(',')
    arr << name
    arr << title
    arr << description
    arr << (price_cents / 10)&.to_s
    arr << bedroom_count&.to_s
    arr << listing_type
    arr.join(' ')
  end
end

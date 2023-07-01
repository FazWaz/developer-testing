# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'
require 'open-uri'

NUM_PROPERTIES = 100
NUM_PHOTOS = 5

# Define a method to retrieve a random house image URL from Lorem Picsum
def random_house_image_url
  width = 800
  height = 600
  Faker::LoremFlickr.image('house', width, height)
end

# Create 100 properties with 5 random house photos each
# NUM_PROPERTIES.times do
#   property = Property.create(
#     # Set other property attributes using Faker gem or other data sources
#     # For simplicity, let's assume we only set the property title, description, price, and property_type
#     title: Faker::Lorem.sentence,
#     description: Faker::Lorem.paragraph,
#     price_cents: Faker::Number.between(from: 100_000, to: 1_000_000),
#     property_type: %i[rent buy].sample
#   )

#   # Add 5 random house photos to the property
#   NUM_PHOTOS.times do
#     photo_url = random_house_image_url
#     property.photos << URI.open(photo_url)
#   end
# end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
CustomerUser.create(email: 'mo@fazwaz.com', password: 'password', password_confirmation: 'password', name: 'Moses Lucas')
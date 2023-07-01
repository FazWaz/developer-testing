# frozen_string_literal: true

module Types
  class PropertyType < Types::BaseObject
    field :id, ID, null: false
    field :listing_type, String
    field :price, Float
    field :price_cents, Integer
    field :price_formatted, String
    field :price_currency, String
    field :bedroom_count, Integer
    field :area, Float
    field :name, String
    field :title, String
    field :description, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :tags, String
    field :photos_urls, [String], null: true

    def price
      object.price.to_d
    end

    def price_formatted
      object.price.format
    end

    def price_currency
      object.price.currency
    end

    def photos_urls
      object.photos.map do |photo|
        photo.blob.url
      end
    end    

    def listing_type
      object.listing_type_text
    end
  end
end

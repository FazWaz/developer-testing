class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.string :listing_type
      t.integer :price_cents
      t.integer :bedroom_count
      t.decimal :area
      t.json :photos
      t.string :name
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end

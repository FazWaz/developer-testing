class CreateInteractedProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :interacted_properties do |t|
      t.references :property, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :query

      t.timestamps
    end
  end
end

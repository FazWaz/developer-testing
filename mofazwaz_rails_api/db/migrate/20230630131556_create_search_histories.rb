class CreateSearchHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :search_histories do |t|
      t.references :user, null: true, foreign_key: true
      t.text :query

      t.timestamps
    end
  end
end

class AddTagsToProperty < ActiveRecord::Migration[7.0]
  def change
    add_column :properties, :tags, :text
  end
end

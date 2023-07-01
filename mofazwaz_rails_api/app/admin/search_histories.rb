ActiveAdmin.register SearchHistory do
  index do
    id_column
    column :query
    column :user
    column :created_at
  end

  filter :query
  filter :user
  filter :created_at
end

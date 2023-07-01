ActiveAdmin.register InteractedProperty do
  index do
    id_column
    column :property
    column :user
    column :created_at
  end

  filter :property
  filter :user
  filter :created_at
end

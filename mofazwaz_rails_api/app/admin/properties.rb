ActiveAdmin.register Property do
  permit_params :listing_type, :title, :name, :description, :bedroom_count, :area, :price, :tags, photos: []

  form do |f|
    f.inputs do
      f.input :listing_type, as: :select, collection:  Property.listing_type.options
      f.input :title
      f.input :name
      f.input :description
      f.input :bedroom_count
      f.input :area, label: "Area in (SqM)"
      f.input :price
      f.input :tags, label: "Tags - Enter tags divided by a comma (',')"
      f.input :photos, as: :file, input_html: { multiple: true }
    end
    actions
  end

  show do
    attributes_table do
      row :title
      row :name
      row :bedroom_count
      row :description
      row :listing_type
      row :tags
      row :price do
        resource.price.format
      end
      row :photos do
        div do
          resource.photos.each do |img|
            div do
              image_tag url_for(img), size: "200x200"
            end
          end
        end
      end
    end
  end
end

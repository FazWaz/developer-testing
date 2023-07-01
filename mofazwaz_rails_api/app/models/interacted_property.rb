# == Schema Information
#
# Table name: interacted_properties
#
#  id          :bigint           not null, primary key
#  query       :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  property_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_interacted_properties_on_property_id  (property_id)
#  index_interacted_properties_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (property_id => properties.id)
#  fk_rails_...  (user_id => users.id)
#
class InteractedProperty < ApplicationRecord
  belongs_to :property
  belongs_to :user
end

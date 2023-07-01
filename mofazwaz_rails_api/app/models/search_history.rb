# == Schema Information
#
# Table name: search_histories
#
#  id         :bigint           not null, primary key
#  query      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_search_histories_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class SearchHistory < ApplicationRecord
  before_save :strip_query_spaces

  belongs_to :user, inverse_of: :search_histories, optional: true

  validates :query, presence: true

  def strip_query_spaces
    self.query = query.split(',')
                   .map(&:strip)
                   .reject(&:empty?)
                   .uniq
                   .join(',')
  end
end

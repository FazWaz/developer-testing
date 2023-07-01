module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello FazWaz!"
    end

    field :find_property, PropertyType, null: true, description: "Find a property" do
      argument :id, String, required: true
    end
    def find_property(id:)
      Property.find_by(id:)
    end

    field :search_properties, [PropertyType], null: true, description: "Search properties" do
      argument :query, String, required: true, default_value: ''
      argument :limit, Integer, required: false, default_value: 5
    end
    def search_properties(query:, limit:)
      search = { name_or_title_or_description_or_listing_type_or_tags_cont_any: query.downcase.split(' ') }
      q = Property.ransack(search).result
      q.limit(limit)
      SearchHistory.create(query:, user:)
      return q
    end

    field :recommend_properties, [PropertyType], null: true, description: "Recommend properties"
    def recommend_properties
      calculate_relevant_properties
    end

    private

    def calculate_relevant_properties
      # Get user last 5 history, combine in a single string
      user_search_history = user.search_histories.order(created_at: :desc).limit(5).pluck(:query).uniq.join(' ')

      # Query 5 suggested properties based on user last 5 histories
      suggested_properties = Property.ransack({name_or_title_or_description_or_listing_type_or_tags_cont_any: user_search_history.downcase.split(' ')}).result

      # Get last 5 interacted properties
      interacted_properties = Property.where(id: user.interacted_properties.pluck(:id)).order(created_at: :desc).limit(5)


      # Combine the interacted + suggested properties and sort then by which among them has more relevance based on the user_searc_history value
      properties = (suggested_properties + interacted_properties).uniq
      properties_with_relevance = properties.map do |property|
        relevance = calculate_relevance(property, user_search_history)
        { property:, relevance: }
      end

      # Sort the properties by relevance in descending order
      sorted_properties = properties_with_relevance.sort_by { |p| p[:relevance] }.reverse
      sorted_properties.pluck(:property)
    end

    def calculate_relevance(property, user_search_history)
      keywords = property.keywords.downcase.split(' ')
      relevance = keywords.count { |keyword| user_search_history.downcase.include?(keyword) }
      relevance
    end

    def user
      # Temporary customer user since no auth implemented yet
      @user ||= User.find_or_create_by(email: 'mo@fazwaz.com') do |u|
        u.password = 'password'
        u.password_confirmation = 'password'
      end
    end
  end
end

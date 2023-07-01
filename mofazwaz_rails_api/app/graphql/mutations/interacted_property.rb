module Mutations
	class InteractedProperty < BaseMutation
		argument :id, ID, required: true

		field :status, String, null: true

		def resolve(id:)
			property = Property.find(id)
			::InteractedProperty.create(property:, user:)

			{ status: 'ok'}
		end

		private

    def user
      # Temporary customer user since no auth implemented yet
      @user ||= User.find_or_create_by(email: 'mo@fazwaz.com') do |u|
        u.password = 'password'
        u.password_confirmation = 'password'
      end
    end
	end
end
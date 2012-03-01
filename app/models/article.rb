class Article < ActiveRecord::Base
  belongs_to :author, :class_name => "User"

  acts_as_audited
end

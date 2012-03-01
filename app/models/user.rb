class User < ActiveRecord::Base
  acts_as_audited

  has_many :articles

end

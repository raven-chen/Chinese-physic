module M
  def define_keys(*keys)
    define_method :hello do 
       keys += [:hello,:bye]
    end
  end
end

class A
  extend M
  define_keys :nihao
end

a = A.new
p a.hello
p a.hello
p a.hello
b = B.new
p b.hello
# pg. 28
# The good example of encapsulating a complex data structure (array of arrays in this case) within an object.
# In this example when you need to access information about a wheel, you are sending a message to an array, rather than indexing into an object.

class RevealingReferences
  attr_reader :wheels
  def initialize(data)
    @wheels = wheelify(data)
  end

  def diameters
    wheels.collect {|wheel| wheel.rim + (wheel.tire * 2)}
  end

  wheel = Struct.new(:rim, :tire)
  def wheelify(data)
    data.collect { |cell| Wheel.new(cell[0], cell[1]) }
  end
end

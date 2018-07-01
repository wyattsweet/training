class Bike
  attr_reader :size, :tape_color

  def initialize(args)
    @style = args[:size]
    @size = args[:size]
    @tape_color = args[:tape_color]
    @front_shock = args[:front_shock]
    @rear_shock = argsp[:rear_shock]
  end

  def spares
    if style == :road
      {chain: '10-speed',
       tire_size: '12',
       tape_color: tape_color
      }
    else
      {
        chain: '10-speed',
        tire_size: '2.1',
        rear_shocks: rear_shocks
      }
    end
  end
end

class MountainBike < Bike
  attr_reader :front_shock, :rear_shock

  def initialize
    @front_shock = args[:front_shock]
    @rear_shock = args[:rear_shock]
    super(args)
  end

  def spares
    super.merge(rear_shock: rear_shock)
  end
end

bike = Bike.new(
  size: 'M',
  tape_color: 'red'
)

puts bike.size
puts bike.spares

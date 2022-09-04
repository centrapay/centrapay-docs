module Jekyll

  module BreakFilter
    def break(value, break_on)
      value.gsub(break_on, "#{break_on}<wbr>")
    end
  end

end

module Jekyll
  class BreakTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      params = text.split(" ")
      @break_on = params[0]
      @value = params[1...].join('&nbsp;')
    end

    def render(context)
      @value.gsub(@break_on, "#{@break_on}<wbr>")
    end
  end
end

Liquid::Template.register_filter(Jekyll::BreakFilter)
Liquid::Template.register_tag('break', Jekyll::BreakTag)

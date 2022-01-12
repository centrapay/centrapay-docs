module Jekyll
  class MaxLengthTag < Liquid::Tag

    def initialize(tag_name, length, tokens)
      super
      @length = length
    end

    def render(context)
      "#{@length} character limit."
    end
  end
end

Liquid::Template.register_tag('maxlen', Jekyll::MaxLengthTag)

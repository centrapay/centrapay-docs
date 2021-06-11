module Jekyll
  class H4Tag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      %{<h4>#{@text}</h4>}
    end
  end
end

Liquid::Template.register_tag('h4', Jekyll::H4Tag)

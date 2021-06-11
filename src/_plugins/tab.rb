module Jekyll
  class TabTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      "&nbsp;&nbsp;&nbsp;&nbsp;"
    end
  end
end

Liquid::Template.register_tag('tab', Jekyll::TabTag)

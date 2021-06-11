module Jekyll
  class DatatypeTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @datatype = text
    end

    def render(context)
      "<a href=\"/api/data-types##{@datatype.downcase}\">#{@datatype}</a>"
    end
  end
end

Liquid::Template.register_tag('dt', Jekyll::DatatypeTag)

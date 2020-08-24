module Jekyll
  class EndpointTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      params = text.split(" ")
      @method = params[0]
      @url = params[1]
    end

    def render(context)
      "#{@method} <code>#{@url.gsub('/', "/<wbr>")}</code>"
    end
  end
end

Liquid::Template.register_tag('endpoint', Jekyll::EndpointTag)

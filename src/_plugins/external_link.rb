module Jekyll
  class ExternalLink < Liquid::Tag

    attr_reader :link

    def initialize(tag_name, link, tokens)
      super
      @link = link
    end

    def render(context)
      %{<a class="external" href="#{link}">#{link}</a>}
    end

  end
end

Liquid::Template.register_tag('external_link', Jekyll::ExternalLink)

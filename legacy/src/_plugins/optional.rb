module Jekyll
  class OptionalTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      %{<span class="cp-badge">Optional</span>}
    end
  end
end

Liquid::Template.register_tag('opt', Jekyll::OptionalTag)

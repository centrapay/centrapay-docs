module Jekyll
  class WarningTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @message = text
    end

    def render(context)
      [
        '<div class="cp-warning">',
        "<b>Warning:</b> #{@message}",
        '</div>',
      ].join
    end

  end
end

Liquid::Template.register_tag('warning', Jekyll::WarningTag)

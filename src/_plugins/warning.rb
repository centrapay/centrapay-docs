module Jekyll
  class WarningTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @message = text
    end

    def render(context)
      "<div style='border: 1px solid #7253ed; border-radius: 5px; padding: 5px; margin-bottom: 25px'>"\
      "<b>Warning:</b> #{@message}"\
      "</div>"
    end
  end
end

Liquid::Template.register_tag('warning', Jekyll::WarningTag)

require 'yaml'
require 'json'

module Jekyll
  class JsonTag < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    # https://github.com/jekyll/jekyll/blob/6855200ebda6c0e33f487da69e4e02ec3d8286b7/lib/jekyll/tags/highlight.rb#L81
    def render_json(data)
      json = JSON.pretty_generate(data)
      require "rouge"
      formatter = ::Rouge::Formatters::HTMLLegacy.new(
        :wrap         => false,
        :css_class    => "highlight",
        :gutter_class => "gutter",
        :code_class   => "code"
      )
      lexer = ::Rouge::Lexer.find_fancy('json', json)
      formatter.format(lexer.lex(json))
    end

    def render(context)
      data = YAML.load super
      %{<p>
        <div class="highlighter-rouge">
          <pre class="highlight"><code>#{render_json(data)}</code></pre>
        </div>
      </p>}
    end
  end
end

Liquid::Template.register_tag('json', Jekyll::JsonTag)

require 'json'

class RequestSpec

  attr_accessor :base_url
  attr_accessor :_path
  attr_accessor :_method
  attr_accessor :examples
  attr_accessor :default_example

  def initialize(base_url)
    @examples = []
    @default_example = RequestExample.new(self)
    @base_url = base_url
  end

  def GET(s)
    method('GET')
    path(s)
  end

  def POST(s)
    method('POST')
    path(s)
  end

  def PUT(s)
    method('PUT')
    path(s)
  end

  def method(s)
    @_method = s
  end

  def path(s)
    @_path = s
  end

  def example(&block)
    example = RequestExample.new(self)
    example.instance_eval &block if block_given?
    @examples.append(example)
  end

  def name(s)
    @default_example.title(s)
  end

  def auth(s)
    @default_example.auth(s)
  end

  def query_param(name, value)
    @default_example.query_param(name, value)
  end

  def path_param(name, value)
    @default_example.path_param(name, value)
  end

  def header(name, value)
    @default_example.header(name, value)
  end

  def body(data)
    @default_example.body(data)
  end

end

class RequestExample

  attr_accessor :_title
  attr_accessor :headers
  attr_accessor :path_params
  attr_accessor :query_params

  def initialize(reqspec)
    @reqspec = reqspec
    @headers = {}
    @path_params = {}
    @query_params = []
  end

  def title(s)
    @_title = s
  end

  def auth(s)
    case s
    when 'api-key'
      header('x-api-key', '$api_key')
    when 'jwt'
      header('authorization', '$jwt')
    else
      raise ArgumentError, "Invalid auth type: #{s}"
    end
  end

  def query_param(name, value)
    @query_params.append({ :name => name, :value => value })
  end

  def path_param(name, value)
    @path_params[name] = value
  end

  def header(name, value)
    normalized_name = name.split('-').map { |s| s.capitalize }.join('-')
    @headers[normalized_name] = value
  end

  def body(data)
    @data = data
    @headers['Content-Type'] = 'application/json'
  end

  def substituted_path
    s = @reqspec._path
    all_path_params.each do |k,v|
      s = s.sub("{#{k}}", v)
    end
    s
  end

  def all_path_params
    @reqspec.default_example.path_params.merge(@path_params)
  end

  def all_headers
    @reqspec.default_example.headers.merge(@headers)
  end

  def curl_method
    if @reqspec._method != 'GET'
      "-X #{@reqspec._method}"
    elsif !@query_params.empty?
      "-G"
    else
      ""
    end
  end

  def curl_line_one
    [ 'curl', curl_method, "#{@reqspec.base_url}#{substituted_path}" ].filter{ |s| !s.empty? }.join(' ')
  end

  def curl_header_lines
    all_headers.map { |k,v| %<  -H "#{k}: #{v}"> }
  end

  def curl_query_lines
    @query_params.map { |p| "  -d #{p[:name]}=#{p[:value]}" }
  end

  def curl_data_lines
    @data.nil? ? [] : [ %{  -d '#{JSON.pretty_generate(@data).gsub(/^/, '  ').strip}'} ]
  end

  def curl_lines
    [ curl_line_one ].concat(curl_header_lines).concat(curl_query_lines).concat(curl_data_lines)
  end

  def to_curl
    curl_lines.join(" \\\n")
  end

end

module Jekyll
  class RequestSpecTag < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
      params = text.split(' ')
      @no_summary = params.include? 'nosummary'
      @base_url = 'https://service.centrapay.com'
    end

    # https://github.com/jekyll/jekyll/blob/6855200ebda6c0e33f487da69e4e02ec3d8286b7/lib/jekyll/tags/highlight.rb#L81
    def render_shell_code(code)
      require "rouge"
      formatter = ::Rouge::Formatters::HTMLLegacy.new(
        :wrap         => false,
        :css_class    => "highlight",
        :gutter_class => "gutter",
        :code_class   => "code"
      )
      lexer = ::Rouge::Lexer.find_fancy('shell', code)
      formatter.format(lexer.lex(code))
    end

    def render_summary(reqspec)
      %{#{reqspec._method} <code>#{reqspec._path.gsub('/', "/<wbr>")}</code>} unless @no_summary
    end

    def render_example_title(example)
      %{
        <h4>#{example._title}</h4>
      }
    end

    def render_example_code(example)
      %{
        <div class="highlighter-rouge">
          <pre class="highlight"><code>#{render_shell_code(example.to_curl)}</code></pre>
        </div>
      }
    end

    def render_example(example)
      %{
        #{render_example_title(example)}
        #{render_example_code(example)}
      }
    end

    def render_default_example(reqspec)
      return nil if !reqspec.examples.empty?
      render_example(reqspec.default_example)
    end

    def render(context)
      r = RequestSpec.new @base_url
      r.instance_eval super
      %{<p>
        #{render_summary(r)}
        #{render_default_example(r)}
        #{r.examples.map{ |e| render_example(e) }.join("\n")}
      </p>}
    end
  end
end

Liquid::Template.register_tag('reqspec', Jekyll::RequestSpecTag)

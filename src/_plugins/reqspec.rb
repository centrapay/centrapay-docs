require 'json'

class RequestSpec

  attr_accessor :_name
  attr_accessor :_description
  attr_accessor :_path
  attr_accessor :_method
  attr_accessor :headers
  attr_accessor :path_params
  attr_accessor :query_params

  def initialize
    @base_url = 'https://service.centrapay.com'
    @headers = {}
    @path_params = {}
    @query_params = []
  end

  def name(s)
    @_name = s
  end

  def description(s)
    @_description = s
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
    s = @_path
    @path_params.each do |k,v|
      s = s.sub("{#{k}}", v)
    end
    s
  end

  def curl_method
    if @_method != 'GET'
      "-X #{@_method}"
    elsif !@query_params.empty?
      "-G"
    else
      ""
    end
  end

  def curl_line_one
    [ 'curl', curl_method, "#{@base_url}#{substituted_path}" ].filter{ |s| !s.empty? }.join(' ')
  end

  def curl_header_lines
    @headers.map { |k,v| %<  -H "#{k}: #{v}"> }
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

    def render_name(reqspec)
      "<h4>#{reqspec._name}</h4>" unless reqspec._name.nil?
    end

    def render_description(reqspec)
      "<p>#{reqspec._description}</p>" unless reqspec._description.nil?
    end

    def render(context)
      r = RequestSpec.new
      r.instance_eval super
      %{<p>
        #{render_summary(r)}
        #{render_name(r)}
        #{render_description(r)}
        <div class="highlighter-rouge">
          <pre class="highlight"><code>#{render_shell_code(r.to_curl)}</code></pre>
        </div>
      </p>}
    end
  end
end

Liquid::Template.register_tag('reqspec', Jekyll::RequestSpecTag)

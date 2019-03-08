---
layout: post
title: Syntax Highlighting Post
excerpt: "Demo post displaying the various ways of highlighting code in Markdown. Demo post displaying the various ways of highlighting code in Markdown. Demo post displaying the various ways of highlighting code in Markdown."
tags: [Sample Post, code, highlighting, SSL]
permalink: /articles/:year/:month/:day/:title
modified: 2014-09-14
type: articles
comments: true
comments_locked: false
image:
  feature: code_syntax_highlighting.jpg
  credit:
---

Syntax highlighting is a feature that displays source code, in different colors and fonts according to the category of terms. This feature facilitates writing in a structured language such as a programming language or a markup language as both structures and syntax errors are visually distinct. Highlighting does not affect the meaning of the text itself; it is intended only for human readers.[^1]

[^1]: <http://en.wikipedia.org/wiki/Syntax_highlighting>

### Pygments Code Blocks

To modify styling and highlight colors edit `/_sass/_syntax.scss`.

{% highlight css %}
.some-div {
    float: left;
    margin: 0 -240px 0 0;
    width: 100%;
    outline: 0;
    display: block;
    margin-bottom: .4rem;
}

{% endhighlight %}

Syntax highlighting is a feature that displays source code, in different colors and fonts according to the category of terms. This feature facilitates writing in a structured language such as a programming language or a markup language as both structures and syntax errors are visually distinct. Highlighting does not affect the meaning of the text itself; it is intended only for human readers.[^1]

{% highlight html %}
{% raw %}
<nav class="pagination" role="navigation">
    {% if page.previous %}
        <a href="{{ site.url }}{{ page.previous.url }}" class="btn" title="{{ page.previous.title }}">Previous article</a>
    {% endif %}
    {% if page.next %}
        <a href="{{ site.url }}{{ page.next.url }}" class="btn" title="{{ page.next.title }}">Next article</a>
    {% endif %}
</nav><!-- /.pagination -->
{% endraw %}
{% endhighlight %}

{% highlight ruby %}
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      tag_title_prefix = site.config['tag_title_prefix'] || 'Tagged: '
      tag_title_suffix = site.config['tag_title_suffix'] || '&#8211;'
      self.data['title'] = "#{tag_title_prefix}#{tag}"
      self.data['description'] = "An archive of posts tagged #{tag}."
    end
  end
end
{% endhighlight %}


Syntax highlighting is a feature that displays source code, in different colors and fonts according to the category of terms. This feature facilitates writing in a structured language such as a programming language or a markup language as both structures and syntax errors are visually distinct.[^1]

{% highlight js %}
function getArticleTags(i) {
  articleTags = $('#search-results-article-'+i).data('tags').split(',');

  articleTags.forEach(function(val, index) {
    articleTags[index] = val.toLowerCase();
  });

  return articleTags;
}
{% endhighlight %}

{% highlight java %}
public class SwitchCaseExample1 {

   public static void main(String args[]){
     int num=2;
     switch(num+2)
     {
        case 1:
    System.out.println("Case1: Value is: "+num);
  case 2:
    System.out.println("Case2: Value is: "+num);
  case 3:
    System.out.println("Case3: Value is: "+num);
        default:
    System.out.println("Default: Value is: "+num);
      }
   }
}
{% endhighlight %}

### GitHub Gist Embed

An example of a Gist embed below.

{% gist mmistakes/6589546 %}

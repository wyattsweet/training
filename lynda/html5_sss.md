# HTML5: Structure, Syntax and Semantics

## HTML5 and Semantics

### What are web semantics?

web semantics aims to add use specific syntaxes to add meaning to content.
control the organization and display of content. Use consistent semantic markup to identify common elements.
Allows it to be indexed and found easier, allows user agents to present the proper elements to users.

### HTML5 semantics

Determining which tag to use is often a judgement call. Improved semantics was one of the main goals of HTML5.

## HTML5 content model

* Flow - The majority of all the elements in HTML5. Elements that would be included in the normal flow of the document. Most things that fit inside the body tag. Parent content type that contains more specific content types.

* Metadata - Elements that are primarily found in the head of the document, but some that can be also be found in the flow of the doc.

* Phrasing - anchor, em, image, label, span

* embedded - Any content which imports other resources into the document such as - object, video, canvas 

* interactive - content specifically intended for user interaction such as anchor tag because people can click on it.

* Heading - Defines the header of a section, that would be tags: h1, h2, h3, h4, h5, h6

* Sectioning - content that defines the scope of headings and footers. Useing these elements will create a new section within the document. Section elements include article, aside, nav, and section.

## HTML5 Document Structure

### Structuring HTML5 Doc 

You can think of the sections of a page as a table of content. Sections in HTML are generally generated through the use of headings. Headings create a implicit section. sub-sections are created when the heading of a lower rank is used.

* `<h1>` Exploring Trees
    * `<h2>` Tree types
        * `<h3>` Decidusous tree
        * `<h3>` coniferous trees
    * `<h2>` Taking care of trees
        * `<h3>` Basic tree maintenance
        * `<h3>` proper water levels
    * `<h2>` Learning about trees
    * `<h2>` Contact me

Recommended to have a strategy for using headings that create the desired page structure.
Headings are good at defining content but the don't group content.
HTML4 approach was to always use `<div>` to create sections.

As of HTML5 we now have: 
* `article` - standalone content. The content within this section could stand on its on if it were removed from the page, for example if it were sent to a RSS feed.
* `aside` - related to main content, but not part of it. Relates to its siblings but it's not really part of them.
* `nav`
* `section` - groups semantic sections together. Grouping content which goes together.

A lot of times, it's a judgement call when to use them. You should be consistent with how you use them.

Also semantic grouping elements: `footer`, `header` and `main`.

### Defining HTML5 documents

First thing you need is a doctype declaration `<!doctype html>`
Next you need an html tab with the lang attribute `<html lang="en"></html>`
No closing tag needed in html5
Inside head you need a `<meta charset="utf-8">` tag

### Supporting legacy browsers

Lack of support in IE9 for HTML5 elements, there is a JS shim which can be loaded in head to take care of creating those elements. It can be encased in a conditional comment which `IE` will recognize and load.

### Organizing Content

Making a list of the page content and organizing the content ahead of time.

### Creating document sections

```html
<header><!--branding and navigatio content --></header>
<main> 
  <!-- we wrap the article to define the main content
    You want to leave the article tag because it has semantic value -->
  <article>
    <!-- main content -->
    <section><!-- comments related to main content --></section>
  </article>
</main>
<aside><!-- ad content --></aside>
```

### Using headings properly

Headings do the heavy lifting of conveying the document structure to search engines and other devices. Everytime you use a heading, a new implicit section is created. It became dogma to create only one h1 per page, but the html5 spec doesn't limit you in this way. Heading aren't about bold text but defining levels of sections.

### Building Navigation

`<nav>` could be inside the header or outside, it depends on the use case. Pretty common to organize nav in a `<ul>`. This is done because menus are semantic groups of links and we need a semantic way to group all these links together and the `<ul>` is the best option we have for creating a group of links.

### Properly Nesting Structure

A individual comment could be surrounded by a `<article>` tag. Up for debt but technically a comment can stand on its own.

### Structuring headers

You're not limited to only using one `<header>` per page. It represents introductory content for the nearest ancestor. A `header` typically contains a group of introductory or navigational aids.

Solution for a tagline is a `<p>` tag
```html
<header>
<h1>Cycle Tracks</h1>
<p>your complete biking train source</p>
```

### Structuring Footers

Contains information about its section: who wrote it, disclaimers, copyright data.
You can also have multiple footers on a page if you need it. Footers don't have to be the last element inside the section or page.

### Sectioning Roots 

sectioning root elements are `<blockquote>`, `<body>`, `<fieldset>`, `<figure>` and `td`

Their internal structure is completely ignored by the document outline. There internal structure of the blockquote really doesn't matter.

## Grouping Content with HTML5

### [working with figure and figcaption](http://w3c.github.io/html/grouping-content.html#the-figure-element)

`figure` element can be used to annotate illustrations, diagrams, photos, code blocks, etc. Can be used to wrap any type of content, commonly used for images.

```html
<figure>
  <img src="path/to/img" />
  <figcaption>A caption about the image.</figcaption>
</figure>
```

Can be used to wrap anything from an image to a poem. Any content that is illustrative, can be contained within a figure element.

### [Grouping content with asides](http://w3c.github.io/html/sections.html#the-aside-element)

Aside element represents a section of a page that consists of content that is tangentially related to the content of the parenting sectioning content.
Ideally you want your visual representation to match your semantic representation.

### [Using divs in HTML5](http://w3c.github.io/html/grouping-content.html#the-div-element)

The `div` element has no special meaning at all. Authors are strongly encouraged to view the div as a last resort option for when no other element is suitable. Using a more semantic element leads to better accessibility for readers and better maintainability for authors.

Useful for when you want to group elements without giving them any semantic seperation such as putting related content into a 2 column layout, you're grouping simply for styling sake, or when building widgets like accordions 

### Working with lists in HTML5

small changes to `ol` in html5. New values for the `content` attribute, `reversed` although it's not supported.

`dl` definition list is a description list of zero or more term-description groups. A list containing a term `dt` and one or more definitions for that term `dd`.

```html
<dl>
  <dt>Blanco tequila</dt>
  <dd>The purest form of the blue agave spirit...</dd>
  <dt>Reposado tequila</dt>
  <dd>Typically aged in wooden barrels for between two and eleven months...</dd>
</dl>
```

### Emphasizing text correctly

HTML5 reintroduced the bold and italic tags.

`i` tag represents text that is in a different voice or mood
`em` element represents stress/emphasis of its context
`b` text to which attention is being drawn to it but no extra importance and no alternate voice or mood
`strong` strong importance. seriousness or urgency for its contents.

### Citing Works Semantically

surround quote in `<blockquote>`.
The quote itself can be surrounded with the `<q>` tag.
`<blockquotes>` are not part of the normal document flow, so you could use a `<footer>` to surround the citation and apply styling. In addition the citation should be surrounded with a `<cite>` tag. footer could of been left off, but it does give structural integrity.

### Using the address element

Used for the contact information for the generator of a specific article or document.

### Using the small element

Used to represent legal text, or any text that would be considered small print.
Does not de-emphasize or lower the importance of text.
Shouldn't be used for extended spans of text.
In HTML4 `small` used to be used to only represent small text.

### Using the mark element

If you're quoting somebody and you want to emphaize something that wasn't originally emphasized, then this is perfect for this.

Also used to highlight parts of a document that are matching some search string.

Browser default styling is it highlights the text.

### Working with date and time

`time` element

Used for representing date or time on the page

`datetime` attribute – a representation of the elements content in a machine readable format. Pass if the text in time isn't in a valid date/time format.

Using the time element will allow users to save the date to their calendar.

### Defining Link Relationships

`rel` attribute defines what type of link the elements create.
`rel="nofollow"` tells search engines not to link the content of the linked page with your page.
You can use more than one rel attribute on an element – `rel="nofollow external"`

## Extending Meaning

### Meta Tags

a general way to define document level meta data. 

`<meta charset="utf8">` defines character encoding for the page.
This can be expanded upon. Most people don't use keywords.
Descriptions are used when search engines give a description of your page.

```
<meta name="description" content="short descriptiona of the page">
```

for search engines and other user-agents

Other usecasees: Meta tags are used by Twitter to describe what the page will look like when it's tweeted. You use Twitter specific meta tags. Same with Facebook.

### Using class and ID attributes

impart semantic meaning with class and styling hooks.

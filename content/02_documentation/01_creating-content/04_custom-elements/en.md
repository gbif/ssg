---
title: Custom elements
description: How to create and insert custom HTML
---

# Custom elements

There are several ways that we can insert custom elements.

## The simplest

The simplest way to insert custom html is to simply write it in the markdown file. 
<h4 style="color:tomato">This headline is inserted and formatted in the markdown file as html</h4>

```highlight
<h4 style="color:tomato">This headline is inserted and formatted in the markdown file as html</h4>
```

## Inject your own html files
Writing html in markdown will quickly grow messy and should be avoided. Instead you should create a seperate file and reference it. Here we insert a map located at `src/templates/custom/map.test.html`. 

```highlight
templates:
- path: map-test.html
```

```styledYaml
templates:
- path: map-test.html
```
Above map is simply a html file we inject. But we can use variables and templates as well.

## Custom templates
In fact the file you point to is a [Swig](http://paularmstrong.github.io/swig/) template and you can parse arguments to it. Your templates should also be located in the folder `src/templates/custom`. Using templates allow us to reuse componenets and allow editors to edit values without having to edit the HTML. Below is an example of more advanced template usage.

*Result - code below*

```styledYaml
templates:
- path: contact_example.html
  contacts:
  - name: Beate Carola
    image: http://im1.peldata.com/bl1/7530/6bg.jpg
    mail: beate@spam.org
    tel: +23 2393 7498
    info: Hobby Gardener
  - name: Bobby Coal
    image: http://vanimg.s3.amazonaws.com/portrait-9.jpg
    mail: bobby@spam.org
    tel: +23 24987 29384
    info: Professional dancer
```

*In our markdown*

```highlight
templates:
- path: contact_example.html
  contacts:
  - name: Beate Carola
    image: http://im1.peldata.com/bl1/7530/6bg.jpg
    mail: beate@spam.org
    tel: +23 2393 7498
    info: Hobby Gardener
  - name: Bobby Coal
    image: http://vanimg.s3.amazonaws.com/portrait-9.jpg
    mail: bobby@spam.org
    tel: +23 24987 29384
    info: Professional dancer
```

*Our template file `src/templates/custom/contact_example.html`*

```highlight
<!--Swig template-->
<div class="contacts">
	{% for contact in contacts %}
	<div class="contact">
		<div style="background-image: url({{contact.image}})"></div>
		<address>
			<span>{{contact.name}}</span>
			<span>{{contact.info}}</span>
			<span><a href="mailto:{{contact.mail}}">{{contact.mail}}</a></span>
			<span><a href="tel:{{contact.tel}}">{{contact.tel}}</a></span>
		</address>
	</div>
	{% endfor %}
</div>
```

*And then we need to style our new template. For example in `src/stylus/components/contact.styl`*

```highlight
//stylus
$image-size = vr-block(10)

.contacts
	margin: auto
	display: flex
	flex-wrap: wrap
	justify-content: center
.contact
	flex: 0 0 auto
	margin:auto
	display: inline-block
	margin: 2em
	div
		margin:auto
		width: $image-size
		height: $image-size
		border-radius: ($image-size / 2)
		background-size: cover
		background-position: center
	address
		margin: 1em
		span
			display:block
			text-align: center
			font-weight: 400
			padding: 2px
			a
				padding: 2px
```

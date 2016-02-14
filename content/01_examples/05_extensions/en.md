---
title: Extensions
---

# Markdown extensions

*The markdown syntax can be extended*

Below contacts are written in markdown using a custom markdown renderer. You can insert custom elemnts into the document. It requires that a developer has created the templates first, but after that we can use and change the content from the markdown files.

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

The extension allows the editor to write Yaml and add structured data. It is not ideal, but it allows a lot of freedom and might be useful. It looks like this in the markdown file:

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
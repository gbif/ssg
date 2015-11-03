---
title: Extensions
category: examples
---

# Markdown extensions

The markdown syntax can be extended

Below contacts are written in markdown using a custom markdown renderer.

```gbif
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

The extension allows the editor to write Yaml and add e.g. contacts. It is not ideal, but in some cases it might be useful. It looks like this in the markdown file:

```
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
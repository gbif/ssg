---
title: Multilingual
category: multilingual
type: root
draft: false
---

# Multilingual

_Sites can be multilingual_

Be supplying more markdown files the sites can be made multilingual. You also need to specify the languages. If the language files are not present the main language content will be shown. In this case english.

The file specifying the languages should be placed in content root and called `languages.yml`. Below is an example. `en/dk/es` refers to how the language will show up in the url. `name` is how it will appear in the language selector. `dir` is direction and defaults to left to right.

On this site only the front page have multiple versions. And the other languages are in nonsense text.

```highlight
en:
  name: English
dk:
  name: Dansk # danish
es:
  name: Español
en-US:
  name: American
ar:
  name: العَرَبِية #arabic
  dir: rtl
```

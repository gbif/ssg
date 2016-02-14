---
title: Multilingual
description: How to create a multilingual site
---

# Multilingual

_Sites can be multilingual_

Be supplying more markdown files the sites can be made multilingual. You also need to specify the languages. If the language files are not present the main language content will be shown. In this case english. Files should be named by their language. So if you have a language abbreviated `en` then you should name your english files `en.md`. Likewise files with danish content should be named `da.md`. 

The file specifying the languages should be placed in content root and called `languages.yml`. Below is an example. `en/dk/es` refers to how the language will show up in the url. `name` is how it will appear in the language selector. `dir` is direction and defaults to left to right.



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

You also need to supply a translation file for all the buttons on the site (menu, search, etc.). This is done in the translations.yml file located in the root folder. It looks something like this:

```
siteName:
  en: SSG
  da: SSG
  ar: SSG

NavSearch:
  en: Search...
  ar: البحث عن
  da: Søg

NavMenu:
  en: Menu
  ar: قائمة الطعام
  da: Menu

searchPlaceholder:
  en: Search...
  ar: البحث عن
  da: Søg

skipLink:
  en: Skip to main content
  ar: انتقل إلى المحتوى الرئيسي
  da: Gå til hovedindhold

languageSelector_title:
  en: Select language
  ar: اختار اللغة
  da: Vælg sprog

translationNotAvailable:
  en: This text is not available in english
  ar: هذا النص غير متوفر في اللغة العربية
  da: Denne side er ikke tilgængelig på dansk
```

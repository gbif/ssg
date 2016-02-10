---
title: Custom
---

# You can insert custom HTML

You can also inject custom HTML into the document. Just point to it.

```styledYaml
html:
- path: map-test.html
```


Inserting arbitrary html is simple. For anything beyond pure markdown this is what we will use. This requires knowledge about HTML and requires a developer. HTML should be located in the folder `inject`

```highlight
html:
- path: map-test.html
```
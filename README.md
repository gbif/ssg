# SSG
A static site generator for GBIF sub sites.

## Yaml front matter
All markdown files must start with a yaml section
```
---
title: About # will appear as the title in the menu
style: [none] | myclassname # if present it will be added as classname(s) to the article
type: [none], link | menu only# not a page but an external link. requires 'link' to be specified. "menu only" - is nav category, not page.
link: http://www.gbif.org/newsroom/news # it type link, then link to this location
image: https://images/cat.jpg # Header background image. Use sparingly as it is not scaled and take bandwidth.
toc: [none] | true | forced # add a table of content to the page. Default false. Set to 'forced' if it should be visible at all times on medium sized screens. large screens will always show it.
---
```




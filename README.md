# SSG
A static site generator for GBIF sub sites.

## Yaml front matter
All markdown files must start with a yaml section
```
---
title: About # will appear as the title in the menu
style: [none] | myclassname # if present it will be added as a classname to the article
type: link # not a page but a link. requires 'link' to be specified
link: http://www.gbif.org/newsroom/news # it type link, then link to this location
---
```

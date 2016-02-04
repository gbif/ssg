---
title: Images
category: usage
description: How to create responsive images
---

# Responsive images

```styledYaml
images:
- title: portrait
  url: //images.unsplash.com/photo-1445285303476-2f3b16d67b7a
  ratio: 0.3
  license: beate@spam.org
```

You can insert normal images in markdown, but if you need larger images that scales with the device you can insert them using Yaml. This allows us to wrap then in a div and use bottom padding to control the height. The image will now keep aspect ratio as well as fit the screen. And the page won't jump if the image is loaded on a slow connection.

```highlight
images:
- title: portrait
  url: //images.unsplash.com/photo-1445285303476-2f3b16d67b7a
  ratio: 0.3
  license: beate@spam.org
```
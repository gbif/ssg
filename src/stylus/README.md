# Usage

*Numbering*
File numbering indicates loading order. This is purely naming, and the actual loading order is determined from the order of the import statements. 
But it is nice to be able to see this from the folders alone. Use when it adds to readability

## Folder structure
### Setup
TThis is where we set variables and resets.
 
### Elements
Base styling of elements. h1, h2, forms etc.
  
### Layout
layout and navigation. Everything that has to do with the overall structure shared across pages.

### Components
Articles, widgets etc goes here.

## mobile, tablet, laptop, desktop
Styling is done mobile first, then tablet, laptop, desktop (if different).
Media queries (as well as legacy rules) are done in the place where the remaining styling of that element takes place. 
This creates longer css, but makes it more readable. 
If the file is large, then it is okay to place it in individual file. But keep them next to the file the augment. 

## Legacy
Legacy styling should be at the bottom of the individual files that they overwrite.


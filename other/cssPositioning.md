# CSS Position

Position allows you to take elements out of the normal document layout flow and make them behave differently.

Direction properties `left, top, right, bottom`

4 main positions

- **Static**: The default state of all HTML elements. Standard flow. Direction properties don't work with static positioning, they are set to their defaults, `auto`.

- **Relative**: Item fits within the normal layout flow, except it now has access to the direction properties to do some final positioning. Direction properties can be used to push element so it overlaps other elements. if you set `top: 30px` it will push the element `30px` down.

- **Absolute**: This takes the element out of the normal document flow, it now sits on its own layer seperate from everything else. If 2 elements are next to each other and one of them is absolute positioned, that element will sit on top of the other. This allows us to create UI elements which don't interfere with the position of other elements on the page, such as modals or tooltips.

The direction properties behave differently with absolutely positioned elements. Rather than saying how far the elements should move, they specify how far from the containing element they should be positioned. So `left: 30px` means the element should be `30px` from the "containing elements" left side – [example](http://jsbin.com/xufiqov/edit?html,css,output)

**Position Context**

An elements containing element by default is the `<html>` element, so `top: 0` will sit against the top of the screen - [example](http://jsbin.com/xufiqov/2/edit?html,css,output)

This containing element of an absolute positioned element is called the **position context** and it can be changed! You change it by setting the position of one of its ancestors to `relative`. It will always position itself to it's closest ancestor whose position is relative. [example](http://jsbin.com/xufiqov/edit?html,css,output)

If there are 2 positioned elements next to each other in the document they will overlap. Whichever one appears after the other in the html (also called source order) will be on top. [example](http://jsbin.com/xufiqov/4/edit?html,css,output). This can be changed with the `z-index` property. Just giving the first element a `z-index` of `1` will place it on top of the other element. [example](http://jsbin.com/xufiqov/5/edit?html,css,output)
One thing to note is that `z-index` only accepts unitless values, there's no `px`,`ems` or anything like that.


- **Fixed**: Works exactly the same as absolute with one key difference, fixed position always fixes itself relative to the browser viewport. This means the item will remain fixed in place regardless of where the user scrolls in the document. [example](http://jsbin.com/xufiqov/6/edit?html,css,output)

- **Experimental position: sticky**: Support not yet widespread. This is sort of a hybrid between relative and fixed. It allows an element to act like it is relatively positioned until it is scrolled to a certain threshold point at which point it becomes fixed.

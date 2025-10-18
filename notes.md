# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 50.19.56.57
My domain is qrcreate.click
The command to ssh into it is
ssh -i ~/.ssh/epickey.pem ubuntu@50.19.56.57

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

<!DOCTYPE HTML> to declare a document as HTML.

The **<link>** tag lets you link up certain things to the page. For example <link rel="stylesheet" href="thing.css"> will link that particular css file to the page.

The **<div>** tag is simply a container. By default, its a block element. It's mostly used to contain things and encapsulate certain styles together.

To make an <img src=""> tag work with a hyperlink to somewhere, wrap it in an <a href=""> tag.

<p> is paragraph. <ul> is unordered list. <ol> is ordered list. <li> are list items. <h1> is first level heading, <h2> second etc...

<script src="derp.js" ></script> to add javascript.

## CSS

In CSS, you declare a style by doing

```css
identifier {
  property: value;
  property2: value;
}
```

If you put a . before the identifier, that style will refer to what you wrote as element as a class. If you put a # before the identifier, that style will refer to whatever element has that particular id. You can combine different classes and ids in the identifier by using a . between them. So .cool#thing.thing2 will select all elements that are in the cool and thing2 classes and have the id of thing.

If I have these identifiers, it can select based on parent, child, and sibling relationships:

.thing * any element inside an element with class thing period
.thing * > all direct children of and element of class thing
.thing .thing2	any element with class thing2 inside an element with class thing
.thing > .thing2	any element with class thing2 that is a direct child of .thing
.thing + .thing2	any .thing2 immediately after .thing
.thing ~ .thing2	any .thing2 after .thing (siblings that appear after)

This is the CSS box model:
Content is the actual substantive stuff that makes up the element itself.
Padding is the space in an element between the context and the elements border.
Border is the border around an element. It therefore wraps around the element context and its padding This can be specified.
Margin is the space OUTSIDE of an element that separates it from other elements.
Height and Width of an element lets you set the element's CONTENT height or width in pixels px. You can specify 100vh if you want it to grow to be the whole page.

Vertical Margin Collapsing is where you have two vertical margin in collision with each other. The largest of the margins will win and they will collapse together with the final distance between them being the largest margin. This does NOT happen on horizontal margins.


With the display style, you can specify inline, block, flex (or other stuff probably). inline elements don't start a new line. The tags <span></span> and <a></a> are inline by default. Block element start a new line. <div> and <p> and block elements by default.

background-color: color; This lets you select the background color.
color: color; this lets you select the text color (or other color).

Flex is nice for formatting a page. An element with the style display: flex; is considered a flex container, such that all its children are flex elements of that container. The flex container should specify the flex-direction: (row or column) css property (although its row by default). The children of the flex container will automatically be ordered according to the container's flex direction (row will be order horizontally and column will be ordered vertically). A flex element(child of a container) can also be a flex container.

A Flex container can do justify-content: [center, left, right] and align-items: [center, left, right]. This impacts specifically how the children of the flex container are positioned in the container. The justify-content refers to how you position relative to the main axis of the flex container (will center horizontally if the flex direction is row), and align-item refers to the contra axis (will center vertically if the flex direction is row).

A Flex element (or child of a flex container) should specify the flex: {grow} {shrink} {basis}; style. The grow is a number that will make that child take up space in the flex container proportional to the number put and the number that the other children put in the container. If there are 3 children and they each specify a grow of 1, they will all take 1/3 of the container space. The shrink is the proportion that the element will shrink by if there is not enough space a 0 shrink will not shrink. The basis is specified in pixels px and is the default size that the flex child wants to take up.

## Shell Commands

chmod -	Change permissions
pwd	- Print current directory
cd - Change directory
ls - List files (-l is with more stuff, -a is hidden files)
vim	- Open file in Vim editor
nano - Open file in Nano editor
mkdir - Make a directory
mv - Move or rename
rm - Remove files/directories
man - Show manual
ssh - Connect to remote machine
ps - Show processes (ps aux to do all processes)
wget - Download files from interne
sudo - Run command as root elevated privileges

## HTTP, Domains, DNS, Ports

The domain thing.derp.lol.com

com is the top level domain. lol.com is the root domain. derp.lol.com is the subdomain. thing.derp.lol.com is a subdomain of derp.lol.com

You need a web certificate for HTTPS. It uses TLS (better SSL).

A DNS A record points directly to an ip address, NOT to another domain name. The CNAME DNS record can point to another domain name.

Ports are 16 bit numbers that the computer has. Processes on a computer can listen on these particular ports:
443 is for HTTPS
80 is for HTTP
22 is for SSH

## React Part 1: Routing

Arrow functions (lambda expressions) are defined by (parameters) => {expression; expression; return expression;}. They can also be defined by just (parameters) => expression;

If, else, for, and while statements are largely the same as java. Switch statements are similar but make sure to add a break; statement to prevent fall through. Also, its case "thing":

=== is strict equality and == pseudo equality.

To create a JavaScript Object you can do obj = new Object(). and then do obj.prop = "thing" to edit or add properties. Or you can define an Object literal with obj = {prop : [1, 2], thing: "hi"}.

You can may an array with []. The array has the .map(func) method which will apply the function func to everything and return a new array based on what was return from func. The .forEach(func) applies func to everything but it does not return an array.

JSON is literally the same as an Object literal but the properties are strings in double quotes.

A promise will run synchronously upon construction (it will block the main thread). But, if you chain a .then() or .catch(), the overall execution will be asynchronous.

document.getElementById("coolid") returns a reference to that element that has that particular id. To get started with React, you want to do ReactDOM.createRoot(element), where element is some root element.

Given a particular reference to an element. element.addEventListener(eventType, func) will call the function func and pass in the event object as an argument to func when the event, eventType occurs in relation to the element in question. There are many types of event like "click", "mouseover", "keydown." The event Object has certain properties like type, target (the element that initially sounded the alarm), currentTarget (the element that is currently handling the event if there was event bubbling).

The Document Object Model (DOM) is the representation of the html in the page. The document keyword in js gives you access ot the root element of the page. Effectively, the DOM structure is a tree with document at the top and children that stem underneath (each with their own properties). Every element implemented the DOM element interface and has certain properties as accessible through javascript.

For example an element has the attributes tagName (name of the tag) and children (an array of its children elements). document.createElement("div") will create a div element and return you the reference. You can make that element a child of a particular element by doing parentElement.appendChild(childElement). You can delete a child with parentElement.removeChild(childElement). You can also inject html into an element by setting the element.innerHTML attribute equal to a string literal contain the desiree html within. This can be a cybersecurity risk.

document.querySelector(query). If query has #anid, then it will return the first element with the id of anid. If it has .coolclass, it will return the first element with class coolclass. If query is div, will return the first div it finds (that goes for other element types as well). Also querySelectorAll(query) will return all of the elements that fit that characterization in an array.

element.style.styleProperty = thing; lets you change any style property of an element to whatever you want. Generally speaking you can access any attributes of an html element with that simple dot notation (including href and stuff). The innerText gives you the text in the element and ignores hidden items with display: none. textContent gives you all the text in the element, regardless of it display.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

## Initial Github Repository Assignment
This assignment has been good. I'm not sure if I'm allowed to delete all the previous notes already in this file so I kept them there. I've never really had a reason in any of my other classes to use the git pull command. I've also never seen git status tell me that I was behind origin main before. Having everything nice and organized on github I'm sure will be really nice.
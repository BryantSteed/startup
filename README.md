# The Epic QR Generator

[My Notes](notes.md)

This is a QR code generator that will let you put your own logo in the center!


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever wanted to generate a QR code with your own personal logo in the middle?? Well now you can! With the new state of the art Epic QR Generator, you can upload you QR code and your logo and let the generator work the magic! The best part is that when you sign up with us, you'll be able to save your different QR codes for future use! No need to be regenerating those codes constantly!

### Design

![Design image](designsketch.png)

As you can see. After the user logs in they have the option to generate a QR code by inserting a string and uploading an image file. There's also the option for them to logout and look at their history of past generate QR codes. On the bottom right a websocket connection will give the user a live feed of other users after they generate QR codes.

```mermaid
sequenceDiagram
    actor You
    actor Website
    You->>Website: GET request to website home login page
    Website->>You: Return home page
    You->>Website: User authentication request
    Website->>DB: SELECT for user data
    DB->>Website: returns user data to backend
    Website->>You: validates authentication request and redirects user to account page
    You->>Website: Send request to create a QR code
    Website->>DB: creates the QR code and adds it to the account in the DB
    Website->>You: sends the QR code to the user
    You->>Website: Request to view prevous QR codes
    Website->>DB: SELECT for user QR codes
    DB->>Website: Returns user QR codes for user
    Website->>You: Gives user a nice html page that shows the user QR codes
    Website->>You: Throughout the User's time, sends Websocket updates about other people's activity on the site
```

### Key features

- Ability to generate a QR code
- Ability to have that QR code with your logo
- Saves past QR codes that you have made on your account
- Lets you see other people generating QR codes on the site

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Will have the basic structure of the website. There will be pages for the user Authentication, QR code Generation, and QR code display
- **CSS** - This will give my html pages their unique style. I'll make sure that the specific style renders well on google chrome
- **React** - Logic for user authentication, QR string and logo uploading, and QR code display. Will call service endpoints.
- **Service** - Gets the webpage icon from a 3rd party. Basic credential assembly and user authentication. Endpoint for getting a QR code given a string and/or an image. Endpoint for getting all stored QR codes for a given account
- **DB/Login** - Stores user authentication information and user QR codes. Accessed by the backend.
- **WebSocket** - Will push a notification message to all users when a user succesfully generates a QR code in real time

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://qrcreate.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I made an index.html page for user authentication, which brings them to the qr code generation page, which also has a placeholder for the websocket connection. Then, from there they can view their personal page that has all their saved QR codes from the database.
- [x] **Proper HTML element usage** - Every page has a Head, Body, and Footer.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [x] **Images** - I did not complete this part of the deliverable.
- [x] **Login placeholder** - I did not complete this part of the deliverable.
- [x] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.

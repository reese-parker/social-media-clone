# Social Media Clone

[Use the app here](https://social-media-clone-277a6.web.app/)


## Description

This project is a social media app where users can sign up for an account and post messages.

## Design


* The app uses Firebase Auth to provide secure authentication. Users can create an account and choose a display name, sign out and delete their account. Users can reset their password through an email link.
* Posts are loaded from and saved to a Firebase Firestore database. Users can see every post and edit/delete their own. Posts include the users display name, message and date posted. The feed shows the most recent posts frst.
* React-Router v6 provides routing between the post feed and authentication pages.
* The app features a demo mode with a provided account. When enabled, the app will load an initial snapshot of the database and keep a copy in local state. New posts are displayed during the session but are not saved to the database.
* The website is styled using MUI V5 components. Additional custom styles are applied using CSS modules. Responsiveness is achievied through grids and media-queries.
* App state is managed through Context API. The app features several custom hooks for user inputs, boolean togglers and fetching from the database.
* Hosting is provided through Firebase.


## How it works

* On page load the app calls the useGetPost hook to fetch posts from the database. A brief message detailing demo mode is shown if the demoMode is set to true. 
* Users can sign up for an account using an email address and password, with authentication provided from Firebase Auth. Users are also required to enter a display name.
* Firebase config variables are held in a local env file.
* Users can sign in to their account from the sign in page, or trigger a password reset email. The option to sign in with a demo account is present if demoMode is set to true; the demo account can make posts, edit the messages or delete them.
* A share button to open a form is displayed at the bottom of the screen once a user signs in; editing a post brings up a similar form. Forms are handled with a useInputState hook. Posts are saved to the database and call the useGetPost hook to update the feed with a new database snapshot. If demo mode is enabled, new posts and edits are saved to a copy of the database in state.



## Future Features

* Edit your display name
* Choose a profile picture



## Installation

* To run the app locally you will need to setup a Firebase project with Auth and Firestore enabled. Check the [Firebase Documentation](https://firebase.google.com/docs/web/setup) for detailed steps and instructions.

* Clone the repo by opening terminal and typing

```bash
$ git clone https://github.com/reese-parker/social-media-clone.git
```

* Navigate to the new folder by typing into terminal:
```bash
$ cd social-media-clone
```

* Install the required dependencies by typing into terminal:
```bash
$ npm install
```

* Create a local env file by typing into terminal:
```bash
$ touch .env.local
```

* Setup a Firebase Project and save the config values in the local env file.


* Run the project by typing into terminal:
```bash
$ npm start
```

* To use the demo account you must first create an account with "test@test.com" and "testtest" as the email address and password respectively.

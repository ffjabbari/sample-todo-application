# Example Todo Application
A small application to demonstrate utilizing a Store in Angular to manage Todo items.

## Creator
Stephen Walcher (stephenwalcher@gmail.com)

## Components Used
* Docker/Docker Compose
* Angular 7
* Ngrx Store
* Bootstrap
* SASS

## Installation
To install this application, make sure that you have Docker and Docker Compose installed, then run `docker-compose up --build` from your command line in the root folder. After all containers and components have been downloaded and installed, you should be able to use the application normally.

*Note: It will take a few minutes to fully download and install all components*

## How to Use
Navigate to `http://localhost:80` (or just simply `http://localhost`) to see the Todo Application. From here, you can add new Todo items by typing into the text field and pressing enter. You can also toggle the existing todo items by clicking on them to toggle them on or off.

Filtering is also available by clicking on the "All Tasks", "Completed Tasks" and "Todo Tasks" buttons.

## Testing
Karma testing is available within the Docker container. Enter the following command: `docker-compose exec frontend bash` and run `yarn test` to start the testing apparatus. Once that is running, visit `http://localhost:9987` to view the Karma testing results.

## TODO
I've only just started working on this project and have spent a total of around 7 hours developing this. Over time, I'd like to make the following additions/modifications:

#### Add More Testing Frameworks
In my research for this project, I came across the [Cypress](https://www.cypress.io/) framework. I would like to include this into my project to test the frontend in realtime.

Also, I would like to include e2e testing using the base Angular e2e integration testing.

#### Utilize an external service to persist state
Currently, the application utilizes localStorage to persist the application's state. I would like to update that to utilize a RESTful API and a database in order to store state and the user's data in a more durable manner.

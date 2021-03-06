# Stage Realdolmen - Darts

This project computes dart scores using a Raspberry Pi to observe a dartboard and registering new throws. A Frontend application allows the user to get an overview of the games, making changes to the current game and gathering statistics about indivual games and users.

## Features

### Create Account

![Create an account](./assets/demo/CreateAccount.png)

### Create Game

+ **Casual**:
Does not affect statistics.
+ **Competitve**:
Affects rank in leaderboard and statistics
+ **Tournament**:
Organise a tournament

![Create a game](./assets/demo/CreateGame.png)

### Play Game

+ Add a throw
+ Undo previous throws
+ Start the Raspberry Pi for automatic score detection
+ List of previous throws
+ Keyboard on mobile

![Play a game](./assets/demo/PlayGame.png)
![Play a game](./assets/demo/WinGame.png)

### Active Games/Tourneys

When a game or tournament is paused, you can resume later.
Multiple people can join the same game to add throws with their own device.

![Play a game](./assets/demo/GamesOverview.png)

### Statistics

+ Detailed statistics; how often do you throw in the tripple 20?
+ History of every game played
+ History of every tournament participated

Unfolding a tournament shows the number of participants and the winner. Clicking navigates to overview of the tournament.
Unfolding a game shows the number of legs won per player. Clicking navigates to the overview of the game.

![Play a game](./assets/demo/Statistics.png)

### Archive

Archive is an overview of every game and tournament played in the app. Clicking navigates to the overview of the game/tournament.

![Play a game](./assets/demo/Archive.png)

### Leaderboard

![Leaderboard](./assets/demo/leaderboard.png)

### Raspberry pi
+ Automatically detects when a dart is thrown
+ Automatically detects when a person is walking in front.
+ Correctly calculates the score for 83% of the darts thrown.

![Leaderboard](./assets/demo/dartsResult.png)

### Prerequisits

```
Visual Studio 2019
Visual Studio Code 2019
PyCharm 2019
```

### Authors
* [Thomas Schuddinck](https://github.com/Thomas-Schuddinck) - Software Developer
* [Wouter Opsommer](https://github.com/wouteropsommer) - Software Developer

## Built with

* [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) - Back end softwareframework
* [NuGet](https://nuget.org) - Back end Dependency Management
* [NSwag](https://www.nuget.org/packages/NSwag.AspNetCore/) - API documentation and toolchain
* [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1) - Back end synchronous notifications library
* [React](https://reactjs.org/) - Front end software framework
* [Node.js](https://nodejs.org/en/) - Front end runtime environment
* [Formik](https://jaredpalmer.com/formik/) - Front end form validation
* [Raspian OS](https://www.raspberrypi.org/downloads/raspbian/) - Raspberry Pi operating system
* [Python](https://www.python.org/) - Raspberry Pi scripts

# Application Docs

# Game Cycle

The game cycle is explained in the following section

## Step 1.0: Create new game (front end: React)

A new game can be made by filling in the front end form on the **New Game** page.

> **NOTE:** There is a similar form for creating new players..
## Step 1.1: Save new game (back end: ASP .NET)

The new game is send to and saved in the ASP .NET backend.

## Step 2.0: Start new or existing game (front end: React)

You can either move directly to the newly created game or navigate to the **active games** list, where all the currently unfinished games will be displayed. You can (re-)open a running game by selecting **details** in the list.

## Step 3.0: Taking a initial picture of the board (Raspberry Pi: Python)

Whenever a new game gets opened, a **picture** will be taken of an **empty dartboard**. This is necessary for determining the position of new throws.

> **NOTE:** Whenever the camera gets bumped into or needs to be reset, a new initial picture can be taken for the reconfiguration.
## Step 3.1: Taking a picture of the current board (Raspberry Pi: Python + OpenCV)

A Python script is actively running on the Rasberry Pi, checking the dartboard every few seconds for **new changes**. When detecting new changes, the **coordinates of the new arrow** will be collected for further evaluation.

> **NOTE:** Changes are detected by comparing the last picture with it's predecessor.
## Step 3.2: Calculating area and multiplier (Raspberry Pi: Python)

After receiving new **coordinates**, a Python script will determine where the dart has landed (example: 17) and whether or not a multiplier should be applied. After these 2 fields are determined, they'll be send to the back end.

> **NOTE:** by default the multiplier is 1

## Step 4.0: Updating game information (back end: ASP .NET + SignalR)

When receiving the **area** and **multiplier**, the back end adds the new throw to the current turn of the current player.
When adding the the throw, following checks will be done:
1. check if the current player's **turn** has ended. If so, end the turn, update turn status and assign new current player.
2. check if the current player won the current **leg**. If so, end the leg, update leg status and sort players by score ascending.
3. check if the current player won the **game**. If so, update winner status.

When the game has been updated, the back end will send a signal using **SignalR** and informing all it's observers of it's changes.
## Step 4.1: Updating website information (front end: React)
When receiving a new signal from the back end concerning new changes, the front end sends a new API call to collect all the game info and updating it's components.

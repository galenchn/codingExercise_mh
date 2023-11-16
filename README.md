# codingExercise_mh
pre-interview coding exercise

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Before running the tests, ensure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

## Installing

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the cloned directory.
3. Install the required packages.
   npm install

To execute the tests, run the following command in the terminal:

  npx playwright test

This will launch the Playwright test runner and execute the tests defined in the test suite.

# Deck of Cards API Test Suite

This repository contains automated tests for the Deck of Cards API using Playwright. The tests navigate to the Deck of Cards API website, interact with the API to simulate a blackjack game by drawing cards for two players, and check for the presence of blackjack.

The test suite includes the following scenarios:

1. **API Homepage Check**: Navigate to the Deck of Cards API homepage and verify that the site is up by checking for the presence of the `.title` element.
2. **New Deck Creation**: Request a new deck from the API and confirm a successful response.
3. **Deck Shuffle**: Shuffle the newly created deck and verify the shuffle was successful.
4. **Deal Cards**: Deal three cards each to two players and verify that the correct number of cards has been dealt.
5. **Blackjack Check**: Check both players' cards to see if either has a blackjack.


# Checkers Game Automation Test Suite

This repository contains a Playwright test suite for automating a series of moves in an online Checkers game. The tests include navigating to the game's website, making predefined moves, and verifying the game state after each move.

The test suite covers the following scenarios:

1. **Game Page Load**: Confirm the Checkers game page is properly loaded.
2. **Move Automation**: Perform a series of automated moves within the Checkers game.
3. **Game State Verification**: Before each move, verify the game state is as expected.
4. **Restart Game**: After the moves, restart the game and confirm the new game starts correctly.


    

   

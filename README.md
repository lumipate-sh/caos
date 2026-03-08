# CAOS

CAOS (_kah-oos_), which stands for "Chaotic Archive of Oddities and Sagas", is a simple app to manage owned tabletop rolepaying games (TTRPG), and record game sessions as well as notes about game sessions.

## STATUS

This project has it's first version working on desktop (lacks mobile responsiveness).

It might be archived soon as I intent to do a total refactor of it implementing the lessons i learned during development, and changing directions about the implementation of certain features.

## Current features

- Add and manage RPG items, from basic information about the games, to personal notes, personal rating, and its owned/wishlisted status by the user
- Add and manage game sessions by date, adding notes and associating them to games already on the app
- A dashboard that shows basic statistics about owned games and wishlisted games, information about past and upcoming sessions and the list of the highest rated RPGs
- An option to add dummy data to the app (demo mode) to test features without adding data manually

## The stack

(For now) this project is developed only using Angular, however the tech stack will build up over time as the project grows.

## Motivation

CAOS started development as a practice project to learn how to develop in Angular, being created in the context os the Upskill course, however i've personally have been waiting for an oportunity to develop an app that can be used withing the TTRPG hobby. As such, this app will start as a mere project to learn Angular and will grow over time in order to introduce multiple other features that will be useful within the hobby.

## To do & Future Plans

While this project has basic functionality working, it was a first project using Angular, and it has thought me a lot. In the future,   
- [ ] VERSION 1: Personal shelf
- - [x] Simple record of owned TTRPG games, ephemeral storage (CLI version)
- - [x] CRUD of data
- - [x] Minimalist GUI forms and lists in Angular
- - [x] Memory implementation using localStorage
- - [x] Create dashboard
- - [x] Create feature rich Reads with result filters
- - [ ] Work on UI and responsiveness

- [ ] VERSION 2: Raiding the library
- - [ ] Integration with the [RPGGeek](https://rpggeek.com/) database

- [ ] VERSION 3: Immunity to amnesia
- - [ ] Implement persistant memory & databases
- - - NoSLQ? (mongodb, json...)
- - - SQL? (sqlite...
- - - - TO BE DECIDED YET

- [ ] VERSION 4: Solo adventurer journal
- - [ ] Dice roller
- - [ ] Simple oracle
- - [ ] Note taking (export to markdown files?)

- [ ] VERSION 5+: here be dragons...

## Instructions

## CREDITS
the challenge to make this app was given in the context of the Upskill course, which providade classes, guidance and material.

### color theme

- [Gruvbox](https://github.com/morhetz/gruvbox)

### UI elements

- Angular's Material components were used as a base to the overall GUI 

### fonts

- [Press Start 2P](https://zone38.net/font/#pressstart) by [Cody "CodeMan38" Boisclair](https://zone38.net/), licensed under [SIL Open Font License](https://openfontlicense.org/)   
- [Overpass](https://overpassfont.org/) by [Delve Fonts](https://delvefonts.com/), licensed under [SIL Open Font License](https://openfontlicense.org/)


### AI usage disclosure

some aspects of the development of this app were made with the use of generative artificial intelligente, namely in the generation of dummy data to test the app, the implementation of some functions and debugging and refactoring sections of code.
artificial inteligence, however, had only a small role in the design decicions of the app regarding features, functionality, features and overall development.

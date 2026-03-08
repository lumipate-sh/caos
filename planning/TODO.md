# PROJ MANAGEMENT

## REQUIREMENTS

- use Angular
- create data management system
- full CRUD system
- needs dashboard with some data highligh- - dashboard needs to show 3 or 4 KPIs ccalculated in real time
- - - in this case i would say:
- - - - most played game
- - - - average time between sessions?
- - - - favorite games/top 5
- - - - total of owned games
- lists using ngFor
- filtered lists
- state on each item
- - in here it will be 'has been played' and 'owned' i guess?
- - needs to use ngClass
- dynamic routes for item detail
- - clicking item, app should go to /detail/:id
- reactive forms 
- - needs to have required fields (at least 3)
- - - one should be a customized validation
- - - - using regex i guess?
- - visual feedback on success/fail
- persistant storage of some kind
- - at the start, localstorage

## TODO

- [ ] VERSION 1: Personal shelf
- - [ ] Simple record of owned TTRPG games, ephemeral storage (CLI version)
- - - [ ] create object rpg class
- - - [ ] setup app flow
- - - [ ] create all logic level files
- - - [ ] create function declarations
- - [ ] CRUD of data
- - - [ ] create
- - - [ ] read
- - - [ ] update
- - - [ ] delete
- - [ ] Minimalist GUI forms and lists in Angular
- - - [ ] TBD...
- - [ ] Memory implementation using localStorage
- - [ ] Create dashboard
- - [ ] Create feature rich Reads with result filters
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

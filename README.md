# server

|  URL path  |  HTTP Method  |  RESPONSE (200)| ACTION   |
| :--------- |:-------------:| -------------: |----------|
"/getAllAccounts" | GET | [al accounts] |Get all accounts from DB
"/getOneAccount/:id"|GET|{accountData}|Render specific account(details)
"/saveAccount"|POST|{accountData}|Save account data 
"/getAllEvents"|GET| [all events]|Get events from DB
"/getOneEvent/:id"|GET|{event}|Render details specific event page
"/saveEvent"|POST|Submit create event form|Create new event
"/updateEvent/:id"|PUT|Submit changes|Edit event
"/deleteEvent/:id"|POST|Delete specific event|Delete specific event
# server

|  URL path  |  HTTP Method  |  RESPONSE (200)| ACTION   |
| :--------- |:-------------:| -------------: |----------|
`/api/getAllAccounts` | GET | [All accounts] |Get all accounts from DB
`/api/getOneAccount/:account_id`|GET|{accountData}|Render specific account(details)
`/api/saveAccount`|POST|{accountData}|Save account data 
`/api/updateAccount/:account_id`|PUT|Submit changes|Edit account
`/api/deleteAccount/:account_id`|DELETE|Delete specific account|Delete specific account
`/api/getAllEvents`|GET| [all events]|Get events from DB
`/api/getOneEvent/:event_id`|GET|{event}|Render details specific event page
`/api/saveEvent`|POST|Submit create event form|Create new event
`/api/updateEvent/:event_id`|PUT|Submit changes|Edit event
`/api/deleteEvent/:event_id`|DELETE|Delete specific event|Delete specific event
`/api/auth/signup`|POST|{user}|Create a new user
`/api/auth/login`|POST|{myProfile}|Join in session
`/api/auth/logout`|POST|Logout|Logout
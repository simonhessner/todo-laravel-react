# Questions

## How long did you spend on the coding test?

I spent about 8-10 hours, mainly because it was the first time that I used Laravel. I had some issues with defining the database scheme using migrations, but managed to solve it after a while.

## Which parts were the most challenging?

Understanding the relationship between the Eloquent model and database migrations took me a while. I had a problem with the relation between the `todos` and `todo_lists` tables where I always received an error that the foreign key is null even though I provided it. After some debugging I realized that I needed to add the foreign key to the `fillable` list of the model.
Besides that I really like Laravel and find it easy to use. Especially the artisan command line interface saves a lot of time.

## What would you add to your solution if you had time? What further improvements or features would you add?

**Features**

- I would add user management so that different users can have their own todo lists. Authentification could be done using JSON web tokens
- Nicer confirmation dialogs before deleting lists or tasks
- Nicer error messages instead of using alert
- Ability to search for todos
- Function to move todos between lists
- Use a router library to have a bookmarkable URL for each list (and support browser navigation)
- Live updates either using websockets or polling so that the app automatically syncs between different devices
- Maybe use React Native to also have a mobile app

**Improvements**

- I would reduce the number of requests that are made by the frontend by manually manipulating the state of react-query after adding/updating/deleting lists or tasks. At the moment each of these operations invalidates the local cache and fetches all relevant data from the server again.
- Replace SQLite by MySQL before putting it in production. The reason I use SQLite is that it makes development easier.

## How would you track down a performance issue in production? Have you ever had to do this?

- If the tool is slow (adding, updating, deleting takes too long), I would first inspect the network requests to see what takes how long. I would also check if there are redundant queries (see improvements above) and eliminate these.
- If the remaining queries are still too slow, I would use a profiler in order to see which part of the route controller takes how long. A likely candidate is the database, so it would probably be a good idea to use MySQL or PostgresSQL istead of SQLite. (see improvements above)
- If find operations take too long, setting indices in the database scheme would help
- For larger scale projects a redundant database setup could be used. Alternatively, independent tables could be hosted on different database servers to distribute the load.

I had to use a profiler for a ML project where training a model was very slow. The training procedure was not a standard method because it involved a separate optimizer and learning rate scheduler for each sample rather than a shared one for the whole batch. By rearranging some of the operations I was able to speed up the training by 10-20% (if I remember correctly)

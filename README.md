![screenshot](screenshot.png)

[Followup questions](FOLLOWUP.md)

# How to run the project

1. go to the backend directory
2. run `npm install`
3. run `composer install`
4. copy `.env.example` to `.env`
5. run `php artisan key:generate`
6. run `php artisan migrate` and answer with 'yes' to create the sqlite DB
7. run `php artisan serve` (this also serves the frontend)
8. open http://localhost:8000 

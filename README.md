![screenshot](screenshot.png)

# How to run the project

1. `git clone https://github.com/simonhessner/todo-laravel-react.git`
2. go to the backend directory
3. run `composer install`
4. copy `.env.example` to `.env`
5. run `php artisan key:generate`
6. run `php artisan migrate` and answer with 'yes' to create the sqlite DB
7. run `php artisan serve` (this also serves the frontend)
8. open http://localhost:8000 

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'todo_list_id',
        'completed'
    ];

    public function list(): BelongsTo
    {
        return $this->belongsTo(TodoList::class);
    }
}

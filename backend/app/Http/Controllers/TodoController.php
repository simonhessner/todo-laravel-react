<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        // TODO
        $todos = Todo::all();
        return response()->json([
            'todos' => $todos,
            'name' => 'todo'
        ], 200);
    }

    public function store(string $todo_list_id, Request $request)
    {
        $todo = Todo::create([
            'description' => $request->description,
            'todo_list_id' => $todo_list_id
        ]);
        return response()->json($todo, 201);
    }

    public function show(string $id)
    {
        $todo = Todo::find($id);
        if ($todo) {
            return response()->json($todo, 200);
        } else {
            return response()->json([
                "error" => "Todo item not found"
            ], 404);
        }
    }

    public function update(Request $request, string $list_id, string $todo_id)
    {
        // TODO check if list matches
        $todo = Todo::find($todo_id);
        if ($todo) {
            $todo->completed = $request->completed;
            $todo->save();
            return response()->json($todo, 200);
        } else {
            return response()->json([
                "error" => "Todo item not found"
            ], 404);
        }
    }

    public function destroy(string $list_id, string $todo_id)
    {
        // TODO check if list matches
        $todo = Todo::find($todo_id);
        if ($todo) {
            $todo->delete();
            return response()->json([], 204);
        } else {
            return response()->json([
                "error" => "Todo item not found"
            ], 404);
        }
    }
}

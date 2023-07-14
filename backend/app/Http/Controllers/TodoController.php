<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // This controller has no index function because it would be
    // redundant with TodoListController::show

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
            return response()->json([
                "error" => "Todo item not found"
            ], 404);
        }

        return response()->json($todo, 200);
    }

    public function update(Request $request, string $todo_id)
    {
        $todo = Todo::find($todo_id);
        if (!$todo) {
            return response()->json([
                "error" => "Todo item not found"
            ], 404);
        }

        $todo->completed = $request->completed;
        $todo->save();
        return response()->json($todo, 200);
    }

    public function destroy(string $todo_id)
    {
        $todo = Todo::find($todo_id);
        if (!$todo) {
            return response()->json([
                "error" => "Todo item not found"
            ], 404);
        }

        $todo->delete();
        return response()->json([], 204);
    }
}

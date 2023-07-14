<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // TODO
        $todos = Todo::all();
        return response()->json([
            'todos' => $todos,
            'name' => 'todo'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $todo_list_id, Request $request)
    {
        $todo = Todo::create([
            'description' => $request->description,
            'todo_list_id' => $todo_list_id
        ]);
        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
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

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
    }
}

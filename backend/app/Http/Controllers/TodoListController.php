<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lists = TodoList::all();
        return response()->json($lists, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $lists = TodoList::create([
            'name' => $request->name
        ]);
        return response()->json($lists, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $list = TodoList::find($id);
        if (!$list->exists()) {
            return response()->json([
                'error' => 'List not found'
            ], 404);
        }

        return response()->json([
            'name' => $list->name,
            'todos' => $list->todos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TodoList $TodoList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $list = TodoList::find($id);
        if (!$list->exists()) {
            return response()->json([
                'error' => 'List not found'
            ], 404);
        }

        $list->delete();
        return response()->json([], 204);
    }
}

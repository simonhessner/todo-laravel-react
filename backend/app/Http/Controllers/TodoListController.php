<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function index()
    {
        $lists = TodoList::all();
        return response()->json($lists, 200);
    }

    public function store(Request $request)
    {
        $lists = TodoList::create([
            'name' => $request->name
        ]);
        return response()->json($lists, 200);
    }

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

    public function update(Request $request, string $id)
    {
        $list = TodoList::find($id);
        if (!$list->exists()) {
            return response()->json([
                'error' => 'List not found'
            ], 404);
        }

        $list->name = $request->name;
        $list->save();
        return response()->json($list);
    }

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

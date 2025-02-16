<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['title' => 'Admin', 'description' => 'Administrator: Has Full Access'],
            ['title' => 'Employee', 'description' => 'Employee: needs admin confirmation on some control features'],
            ['title' => 'Student', 'description' => 'Student: Has limited access'],
        ]);
    }
}

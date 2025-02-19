<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScholarshipStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('scholarship_statuses')->insert([
            ['name' => 'Active', 'description' => 'The student is currently enrolled and receiving scholarship benefits.'],
            ['name' => 'Inactive', 'description' => 'The student is temporarily not receiving benefits but may resume later.'],
            ['name' => 'Terminated', 'description' => 'The student failed to meet retention requirements and is no longer eligible for the scholarship.']
        ]);
    }
}

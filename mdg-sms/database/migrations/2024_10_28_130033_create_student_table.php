<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateStudentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Temporarily disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Drop the table if it exists
        Schema::dropIfExists('student');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create the table
        Schema::create('student', function (Blueprint $table) {
            $table->id('studentid');
            $table->unsignedBigInteger('PersonId')->nullable();
            $table->unsignedBigInteger('PrevSchoolId')->nullable();
            $table->unsignedBigInteger('id')->nullable()->unique();
            $table->unsignedBigInteger('ProgramId')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('PersonId')->references('PersonId')->on('people')->onDelete('cascade');
            $table->foreign('PrevSchoolId')->references('PrevSchoolId')->on('prevschool')->onDelete('cascade');
            $table->foreign('id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('ProgramId')->references('ProgramId')->on('program')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Temporarily disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Drop the table
        Schema::dropIfExists('student');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
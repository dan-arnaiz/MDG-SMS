<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        // Drop the table if it exists
        Schema::dropIfExists('people');

        Schema::create('people', function (Blueprint $table) {
            $table->id('PersonId');
            $table->string('FirstName', 100)->nullable();
            $table->string('LastName', 100)->nullable();
            $table->string('MiddleName', 100)->nullable();
            $table->char('Suffix', 5)->nullable();
            $table->dateTime('DoB')->nullable();
            $table->string('Email', 100)->nullable();
            $table->string('Picture')->nullable(); // Add picture field
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
}
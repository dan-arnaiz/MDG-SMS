<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('middle_name', 50)->nullable();
            $table->string('suffix', 10)->nullable();
            $table->date('dob');
            $table->string('email', 100)->unique();
            $table->timestamps();
        });

        Schema::create('contact_nums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->char('title',20);
            $table->char('nums',11);  
            $table->timestamps();
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id(); 
            $table->string('barangay', 100);
            $table->string('city', 100);
            $table->string('province', 100);
            $table->string('zipcode', 10);
            $table->string('street', 150);
            $table->timestamps();
        });

        Schema::create('address_person', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('address_id')->constrained()->onDelete('cascade');
            $table->string('type', 20);
            $table->string('house_num', 10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('persons');
        Schema::dropIfExists('contact_nums');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('address_person');
    }
};

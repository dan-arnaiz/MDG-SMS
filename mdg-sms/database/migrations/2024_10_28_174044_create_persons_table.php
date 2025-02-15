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
            $table->date('dob')->nullable();
            $table->string('email', 100)->unique();
            $table->timestamps();
        });

        Schema::create('contact_nums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->char('title',20);
            $table->char('nums',11)->nullable();  
            $table->timestamps();
        });

        Schema::create('provinces', function (Blueprint $table) {
            $table->id();          
            $table->string('name', 100);
            $table->timestamps();
        });

        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name', 100);
            $table->timestamps();
        });

        Schema::create('barangays', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->nullable()->constrained()->nullOnDelete();         
            $table->string('name', 100);           
            $table->timestamps();
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('barangay_id')->nullable()->constrained()->nullOnDelete();                  
            $table->string('zipcode', 10);
            $table->string('street', 150);
            $table->timestamps();
        });

        Schema::create('address_person', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('address_id')->constrained()->onDelete('cascade');
            $table->string('type', 20);
            $table->boolean('is_alsoMail');
            $table->string('house_num', 200)->nullable();
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
        Schema::dropIfExists('barangays');
        Schema::dropIfExists('cities');
        Schema::dropIfExists('provinces');
    }
};

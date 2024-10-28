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
        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->string('occupation', 100);
            $table->timestamps();
        });

        Schema::create('prev_schools', function (Blueprint $table) {
            $table->id();
            $table->foreignId('address_id')->constrained()->onDelete('set null');
            $table->char('landline', 15);
            $table->string('name', 150);           
            $table->string('email', 100);           
            $table->timestamps();
        });

        Schema::create('siblings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('prev_school_id')->constrained()->onDelete('set null');
            $table->unsignedTinyInteger('age')->nullable();
            $table->string('edu_attain', 100)->nullable();
            $table->timestamps();
        });

        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->char('year', 10);
            $table->timestamps();
        });

        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('prev_school_id')->constrained()->onDelete('set null');
            $table->foreignId('user_id')->constrained()->onDelete('set null');
            $table->foreignId('program_id')->constrained()->onDelete('set null');
            $table->timestamps();
        });

        Schema::create('parent_relations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('sibling_relations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sibling_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('job_titles', function (Blueprint $table) {
            $table->id();
            $table->string('title',100);
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('job_title_id')->constrained()->onDelete('set null');
            $table->foreignId('user_id')->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parents');
        Schema::dropIfExists('prev_schools');
        Schema::dropIfExists('siblings');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('students');
        Schema::dropIfExists('parent_relations');
        Schema::dropIfExists('sibling_relations');
        Schema::dropIfExists('job_titles');
        Schema::dropIfExists('employees');
    }
};

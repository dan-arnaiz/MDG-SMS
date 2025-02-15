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
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->string('occupation', 100);
            $table->char('office_num', 11)->nullable();
            $table->timestamps();
        });

        Schema::create('prev_schools', function (Blueprint $table) {
            $table->id();
            $table->char('landline', 15)->nullable();
            $table->string('name', 150);           
            $table->string('email', 100)->nullable();           
            $table->timestamps();
        });

        Schema::create('siblings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->string('edu_attain', 100)->nullable();
            $table->timestamps();
        });

        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->timestamps();
        });

        Schema::create('years', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->timestamps();
        });

        Schema::create('students', function (Blueprint $table) {
            $table->string('id',10)->primary();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('prev_school_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('program_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('year_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('guardian_relations', function (Blueprint $table) {
            $table->id();
            $table->string('student_id',10);
            $table->foreignId('guardian_id')->constrained()->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });
        Schema::create('sibling_relations', function (Blueprint $table) {
            $table->id();
            $table->string('student_id',10);
            $table->foreignId('sibling_id')->constrained()->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('job_titles', function (Blueprint $table) {
            $table->id();
            $table->string('title',100);
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('employees', function (Blueprint $table) {
            $table->string('id',10)->primary();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->foreignId('job_title_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guardians');
        Schema::dropIfExists('prev_schools');
        Schema::dropIfExists('siblings');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('students');
        Schema::dropIfExists('parent_relations');
        Schema::dropIfExists('sibling_relations');
        Schema::dropIfExists('job_titles');
        Schema::dropIfExists('employees');
        Schema::dropIfExists('years');
    }
};

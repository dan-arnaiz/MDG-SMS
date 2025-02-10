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
        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->string('name',150);
            $table->text('description');
            $table->unsignedSmallInteger('max_slots');
            $table->unsignedSmallInteger('taken_slots');
            $table->boolean('is_full');
            $table->timestamps();
        });

        Schema::create('academic_years', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->timestamps();
        });

        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->char('name', 15);
            $table->timestamps();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name',150);
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('file_reqs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scholarship_id')->constrained()->onDelete('cascade');
            $table->foreignId('file_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
   
        Schema::create('applications', function (Blueprint $table) {
            $table->string('id',10)->primary();
            $table->string('student_id',10);
            $table->string('employee_id',10)->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreign('employee_id')->references('id')->on('employees')->nullOnDelete();
            $table->foreignId('scholarship_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('semester_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('academic_year_id')->nullable()->constrained()->nullOnDelete();
            $table->datetime('date_filed');
            $table->datetime('date_terminated')->nullable();
            $table->boolean('is_current');
            $table->timestamps();
        });

        Schema::create('files_submitted', function (Blueprint $table) {
            $table->id();
            $table->string('application_id',10);
            $table->foreign('application_id')->references('id')->on('applications')->onDelete('cascade');
            $table->string('name');
            $table->boolean('is_submitted');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
        Schema::dropIfExists('scholarships');
        Schema::dropIfExists('files');
        Schema::dropIfExists('file_reqs');
        Schema::dropIfExists('academic_years');
        Schema::dropIfExists('semesters');
        Schema::dropIfExists('terms');
        Schema::dropIfExists('files_submitted');
    }
};

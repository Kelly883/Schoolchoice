<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('applicant_name');
            $table->string('applicant_email');
            $table->string('applicant_phone');
            $table->string('child_name');
            $table->date('child_dob');
            $table->string('child_gender');
            $table->foreignId('desired_class_id')->nullable()->constrained('classes')->onDelete('set null');
            $table->string('status')->default('pending');
            $table->string('application_number')->unique();
            $table->timestamp('submitted_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            $table->string('decision')->nullable();
            $table->text('decision_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};

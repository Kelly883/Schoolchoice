<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_tours', function (Blueprint $table) {
            $table->id();
            $table->string('parent_name');
            $table->string('email');
            $table->string('phone');
            $table->date('preferred_date');
            $table->string('preferred_time')->nullable();
            $table->string('status')->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_tours');
    }
};

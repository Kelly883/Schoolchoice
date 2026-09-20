<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fee_structures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->nullable()->constrained('classes')->onDelete('set null');
            $table->foreignId('academic_session_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->decimal('amount', 10, 2);
            $table->date('due_date')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fee_structures');
    }
};

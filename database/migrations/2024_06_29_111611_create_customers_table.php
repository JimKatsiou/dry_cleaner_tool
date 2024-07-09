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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('middlename')->nullable();
            $table->string('surname');
            $table->string('full_name');
            $table->enum('status', ['active', 'inactive', 'partially active']);
            $table->string('phone')->nullable();
            $table->string('mobile_phone')->nullable();
            $table->string('extra_phone')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('municipality')->nullable();
            $table->string('area')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
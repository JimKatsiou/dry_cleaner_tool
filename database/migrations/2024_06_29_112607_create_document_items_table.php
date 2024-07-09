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
        Schema::create('document_items', function (Blueprint $table) {
            $table->id();
            $table->integer('doc_id');
            $table->integer('service_id');
            $table->string('service_title');
            $table->integer('quantity');
            $table->double('price');
            $table->double('vat');
            $table->double('line_net');
            $table->double('total_final_total');
            $table->enum('status', ['ready', 'unready']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_items');
    }
};

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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->integer('number');
            $table->integer('doc_type_id');
            $table->date('date');
            $table->integer('customer_id');
            $table->integer('doc_status_id');
            $table->double('net_amount');
            $table->double('vat_amount');
            $table->double('total_final_total_amount');
            $table->integer('created_by');
            $table->integer('how_to_pay');
            $table->string('doc_qr')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};

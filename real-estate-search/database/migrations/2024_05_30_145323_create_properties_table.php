<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('project_name')->index();
            $table->string('short_title')->index();
            $table->decimal('price', 15, 2)->index();
            $table->integer('bedroom_count')->index();
            $table->integer('area')->index();
            $table->text('short_description');
            $table->string('type')->index(); // 'sale' or 'rent'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};

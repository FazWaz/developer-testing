<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Property;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PropertiesTableSeeder extends Seeder
{
    
    public function run(): void
    {
        $faker = Faker::create();
        // Add Picsum provider to Faker
        $faker->addProvider(new \Smknstd\FakerPicsumImages\FakerPicsumImagesProvider($faker));

        foreach (range(1, 90000) as $index) {
            $property = Property::create([
                'project_name' => $faker->company,
                'short_title' => $faker->sentence,
                'price' => $faker->numberBetween(10000, 1000000),
                'bedroom_count' => $faker->numberBetween(1, 5),
                'area' => $faker->numberBetween(500, 5000),
                'short_description' => $faker->paragraph,
                'type' => $faker->randomElement(['sale', 'rent']),
            ]);

            $imageCount = 5; // Adjust the range as needed
            for ($i = 0; $i < $imageCount; $i++) {
                Image::create([
                    'property_id' => $property->id,
                    'url' => $faker->imageUrl(),
                ]);
            }
        }
    }
}

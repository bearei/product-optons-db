const path = require('path');
const {
  generateFakeProduct,
  generateFakeVariants,
} = require('../db/fakerCreators');
const faker = require('faker');
const config = require('../knexfile');

const env = 'development';
const knex = require('knex')(config[env]);

// without csv
const seed = async (knex, Promise) => {
  // console.time('seeded');
  for (let i = 0; i < 1000000; i++) {
    let sampleProducts = [];
    for (let j = 0; j < 10; j++) {
      // 1,000 records
      sampleProducts.push(generateFakeProduct());
    }
    await knex('products').insert(sampleProducts);
  }

  let itemCounter = 1;
  let modulo = 0;
  for (let m = 0; m < 3000000; m++) {
    let sampleVariants = [];
    for (let j = 0; j < 10; j++) {
      sampleVariants.push(generateFakeVariants(itemCounter));
      modulo++;
      if (modulo % 3 === 0) {
        itemCounter++;
        modulo = 0;
      }
    }
    await knex('variants').insert(sampleVariants);
  }
  // console.timeEnd('seeded');
};

const runScriptSeed = async () => {
  console.time('createcsvs');
  await seed();
  // await handleVariantCSV();
  console.timeEnd('createcsvs');
};
runScriptSeed();

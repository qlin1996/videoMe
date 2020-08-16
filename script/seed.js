'use strict'
const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')
const faker = require('faker')
const orders = [
  {
    userId: 1
  },
  {
    userId: 2
  }
]
const orderitems = [
  {
    quantity: 5,
    price: 799,
    productId: 1,
    orderId: 1
  },
  {
    quantity: 4,
    price: 799,
    productId: 2,
    orderId: 2
  }
]
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = []
  for (let i = 0; i < 100; i++) {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: '1234',
      billingStreetAddress: faker.address.streetName(),
      billingCity: faker.address.city(),
      billingState: faker.address.state(),
      billingZipCode: 12345,
      shippingStreetAddress: faker.address.streetName(),
      shippingCity: faker.address.city(),
      shippingState: faker.address.state(),
      shippingZipCode: 1345,
      isAdmin: 'no',
      isGuest: 'yes'
    })
    users.push(user.dataValues)
  }
  const claire = User.create({
    firstName: 'Claire',
    lastName: 'Giordano',
    email: 'cgiordano1@gmail.com',
    password: 'claire',
    isAdmin: 'yes',
    isGuest: 'no'
  })
  users.push(claire)

  const products = []
  for (let i = 0; i < 25; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      quantityInStock: 100,
      category: 'Phone'
    })
    products.push(product.dataValues)
  }
  for (let i = 0; i < 25; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      quantityInStock: 100,
      category: 'Tablet'
    })
    products.push(product.dataValues)
  }
  for (let i = 0; i < 25; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      quantityInStock: 100,
      category: 'TV'
    })
    products.push(product.dataValues)
  }
  for (let i = 0; i < 25; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price() * 10,
      quantityInStock: 100,
      category: 'Computer'
    })
    products.push(product.dataValues)
  }
  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )
  await Promise.all(
    orderitems.map(item => {
      return OrderItem.create(item)
    })
  )
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}
// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

const bcrypt = require("bcrypt")

const crypto = require("crypto")

function generateHash(password) {
  const md5sum = crypto.createHash("md5")
  const res = md5sum.update(password).digest("hex")
  return res
}

async function generateUniqHash(password) {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

//SIMPLE HASHING
const a = generateHash("HELLOW WORLD") //b99d971ae61e67f903b45d2313aad8f3
const b = generateHash("HELLOW WORLD") //b99d971ae61e67f903b45d2313aad8f3

console.log(a === b) // True

//Salting + Hashing
async function saltedHashing() {
  const c = await generateUniqHash("HELLOW WORLD")
  const d = await generateUniqHash("HELLOW WORLD")
  
  console.log(c == d) // False
}

saltedHashing()

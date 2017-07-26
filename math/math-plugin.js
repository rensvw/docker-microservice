//Uses modules to export plugin

module.exports = function math(options) {

  // Sum function
  this.add('role:math,cmd:sum', function sum(msg, respond) {
    respond(null, { answer: Number(msg.left).valueOf() + Number(msg.right).valueOf() })
  })

  // Product function
  this.add('role:math,cmd:product', function product(msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  })

}
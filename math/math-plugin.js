// Gebruik javascript modules om de seneca plugin mee te exporteren.

module.exports = function math(options) {

  this.add('role:math,cmd:sum', function sum(msg, respond) {
    respond(null, { answer: Number(msg.left).valueOf() + Number(msg.right).valueOf() })
  })

  this.add('role:math,cmd:product', function product(msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  })

}
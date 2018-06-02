// require main scss file
require('./styles/index.scss')

// require images and files
require('./images/example.png')

class Teller {
  // working decorators from ES7
  @log
  tell () {
    console.log('telling...')
  }
}

function log (target, key, descriptor) {
  console.log(target)
  console.log(key)
  console.log(descriptor)
}

window.onload = function () {
  let t = new Teller()
  t.tell()
}

// main app controller
const Controller = {
  exampleHandler: function (ev) {
    // do your magic
  }
}

// example of adding event handler to an element
// using jquery
$('#h').on('click', Controller.exampleHandler)

// require main scss file
require('./styles/index.scss')

// require images and files
require('./images/example.png')

// main app controller
const Controller = {
  exampleHandler: function (ev) {
    // do your magic
  }
}

// example of adding event handler to an element
$('.example-class').addEventListener('click', Controller.exampleHandler)

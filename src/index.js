import './styles/index.scss'
import './images/example.png'

class Teller {
  // working decorators from ES7
  @log
  tell() {
    console.log('telling...')
  }
}

const log = (target, key, descriptor) => {
  console.log(target)
  console.log(key)
  console.log(descriptor)
}

window.onload = () => {
  let t = new Teller()
  t.tell()
}

// main app controller
const Controller = {
  exampleHandler: ev => {
    // do your magic
  }
}

// example of adding event handler to an element
// using jquery
$('#h').on('click', Controller.exampleHandler)

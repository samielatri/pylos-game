const logThis = function logThis(message) {
  // if we pass an Error object, message.stack will have all the details, otherwise give us a string
  if (typeof message === 'object') {
    message = message.stack || objToString(message);
  }

  console.log(message);

  // create the message line with current time
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time + ' ';

  //insert line
  document.getElementById('logger').insertAdjacentHTML('afterbegin', dateTime + message + '<br>');
}

function objToString(obj) {
  var str = 'Object: ';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + '::' + obj[p] + ',\n';
    }
  }
  return str;
}

const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

logThis(object1);
logThis('And all the roads we have to walk are winding, And all the lights that lead us there are blinding');

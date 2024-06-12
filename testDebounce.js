const debounce = require('lodash.debounce');

const debouncedFunction = debounce(() => {
  console.log('Debounced function executed');
}, 1000);


console.log('Calling function...');
debouncedFunction();
debouncedFunction();
debouncedFunction();
setTimeout(() => {
  debouncedFunction();
}, 500);
setTimeout(() => {
  debouncedFunction();
}, 1500);

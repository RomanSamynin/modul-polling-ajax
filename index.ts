import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import polling from 'rx-polling';

// Example of an Observable which requests some JSON data and completes
const request$ = ajax({
  url: 'https://jsonplaceholder.typicode.com/comments/',
  crossDomain: true
}).pipe(
  map(response => response.response || []),
  map(response => response.slice(0, 10))
);

polling(request$, { interval: 10000 })
  .subscribe((comments) => {
    console.log(comments);
  }, (error) => {
    // The Observable will throw if it's not able to recover after N attempts
    // By default it will attempts 9 times with exponential delay between each other.
    console.error(error);
  });
// export const counter = (function () {
//   var count = 0;
//   return () => ++count;
// })(); // immidiate invoke function expression or self invoking function

export function* autoGen() {
  var count = 0;
  while(true) {
     count++;
     yield count;
  }
}// genrator function Ec -6 
function validate (input, vObj, fixIt) {
  if (vObj.string){
    if (input) {
      if (typeof(input) != 'string' && input !='undefined') {
        if (fixIt) {

        }
        else
          throw new TypeError ('Not a string.');
        }

      else {
        ///so at least it is a string...
        if (input.length>vObj.max){
          if (fixIt) {
            return input.slice(0,vObj.max);
          }
          else
            throw new RangeError ('String too long');
        }
        if (vObj.prohibited && vObj.prohibited.length)
          vObj.prohibited.forEach (char => {
            if (input.includes(char)) {
              if (fixIt) {

              }
              else
                throw new RangeError ('Contains a naughty '+char);
            }
          });
      }
    }
  };
    if (vObj.integer)
      if (input)
      {
          if (typeof(Number(input)) != 'number') {
  console.log (typeof(Number(input)) );
            if (fixIt) {
              return Number(input) || 0;
            }
            else
              throw new TypeError ((Number(input))+' is not an integer.');
            }

        else {
          ///so at least it is an integer...
          if (input>vObj.max)
            if (fixIt) {
              return max;
            }
            else
              throw new RangeError ('Too big.');
        }


      }
}

module.exports = validate;

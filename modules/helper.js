
var __  = require('underscore');

const readline = require('readline');
// Defines all the helper functions

var Helpers = {

   

  
  isEmpty : (obj) => {
    return Object.keys(obj).length === 0;
        },
    

   getJumbleWord :  async function(word){
    var wordsArray      = word.split('');
        jumbleArray     = __.shuffle(wordsArray);

    return jumbleArray.join('');
  },
   rd : readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }),

};

// exporting helper module
module.exports = Helpers;
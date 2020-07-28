// local modules
var help = require('./modules/helper.js');
const conf= require('./modules/conf.js');
const print= require('./modules/print.js');

// global modules

const fetch = require('node-fetch');

//global variables 
const userargs = process.argv.slice(2);
const wordapi = conf.API_URL.BASE_URL+ '/word/';
const wordsapi = conf.API_URL.BASE_URL + '/words';

//start message
print.startMessage();
print.helpMessage();

// fetching url
async function fortWord(url){
    try {

    const response = await fetch(url);
    const json = await response.json();
    return json;

  } catch (error) {
    console.log(error);
  }
};

// definitions 
 function definitions(word){
    let url= wordapi+word+conf.API_URL.DEFINITIONS+conf.API_KEY;

    return fortWord(url)
    .then((result) => {
        return result;
    }     
    
        )
    .catch(err=>
        {
            console.log(err);
            console.log('\n \x1b[35m  \x1b[47mNo definitions found for the word "'+word+'" \x1b[0m \n');
        });

  };

// printing definitions

function printDefinitions(word){
    
    definitions(word)
    .then(data=> {
      if(data.length >= 1){
        console.log('\n \x1b[35m \x1b[47mThe definitions for the word "'+word+'": \x1b[0m \n');
        for(let index in data){
          let arr=data[index].text.split(':');
          console.log((parseInt(index)+1) + '\t' + arr[0]);
        }
      }else{
        console.log('\n \x1b[35m  \x1b[47mNo definitions found for the word "'+word+'" \x1b[0m \n');
      }
    })
    .catch(err=>
        {
            console.log(err);
        });
  };
  
// synonyms 
  let synonyms = (word)=>{
    let url= wordapi+word+conf.API_URL.RELATED_WORDS+conf.API_KEY;
    return fortWord(url)
    .then((data) => {
        return data;
        }     
        )
    .catch(err=>{
      console.log(err);
    });
    };

// printing synonyms

let printSynonyms = (word) => {
      synonyms(word)
      .then(data=>
      {
        
        if(data.length >= 1 && data[0].relationshipType=='synonym'){
          let words = data[0].words;
          console.log('\n \x1b[34m  \x1b[47mThe synonyms for the word "'+word+'": \x1b[0m \n');
          for(let index in words){
            console.log((parseInt(index)+1) + '\t' +words[index]);
          }
        }
        else if(data[1].relationshipType=='synonym'){
          let words = data[1].words;
          console.log('\n \x1b[32m  \x1b[47mThe synonyms for the word "'+word+'": \x1b[0m \n');
          for(let index in words){
            console.log((parseInt(index)+1) + '\t' +words[index]);
          }
        }
        else{
          console.log('\n \x1b[32m \x1b[47m No synonyms found for the word "'+word+'" \x1b[0m \n');
        }
      })
      .catch(err=> console.log(err))
      ;
    };

// antonyms 
  let antonyms = (word) => {
    let url= wordapi+ word+conf.API_URL.RELATED_WORDS+conf.API_KEY;
    return fortWord(url)
    .then((data)=> {
        return data;
    })
    .catch((err)=>
    {
        console.log(err);
    });
  };



// printing synonyms

  let printAntonyms = (word) => {
    antonyms(word)
    .then(data=>
      {
      if(data.length >= 1 && data[0].relationshipType=='antonym'){
        let words = data[0].words;
        console.log('\n \x1b[32m \x1b[47m The antonyms for the word "'+word+'": \x1b[0m \n');
        for(let index in words){
          console.log((parseInt(index)+1) + '\t' +words[index]);
          
        }
      }
      else{
        console.log('\n \x1b[32m \x1b[47mNo antonyms found for the word "'+word+'" \x1b[0m \n');
      }
    })
    .catch((err)=>
    {
        console.log(err);
    });
    
  };

// examples

let examples = (word) => {
    let url= wordapi+word+conf.API_URL.EXAMPLES+conf.API_KEY;
    fortWord(url)
    .then(data=>{
      if(!help.isEmpty(data)){
        let example_sentences = data.examples;
        console.log('\n \x1b[36m \x1b[47m Example usages for the word "'+word+'": \x1b[0m \n');
        for(let index in example_sentences){
          console.log((parseInt(index)+1) +'\t'+ example_sentences[index].text);
        }
      }else{
        console.log('\n \x1b[36m \x1b[47mNo examples found for the word "'+word+'" \x1b[0m \n');
      }
    })
    .catch(err=>{
        console.log(err);
    });
  }

// random word for playing game

 async function randomWord(){
    let url= wordsapi+conf.API_URL.RANDOM_WORD+conf.API_KEY;
    return fortWord(url)
    .then((result) => {
      
      if(!help.isEmpty(result)){
        return result;
      }
       
       })
      .catch((err)=> {
        console.log(err);
    } ) ;
  };



// displaying dictionary of the word

async function dictionary(word) {
    printDefinitions(word);
    printSynonyms(word);
    printAntonyms(word);
    examples(word);
    
  };
  
// game

  let playGame=()=>{
    let game_word;
    let game_word_def = new Array();
     let game_word_syn;
    let game_word_ant;
    randomWord()
    .then(data=>
    {
    game_word = data.word;
    console.log(game_word);
    let promises=[definitions(game_word),synonyms(game_word)];
    Promise.all(promises)
    .then(results=>{
    
        let def_data=results[0];
        let syn_data=results[1];
        // for definitions
        for(let index in def_data){
          game_word_def[index] =  def_data[index].text;
          
        }
        
    let hasSyn = false;
    if(syn_data.length >= 1  && syn_data[0].relationshipType=='synonym')
    {
      hasSyn = true;
      game_word_syn= syn_data[0].words;
    }
    else if(syn_data[1].relationshipType=='synonym')
    {
      hasSyn = true;
      game_word_syn= syn_data[1].words;
    }
    
    if(syn_data[0].relationshipType=='antonym')
    {
     
      game_word_ant= syn_data[0].words;

    }

    console.log('\x1b[36m Find the word with the following definition\x1b[0m ');
        console.log(`\x1b[33mDefinition :\n\t ${game_word_def[0]}\x1b[0m`);
        console.log(' Type the word and press the ENTER key. ');
        let score=0;
        help.rd.on('line', (input) =>
         {
         
         let answer = false;
          if(hasSyn){
            for(let index in game_word_syn){
              if(`${input}` == game_word_syn[index]){
                score+=10;
                console.log('\x1b[30m \x1b[46m Congratulations! You have entered the correct synonym for the word "'+game_word+'"\x1b[0m ');
                help.rd.close();
                answer = true;
                console.log(`\x1b[37m\x1b[42mYour score is ${score}\x1b[0m`);

              }
            }
          }
          if(`${input}` === game_word){
            console.log('\x1b[30m \x1b[46m  Congratulations! You got this.\x1b[0m ');
            score+=10;
            console.log(`\x1b[37m\x1b[42mYour score is ${score}\x1b[0m`);
            help.rd.close();
          }else{

            if((`${input}` == 'a' || `${input}` == 'b' || `${input}` == 'c' || `${input}` == 'd')&& !(answer)){
                             
              switch(`${input}`){
              
                case 'a':   
                            let randomIndex1 = Math.floor((Math.random() * parseInt(game_word_syn.length)) + 1);
                            if(randomIndex1 == game_word_syn.length){
                              randomIndex1 = game_word_syn.length - 1;
                            }
                           
                            console.log(`\t\x1b[33m Synonym :\t ${game_word_syn[randomIndex1]}\x1b[0m`);
                            console.log('\n Try to guess the word again.');
                          
                          break;
                case 'b':     
                              if(game_word_ant==null)
                              {
                                console.log('\n \x1b[36m \x1b[47mNo antonyms found for the word  \x1b[0m \n');
                                print.hintDisplay();
                                break;
                              }
                              let randomIndex2 = Math.floor((Math.random() * parseInt(game_word_ant.length)) + 1);
                              if(randomIndex2 == game_word_ant.length){
                                randomIndex2 = game_word_ant.length - 1;
                              }
                
                               
                              console.log(`\t\x1b[33m Antonym :\t' ${game_word_ant[randomIndex2]}\x1b[0m`);
                              console.log('\n Try to guess the word again.');
                              break;
                case 'c':   
                              let randomIndex3 = Math.floor((Math.random() * parseInt(game_word_def.length)) + 1);
                              if(randomIndex3 == game_word_def.length){
                                randomIndex3 = game_word_def.length - 1;
                              }
                               let arr_def= game_word_def[randomIndex3].split(':');
                              console.log(`\t\x1b[33m Definition :\t' ${game_word_def[randomIndex3]}\x1b[0m`);
                              console.log('\n Try to guess the word again.');
                              break;
                 case 'd':   
                                help.getJumbleWord(game_word)
                                .then(result=>{
                                    console.log(`\t\x1b[33m Jumbled word :\t' ${result}\x1b[0m`);
                                    console.log('\n Try to guess the word again.');
                                  })
                                  .catch(err=> console.log(err));
                              
                              
                             
                              
                              break;   
                
              default:
                              
              }
              }
            else if(!(`${input}` == '1' || `${input}` == '2' || `${input}` == '3') && !answer){
              
              print.retryDisplay(); 
            }
            
            switch(parseInt(`${input}`)){
              case 1:
                console.log('Try  to Guess the word again: ');
                  score=score-2;
              break;
              case 2:
                score=score-3;
                print.hintDisplay();
                 
                
              break;
              case 3:
                score=score-3;
                console.log(`\x1b[33m The correct word is :${game_word} \x1b[0m `);
                console.log(`\x1b[37m\x1b[42mYour score is ${score}\x1b[0m`);
                console.log('\x1b[33m Thank you for playing this game.\x1b[0m  \n\x1b[30m \x1b[46mGame Ended.\x1b[0m ');
                
                help.rd.close();
              break;
              default:
            }
            
          }
        });

    
    })
    .catch(err=>console.log(err));

    
  })
};

  // starting code 
    
  let start= () => {
    if(conf.argslength == 0){
    randomWord()
      .then(data=> {
        console.log(`\n\x1b[33m Word of the Day: ${data.word}\x1b[0m`);
        console.log(`\n\x1b[33m Dictionary of  ${data.word} :\x1b[0m`);
        
        dictionary(data.word);
        
      });
    }else if(conf.argslength == 1){
      let word = userargs[0];
      switch(word){
       case 'play':
          playGame();
          break;
          case 'help':
          print.displayHelp();
          break;
        default:
          console.log('\x1b[33m The dictionary for the word "'+word+'": \x1b[0m \n');
          dictionary(word);
         
      }
    }else if(conf.argslength == 2){
      let word = userargs[1];
     
      switch(userargs[0]) {
          case 'def':
            printDefinitions(word);
            break;
          case 'syn':
            printSynonyms(word);
            break;
          case 'ant':
            printAntonyms(word);
            break;
          case 'ex':
            examples(word);
            break;
          case 'dict':
            console.log('\n\x1b[1m The dictionary for the word "'+word+'": \x1b[0m \n');
            dictionary(word);
            break;
          default:
            print.displayHelp();
      }
    }else{
      print.displayHelp();
    }
  };

console.log('press Ctrl+C to exit');
  //start();
playGame();  
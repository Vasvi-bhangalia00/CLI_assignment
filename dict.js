const https=require('https');
const api_host='https://fourtytwowords.herokuapp.com/';
const readline = require('readline');
const api_key ='a98eff3917981ec80a86523e17be5f61287bd0a6595728ef9feb6a9cf50f354db16fe8aa5e96d7405784d4771876d1ff84d8b644c569371bd70ce16fa49d2fff5e15de4c572b47f55792f763df03a2c7';
const wordapi = api_host + 'word/';
const wordsapi = api_host + 'words/';
const args = process.argv;
const userargs = args.slice(2);
const argslength=userargs.length;

console.log('\x1b[30m \x1b[46m Here is the command line dictionary tool \x1b[0m\'');
console.log('-----Type "dict help" for help-----\n');


 let fortWord = (url, callback) => {
    https.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => data += chunk);
      resp.on('end', () => {
        try {
          let wordData = JSON.parse(data);
          callback(wordData);
        } catch (err) {
          console.log(err.message);
        }
      });
    }).on('error', (err) => {
      console.error(err);
    });
  };

  
let definitions = (word, callback) => {
    let url = '';
    api = word+'/definitions?api_key='+api_key;
    url = wordapi + api;
    fortWord(url, (data) => {
      callback(data);
    });
  };


  let synonyms = (word, callback) => {
    let url = '';
    api = word+'/relatedWords?api_key='+api_key;
    url = wordapi + api;
    
    fortWord(url, (data) => {
      callback(data);
    });
  };


  let antonyms = (word, callback) => {
    let url = '';
    api = word+'/relatedWords?api_key='+api_key;
    url = wordapi + api;
    fortWord(url, (data) => {
      callback(data);
    });
  }


let isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};


let examples = (word) => {
    let url = '';
    api = word+'/examples?api_key='+api_key;
    url = wordapi + api;
    fortWord(url, (data) => {
      if(!isEmpty(data)){
        let example_sentences = data.examples;
        console.log('\n \x1b[36m \x1b[47m Example usages for the word "'+word+'": \x1b[0m \n');
        for(let index in example_sentences){
          console.log((parseInt(index)+1) +'\t'+ example_sentences[index].text);
        }
      }else{
        console.log('\n \x1b[36m \x1b[47mNo examples found for the word "'+word+'" \x1b[0m \n');
      }
    });
  }



  let printDefinitions = (word) => {
    definitions(word, (data) => {
      if(data.length >= 1){
        console.log('\n \x1b[35m \x1b[47mThe definitions for the word "'+word+'": \x1b[0m \n');
        for(let index in data){
          console.log((parseInt(index)+1) + '\t' + data[index].text);
        }
      }else{
        console.log('\n \x1b[35m  \x1b[47mNo definitions found for the word "'+word+'" \x1b[0m \n');
      }
    });
  };


  
  let printSynonyms = (word) => {
    synonyms(word, (data) => {
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
    });
  };
 


  let printAntonyms = (word) => {
    antonyms(word, (data) => {
      if(data.length >= 1 && data[0].relationshipType=='antonym'){
        let words = data[0].words;
        console.log('\n \x1b[32m \x1b[47m The antonyms for the word "'+word+'": \x1b[0m \n');
        for(let index in words){
          console.log((parseInt(index)+1) + '\t' +words[index]);
        }
      }
      else if(data[1].relationshipType=='antonym'){
        let words = data[1].words;
        console.log('\n \x1b[32m \x1b[47mThe antonyms for the word "'+word+'": \x1b[0m \n');
        for(let index in words){
          console.log((parseInt(index)+1) + '\t' +words[index]);
        }
      }
      else{
        console.log('\n \x1b[32m \x1b[47mNo antonyms found for the word "'+word+'" \x1b[0m \n');
      }
    });
  };
  

  
  let wordOftheDay = (callback) => {
    let url = '';
    api = 'randomWord?api_key='+api_key;
    url = wordsapi + api;
    fortWord(url, (data) => {
      if(!isEmpty(data)){
        callback(data);
      }else{
        console.log('\n \x1b[31m  \x1b[47mSorry, unable to fetch the word of the day \x1b[0m \n');
      }
    });
  };


  let randomWord = (callback) => {
    let url = '';
    api = 'randomWord?api_key='+api_key;
    url = wordsapi + api;
    fortWord(url, (data) => {
      if(!isEmpty(data)){
        callback(data);
      }else{
        console.log('\x1b[31m unable to fetch the word! \x1b[0m');
      }
    });
  };


  let dictionary = (word) => {
    printDefinitions(word);
    printSynonyms(word);
    printAntonyms(word);
    examples(word);
  };
  

  let retryDisplay = () => {
    console.log('\x1b[31mYou have entered incorrect word.');
    console.log('\x1b[36mChoose the options from below menu:\x1b[0m');
    console.log('\t1. \x1b[30m\x1b[43mTry Again\x1b[0m\n');
    console.log('\t2. \x1b[30m\x1b[43mTake a Hint\x1b[0m\n');
    console.log('\t3. \x1b[30m\x1b[43mSkip\x1b[0m\n');
  };

  let playGame=()=>{
    let game_word;
    let game_word_def = new Array();
    randomWord((data) => {
    //console.log('Random Word is: ' + data.word);
    game_word = data.word.replace(" ", "%20");
    definitions(game_word, (data) => {
      if(data.length >= 1){
        for(let index in data){
          game_word_def[index] =  data[index].text;
        }
        //console.log('Length of definition array : ' + game_word_definitions.length);
      }else{
        console.log('\x1b[31m Error occured in the process.\n Exiting..... \x1b[0m');
        process.exit();
      }

  
  synonyms(game_word, (data) => {
    let game_word_syn;
    let hasSyn = false;
    if(data.length >= 1  && data[0].relationshipType=='synonym'){
      hasSyn = true;
      game_word_syn= data[0].words;
    }
    else if(data[1].relationshipType=='synonym')
    {
      hasSyn = true;
      game_word_syn= data[1].words;
    }
    
    const rd = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

        console.log('\x1b[36m Find the word with the following definition\x1b[0m ');
        console.log(`\x1b[33mDefinition :\n\t ${game_word_def[0]}\x1b[0m`);
        console.log(' Type the word and press the ENTER key. ');
        let score=0;
        rd.on('line', (input) => {
          let answer = false;
          if(hasSyn){
            for(let index in game_word_syn){
              if(`${input}` == game_word_syn[index]){
                score+=10;
                console.log('\x1b[30m \x1b[46m Congratulations! You have entered the correct synonym for the word "'+game_word+'"\x1b[0m ');
                rl.close();
                answer = true;
                console.log(`\x1b[37m\x1b[42mYour score is ${score}\x1b[0m`);

              }
            }
          }
          if(`${input}` === game_word){
            console.log('\x1b[30m \x1b[46m  Congratulations! You got this.\x1b[0m ');
            score+=10;
            console.log(`\x1b[37m\x1b[42mYour score is ${score}\x1b[0m`);
            rd.close();
          }else{
            if(!(`${input}` == '1' || `${input}` == '2' || `${input}` == '3') && !answer){
              retryDisplay();
            }
            switch(parseInt(`${input}`)){
              case 1:
                console.log('Try  to Guess the word again: ');
                  score=score-2;
              break;
              case 2:
                score=score-3;
                let randomIndex = Math.floor((Math.random() * parseInt(game_word_def.length)) + 1);
                if(randomIndex == game_word_def.length){
                  randomIndex = game_word_def.length - 1;
                }
                console.log('\x1b[30m \x1b[46m Here is your hint:\x1b[0m ');
                console.log(`\t\x1b[33m Definition :\t' ${game_word_def[randomIndex]}\x1b[0m`);
                console.log('\n Try to guess the word again.');
                
        
              break;
              case 3:
                score=score-3;
                console.log(`\x1b[33m The correct word is :${game_word} \x1b[0m `);
                console.log(`\x1b[37m\x1b[42mYour score is ${score}\x1b[0m`);
                console.log('\x1b[33m Thank you for playing this game.\x1b[0m  \n\x1b[30m \x1b[46mGame Ended.\x1b[0m ');
                
                rd.close();
              break;
              default:
            }
          }
        });
      });
    });
  });
};

let displayHelp = () => {
    console.log('\nThe possible commands are:');
    console.log('\t1.dict def <word>');
    console.log('\t2.dict syn <word>');
    console.log('\t3.dict ant <word>');
    console.log('\t4.dict ex <word>');
    console.log('\t5.dict dict <word>');
    console.log('\t6.dict <word>');
    console.log('\t7.dict play');
    console.log('\t8.dict');
    console.log('\t9.dict help');
  };

  let start= () => {
    if(argslength == 0){
      wordOftheDay((data) => {
        console.log(`\n\x1b[1m Word of the Day: ${data.word}\x1b[0m`);
        console.log(`\x1b[1m Dictionary of  ${data.word} :\x1b[0m`);
        
        dictionary(data.word);
      });
    }else if(argslength == 1){
      let word = userargs[0];
      switch(word){
       case 'play':
          playGame();
          break;
          case 'help':
          displayHelp();
          break;
        default:
          console.log('\n\x1b[1m The dictionary for the word "'+word+'": \x1b[0m \n');
          dictionary(word);
      }
    }else if(argslength == 2){
      let word = userargs[1];
      //let url = '';
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
            displayHelp();
      }
    }else{
      displayHelp();
    }
  };
  
  start();
  
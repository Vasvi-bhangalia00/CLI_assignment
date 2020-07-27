var CONFIG = {
    // app name to be uniformally used in whole app
    APP_NAME          : 'DictionaryTool',
  
    // wordnik api key
    API_KEY           : 'a98eff3917981ec80a86523e17be5f61287bd0a6595728ef9feb6a9cf50f354db16fe8aa5e96d7405784d4771876d1ff84d8b644c569371bd70ce16fa49d2fff5e15de4c572b47f55792f763df03a2c7',
  
    // args
                  
    argslength          :   process.argv.slice(2).length,

    
  
    // API url
    API_URL           : {
      BASE_URL              : 'https://fourtytwowords.herokuapp.com',
      DEFINITIONS           : '/definitions?api_key=',
      RELATED_WORDS         : '/relatedWords?api_key=',
      EXAMPLES              : '/examples?api_key=',
      RANDOM_WORD           : '/randomWord?api_key=',
      wordapi               : 'https://fourtytwowords.herokuapp.com/word/',
      wordsapi              : 'https://fourtytwowords.herokuapp.com/words',
    },
  
  
    
    
  
  };
  
  module.exports = CONFIG;
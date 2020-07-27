
let PrintFun={

      retryDisplay : () => {
        console.log('\x1b[31mYou have entered incorrect word.');
        console.log('\x1b[36mChoose the options from below menu:\x1b[0m');
        console.log('\t1. \x1b[30m\x1b[43mTry Again\x1b[0m\n');
        console.log('\t2. \x1b[30m\x1b[43mTake a Hint\x1b[0m\n');
        console.log('\t3. \x1b[30m\x1b[43mSkip\x1b[0m\n');
      },

      hintDisplay: ()=>
                    {
                    console.log('\x1b[36mChoose the type of hint from below menu:\x1b[0m');
                    console.log('\ta. \x1b[30m\x1b[43mSynonym\x1b[0m\n');
                    console.log('\tb. \x1b[30m\x1b[43mAntonym\x1b[0m\n');
                    console.log('\tc. \x1b[30m\x1b[43mDef\x1b[0m\n');
                    console.log('\td. \x1b[30m\x1b[43mJumbled word\x1b[0m\n');
                    },
        displayHelp:  () => {
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
                      },
        startMessage  :()=>console.log('\x1b[30m \x1b[46m Here is the command line dictionary tool \x1b[0m\''),
        helpMessage :()=>console.log('-----Type "dict help" for help-----\n'),
                      
}
module.exports=PrintFun;
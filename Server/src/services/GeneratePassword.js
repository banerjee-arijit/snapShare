const GenerateFunction=()=>{
    const numbers="0123456789";
    const smallLetters="abcdefghijklmnopqrstuvwxyz";
    const bigLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = '';
    for (let i = 0; i < 4; i++) {
        const random=Math.floor(Math.random()*3);
        if(random==0){
            result+=numbers.charAt(Math.floor(Math.random()*numbers.length));
        }
        else if(random==1){
            result+=smallLetters.charAt(Math.floor(Math.random()*smallLetters.length));
        }
        else{
            result+=bigLetters.charAt(Math.floor(Math.random()*bigLetters.length));
        }
    }
    return result;
}

export default GenerateFunction;
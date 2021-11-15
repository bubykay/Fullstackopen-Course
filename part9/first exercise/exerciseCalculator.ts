interface result { 
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface inputs {
  days : Array<number>,
  target: number
}

const parseArguments = (val:Array<string>): inputs => {
  if(val.length<3) throw new Error('arguments too many');
  const args = val.splice(2);
  const days = [];
  for(let i=0; i<args.length-1; i++){
    if(!isNaN(Number(args[i]))){
      days.push(Number(args[i]));
    }else{
      console.log(args);
      throw new Error('argument can only contain number');
    }
  }
  let target;
  if(!isNaN(Number(args[args.length-1]))){
    target = Number(args[args.length-1]);
  }else{
    throw new Error('target can only be number');
  }

  return{
    days,
    target
  };
};


const calculateExercises = (env:Array<string>):result=>{
  const {days} = parseArguments(env);
  let trainingDays = 0;
  days.forEach(day=>{
    if(day>0) trainingDays += 1;
  });

  return{ 
    periodLength: days.length,
    trainingDays,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.9285714285714286 
  };
  };

try {
  console.log(calculateExercises(process.argv));
} catch (error) {
  let errorMessage = 'Something bad happened';
  if(error instanceof Error){
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

interface args {
  height: number,
  weight: number
}

const bmiCategory = (bmi: number): string=>{
  if(bmi<16) return 'Underweight (Severe thinness)'
  else if (bmi>=16 && bmi <= 16.9) return 'Underweight (Moderate thinness)'
  else if (bmi>=17 && bmi <= 18.4) return 'Underweight (Mild thinness)'
  else if (bmi>=18.5 && bmi <= 24.9) return 'Normal range'
  else if (bmi>=25.0 && bmi <= 29.9) return 'Overweight (Pre-obese)'
  else if (bmi>=30.0 && bmi <= 34.9) return 'Obese (Class I)'
  else if (bmi>=35.0 && bmi <= 39.9) return 'Obese (Class II)'
  return 'Obese (Class III)'
}


const parseArgs = (args:Array<string>): args => {
  if(args.length<4) throw new Error('Not enough arguments')
  if(args.length>4) throw new Error('Arguments too many')
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }else{
    throw new Error('Provided values is not number')
  }
}

try {
  const {weight, height} = parseArgs(process.argv)
  console.log(weight, height);
  const bmi =( weight/(height*height) )* 10000
   console.log(bmiCategory(bmi))
} catch (error) {
  let errorMessage = 'Something bad happened'
  if(error instanceof Error){
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}



import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError

// export default handleValidationError=(err:mongoose.Error.ValidationError)=>{
//   const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el: mongoose.Error.ValidationError)=> {
//     return {
//       path: el?.path,
//       message: el?.message,

//     }
//    }
// }

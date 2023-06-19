import ApiError from '../../../errors/ApiError'
//import { IpagenationOptions } from '../../../interfaces/pagenationOption'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import status = require('http-status')

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  //check that logic atumn |01 ,summer
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid code semester')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

// const getAllSemesters = (pagenationOptions:IpagenationOptions) => {

// }

export const AcademicSemesterService = {
  createSemester,
  // getAllSemesters
}

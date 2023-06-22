import ApiError from '../../../errors/ApiError'
import { IGenricResponse } from '../../../interfaces/common'
import { IpagenationOptions } from '../../../interfaces/pagenationOption'
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

const getAllSemesters = async (
  pagenationOptions: IpagenationOptions
): Promise<IGenricResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = pagenationOptions
  const skip = (page - 1) * limit

  const result = await await AcademicSemester.find()
    .sort()
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
}

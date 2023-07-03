import ApiError from '../../../errors/ApiError'
import { pagenationHelpers } from '../../../helpers/pagenationHelper'
import { IGenricResponse } from '../../../interfaces/common'
import { IpagenationOptions } from '../../../interfaces/pagenationOption'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import status = require('http-status')
import { SortOrder } from 'mongoose'

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
  filters: IAcademicSemesterFilters,
  pagenationOptions: IpagenationOptions
): Promise<IGenricResponse<IAcademicSemester[]>> => {
  //const { page = 1, limit = 10 } = pagenationOptions

  //implemet searching options to useing and condition matching
  const { searchTerm, ...filtersData } = filters

  const academicSemesterSearchableFields = ['title', 'code', 'year']

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    pagenationHelpers.calculatePagination(pagenationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortCondition)
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

//sortby=code&sortOrder=desc

// const andConditions = [
//   {
//     $or: [
//       {
//         title: {
//           $regex: searchTerm,
//           $options: 'i',
//         },

//       },

//       {
//         code: {
//           $regex: searchTerm,
//           $options: 'i',
//          }
//       },
//       {
//         year: {
//           $regex: searchTerm,
//           $options: 'i',
//          }
//       },

//     ],
//   },
// ]

import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import status = require('http-status')

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },

    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: acdemicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)

//Handling Same Year and same semester issue
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'AcademicSemester Already Exists')
  } else {
    //aita express er next na mongoes er next
    next()
  }
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)

//same year and same semester er duplicate entrity off korta hba

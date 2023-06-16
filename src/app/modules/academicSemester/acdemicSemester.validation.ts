import { z } from 'zod'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant'

//use Zod
const createAcademicSemisterZodeSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Title is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'start month is need',
    }),

    endMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
})

export const AcademicSemesterValidation = {
  createAcademicSemisterZodeSchema,
}
//req-validation
//body-object
//data -objec

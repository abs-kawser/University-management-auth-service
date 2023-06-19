import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    // res.status(200).json({
    //   success: true,
    //   message: 'academic Semester hit successfully',
    //   data: result,
    // })

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester create SuccessFully',
      data: result,
    })
    next()
  }
)

// const getAllSemesters = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     //pagenation

//     const pagenationOptions = {
//       page: Number(req.query.page),
//       limit: Number(req.query.limit),
//       sortBy: req.query.sortBy,
//       sortOeder: req.query.sortOeder,
//     }

//     const result = await AcademicSemesterService.getAllSemesters(
//       pagenationOptions
//     )
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `Semester all  successfully`,
//       data: result,
//     })
//     next()
//   }
// )

export const AcademicSemesterController = {
  createSemester,
  //getAllSemesters,
}

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

export const AcademicSemesterController = {
  createSemester,
}

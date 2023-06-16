import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    res.status(200).json({
      success: true,
      message: 'academic Semester hit successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const AcademicSemesterController = {
  createSemester,
}

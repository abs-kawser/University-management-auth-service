import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

//It make because result are different
export type IGenricResponse<T> = {
  meta: {
    page?: number
    limit: number
    total: number
  }
  data: T
}

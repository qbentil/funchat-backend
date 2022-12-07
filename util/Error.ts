//  create error function
const CreateError = (message: string, statusCode: number) => {
    const error: any = new Error();
    error.message = message;
    error.statusCode = statusCode;
    return error;
}

export default CreateError;
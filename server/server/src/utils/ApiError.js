class ApiError extends Error{
    constructor(
        status,
        message='failed',
        success=false,
     errors=[],
     stack=''
        
        
    ){
        this.status= status
        this.success= success
        this.data= data
        this.message= message
      if(stack){
          this.stack= stack
      }else{
        Error.captureStackTrace(this, this.constructor)
      }
    }
}


export {ApiError}
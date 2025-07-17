class ApiResponse{
    constructor(
        status,
        success=true,
        data,
        message='success'
        
    ){
        this.status= status
        this.success= success
        this.data= data
        this.message= message
        
    }
}


export {ApiResponse}
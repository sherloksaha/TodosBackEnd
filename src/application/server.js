// import * as Hapi from '@hapi/hapi';
// export default async()=>{
//     const server = Hapi.Server({
//         port:8080,
//         host:"localhost",
//         routes:{
//             cors:true
//         }
//     })

//     server.decorate('toolkit','success',function(data){
//         return this.response(data?.result).code(data?.statusCode)
//     })
//     server.decorate('toolkit','error',function(data){
//         return this.response({message:data.message}).code(data?.statusCode?data?.statusCode:500)
//     })
//     return server
// }

module.exports = {
    packageName:`packages_${process.env.TARGET}`,
    target:process.env.TARGET,
    CopyToBackend:{
        need:true,
        path:'../sub-service-element-backend/public'
    }
}
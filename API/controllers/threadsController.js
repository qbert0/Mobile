const { PrismaClient } = require('@prisma/client');

prisma = new PrismaClient()



class ThreadsController {
    async getThreadById(req, res) {
        try {
            const id = req.query.threadID
            const data = await prisma.thread.findMany({
                where: { id: id },
                include : {
                    comment : {
                        select : {
                            content : true,
                            createAt : true,
                            name : true,
                        }
                    }
                }
              });

            console.log(data);
            res.send(data);
        } catch (error ) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    } 

    async createComent(req, res) {
        try {
            const {
                userId,
                id,
                content,
                name,
            } = req.body
            const data = await prisma.comment.create({
                data : {
                    customerId : userId,
                    threadId : id,
                    content : content,
                    name : name

                }
            });

            console.log(data);
            res.send(data);
        } catch (error ) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    } 

    // get all thread for advice 
    async getAllThread(req, res) {
        try {
            const data = await prisma.thread.findMany({
               include : {
                    comment : {
                        select : {
                            content : true,
                            createAt : true,
                            name : true,
                        }
                    }
               }
            })
            // console.log(data);
            res.send(data);
        } catch (error ) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    } 

    // get all thread for self 
    async getAllThreadForSelf (req, res) {
        try {
            const userId = req.query.userId;
            console.log(userId)
            const data = await prisma.user.findFirst({
                where : {
                    id : userId
                },
                include : {
                    custumer : {
                    select : {
                        id: true,
                    }
                    }
                }
            })
            if(!data) return
            const customerId = data.custumer[0].id
            const user = await prisma.customer.findFirst({
                where : {
                    id: customerId
                },
                include : {
                    listThread : {
                        include : {
                            comment : {
                                select : {
                                    content : true,
                                    createAt : true,
                                    name : true,
                                }
                            }
                        }
                    }
                }
            })
            console.log(user)
            res.send(user)
        }catch (error ) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }
    // creat the new thread 
    async createNewThread (req, res) {
        try {
            const {
                userId,
                gender,
                age, 
                puImage, 
                image,
                major,
                title,
            } = req.body
            const user= await prisma.user.findFirst({
                where : {
                    id : userId
                },
                include : {
                  custumer : {
                    select : {
                      id: true,
                    }
                  }
                }
            })
            const customerId = user.custumer[0].id

            const data = await prisma.thread.create({
                data : {
                    customId : customerId,
                    image : image,
                    content : title,
                    gender : gender,
                    major : major,
                    age: age,
                    puImage : puImage
                }
            })
            console.log(req.body);
            res.send(req.body);
        } catch (error ) {
            console.log(error);
            res.status(500).json({
                errorCode: 1,
                msg: "Server" + error.message
            });
        }
    }

    
}
module.exports = new  ThreadsController();
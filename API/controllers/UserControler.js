const { PrismaClient } = require("@prisma/client");
const { clerkClient } = require("@clerk/clerk-sdk-node");

prisma = new PrismaClient();

class userController {
  async fetchUser(req, res) {
    const userId = req.query.userId;
    try {
      const data = await prisma.user.findFirst({
        where : {
          id : userId
        }
      });
      // console.log(data);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: "Server" + error.message,
      });
    }
  }


  async createUser(req, res) {
    try {
      const response = await clerkClient.users.getUserList();
      const userList = response.data;
      for (const user of userList) {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: user.emailAddresses[0].emailAddress },
              { id: user.id },
            ],
          },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.emailAddresses[0].emailAddress,
              id: user.id,
              role: "Customer",
              phone: "0123456789",
            },
          });
        }
      }
      res.send("Users fetched successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: "Server" + error.message,
      });
    }
  }

  async SearchUser(req, res) {
    try {
      const email = req.query.email;
      const data = await prisma.user.findMany({
        where :{
          emai : email,
        }
      });
      console.log(data);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: "Server" + error.message,
      });
    }
  }
}

module.exports = new userController();

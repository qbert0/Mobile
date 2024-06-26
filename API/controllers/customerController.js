const { PrismaClient } = require("@prisma/client");
const router = require("../routes/scheduleRoute");
require("dotenv").config();
const prisma = new PrismaClient();

class CustomerController {
  async fetchCustomer(req, res) {
    const userId = req.query.userId;
    console.log(userId);
    try {
      const data = await prisma.customer.findMany({
        where: {
          userId: userId,
        },
      });
      console.log(data);
      res.send(data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khách hàng:", error);
      return res.status(500).send("Lỗi khi lấy thông tin khách hàng");
    }
  }

  async fetchCustomerId(req, res) {
    const userId = req.query.userId;
    console.log(userId);
    try {
      const data = await prisma.customer.findFirst({
        where: {
          id: userId,
        },
      });
      console.log(data);
      res.send(data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khách hàng:", error);
      return res.status(500).send("Lỗi khi lấy thông tin khách hàng");
    }
  }

  // for web lay thong tin gom phone, email, name, gender, age
  async fetchCustomerIdForWeb(req, res) {
    const userId = req.query.userId;
    console.log(userId);
    try {
      const data = await prisma.customer.findFirst({
        where: {
          id: userId,
        },
        select : {
          date : true,
          sex : true,
          userId : true,
          firstName : true,
          lastName : true,
        }
      });
      const user = await prisma.user.findFirst({
        where : {
            id : data?.userId
        }
      })
      const datas = {
        user : user,
        data : data
      }
      console.log(datas);
      res.send(datas);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khách hàng:", error);
      return res.status(500).send("Lỗi khi lấy thông tin khách hàng");
    }
  }

  async createCustomer(req, res) {
    const { userId, 
      firstName, 
      lastName, 
      gender, 
      date, 
      address} = req.body;
    console.log(userId + " " + firstName + " " + lastName + " " + gender + " " + date + " " + address);

    try {
      // Kiểm tra xem user đã tồn tại trong database chưa
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // Nếu user không tồn tại, trả về lỗi
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Tạo customer mới với userId, không cần kiểm tra sự tồn tại trước đó
      const newCustomer = await prisma.customer.create({
        data: {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          date: date,
          sex: gender,
          address: address,
        },
      });

      // Trả về thông tin customer mới
      return res.status(201).json(newCustomer);
    } catch (error) {
      console.error("Error creating customer:", error);
      return res.status(500).send("Error creating customer");
    }
  }
}

module.exports = new CustomerController();

import nodemailer from 'nodemailer'

export const sendMail = (email: string, subject: string, message: string) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS
      }
    });
    let mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject,
      html: message
    }

    transporter.sendMail(mailOptions, (error: any, info: object) => {
      if (error) reject(error);
      else resolve(info)
    })
  })
}
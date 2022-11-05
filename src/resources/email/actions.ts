import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, resetToken: string) => {
  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'b.mullerjnr@gmail.com', // generated ethereal user
      pass: '@1996Muller!@#', // generated ethereal password
    },
  });

  await transporter.sendMail(
    {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: 'Password Reset Request', // Subject line
      text: `Reset Token`, // plain text body
      html: `<b>Reset token: ${resetToken}</b>`, // html body
    },
    function (err, success) {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent');
      }
    },
  );

  //   console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

const fs = require('fs');
const nodemailer = require('nodemailer');
const config = JSON.parse(fs.readFileSync("config.json"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port:25,
  auth:{
    user: config.user,
    pass: config.pass
  },
  tls:{
    rejectUnauthorized: false
  }
});

const helpOps = (name,dEmail,score)=>{
  return helpOptions = {
            from: `Building knowledge <thompson0005@gmail.com`,
            to: `<${dEmail}>`,
            subject: `Your quiz scores`,
            text: `Hello ${name}, we want to thank you for taking the time out,
            to test your basic electrical infrastructure knowledge`,
            html:`<div style="width:500px; height: 600px;">
                    <div style="padding: 5px; background-color:salmon;
                      border-bottom: #e4e4e4">
                      <h1 style="text-align: center; margin: 10px auto;
                        ">
                        Hello ${name}
                      </h1>
                    </div>
                    <h3 style="margin: 5px auto; text-align: center; margin-top: 20px; font-size: 24px;">
                      Your score was ${score}
                    </h3>
                    <p style="text-align: center; margin-top: 20px; font-size: 20px">Thank You for wanting to take interest
                      in expanding your knowledge ${name} in electrical infrastructure.
                      By sharpening your skills in this area, it  will prepare you for
                      general careers with elctric companies, or companies that work around electric such as excavation
                      and utility locating companies.
                    </P>
                  </div>`
  }
}

const callTransporter =(name,dEmail,score)=>{
  transporter.sendMail(helpOps(name,dEmail,score),(error,info)=>{
    if(error){
      return console.log(error);
    }
    console.log("the message was sent");
    console.log(info);
  })
}

module.exports = {
  callTransporter: callTransporter
}

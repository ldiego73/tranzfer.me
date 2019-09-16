/* eslint require-atomic-updates: 0 */

import Queue from 'bull'
import nodemailer from 'nodemailer'
import Service from '../service'

const service = new Service()
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const processQueue = new Queue('process-queue', 'redis://127.0.0.1:6379', {
  defaultJobOptions: {
    removeOnComplete: true,
  },
})
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lfdiego7@gmail.com',
    pass: '111111',
  },
})

processQueue.process(async (job, done) => {
  const { data } = job
  const { id } = data

  const mailOptions = {
    from: 'lfdiego7@gmail.com',
    to: 'lfdiego7@gmail.com',
    subject: `Transferencia #${id} Realizada`,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">
        <!--[if !mso]>
                <!-- -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans%3A300,400,700" rel="stylesheet">
        <!--

                    <![endif]-->
        <title>Stay on our mailing list</title>
        <style type="text/css">
          body {
            width: 100%;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            mso-margin-top-alt: 0px;
            mso-margin-bottom-alt: 0px;
            mso-padding-alt: 0px 0px 0px 0px;
          }

          p,
          h1,
          h2,
          h3,
          h4 {
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
          }

          span.preheader {
            display: none;
            font-size: 1px;
          }

          html {
            width: 100%;
          }

          table {
            font-size: 14px;
            border: 0;
          }
          /* ----------- responsivity ----------- */

          @media only screen and (max-width: 640px) {
            /*------ top header ------ */
            .main-header {
              font-size: 20px !important;
            }
            .main-section-header {
              font-size: 28px !important;
            }
            .show {
              display: block !important;
            }
            .hide {
              display: none !important;
            }
            .align-center {
              text-align: center !important;
            }
            .no-bg {
              background: none !important;
            }
            /*----- main image -------*/
            .main-image img {
              width: 440px !important;
              height: auto !important;
            }
            /* ====== divider ====== */
            .divider img {
              width: 440px !important;
            }
            /*-------- container --------*/
            .container590 {
              width: 440px !important;
            }
            .container580 {
              width: 400px !important;
            }
            .main-button {
              width: 220px !important;
            }
            /*-------- secions ----------*/
            .section-img img {
              width: 320px !important;
              height: auto !important;
            }
            .team-img img {
              width: 100% !important;
              height: auto !important;
            }
          }

          @media only screen and (max-width: 479px) {
            /*------ top header ------ */
            .main-header {
              font-size: 18px !important;
            }
            .main-section-header {
              font-size: 26px !important;
            }
            /* ====== divider ====== */
            .divider img {
              width: 280px !important;
            }
            /*-------- container --------*/
            .container590 {
              width: 280px !important;
            }
            .container590 {
              width: 280px !important;
            }
            .container580 {
              width: 260px !important;
            }
            /*-------- secions ----------*/
            .section-img img {
              width: 280px !important;
              height: auto !important;
            }
          }

        </style>
        <!--[if gte mso 9]>
                    <style type=”text/css”>
            body {
            font-family: arial, sans-serif!important;
            }
            </style>
                    <![endif]-->
      </head>
      <body class="respond">

        <!-- pre-header -->

        <table style="display:none!important;">
          <tbody>
            <tr>
              <td>
                <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                  <!-- Edit preview text as required for your platform ======-->
                  {{PreviewText}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- pre-header end -->
        <!-- header -->

        <table bgcolor="ffffff" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td align="center">

                <table align="center" border="0" cellpadding="0" cellspacing="0" class="container590" width="590">
                  <tbody>
                    <tr>
                      <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center">

                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="container590" width="590">
                          <tbody>
                            <tr>
                              <td align="center" height="90" style="height:90px;">
                                <!-- Edit logo as required ======-->
                                <img width="140" border="0" style="display: block; width: 140px;" src="http://www.tranzfer.me/assets/img/piezas-independientes/LOGO1.png" alt="">
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table bgcolor="ffffff" border="0" cellpadding="0" cellspacing="0" class="bg_color" width="100%">
          <tbody>
            <tr>
              <td align="center">

                <table align="center" border="0" cellpadding="0" cellspacing="0" class="container590" width="590">
                  <tbody>
                    <tr>
                      <td align="center" class="main-header" style="color: #343434; font-size: 24px; font-family: Open Sans, Helvetica, sans-serif; font-weight:400;line-height: 35px;">
                        <!-- section text ======-->
                        <div style="line-height: 35px;">
                          TRANZFER NOTIFICATION
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center">

                        <table align="center" bgcolor="eeeeee" border="0" cellpadding="0" cellspacing="0" width="40">
                          <tbody>
                            <tr>
                              <td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="left">

                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="container590" width="590">
                          <tbody>
                            <tr>
                              <td align="left" style="color: #888888; font-size: 16px; font-family: Open Sans, Helvetica, sans-serif; line-height: 28px;">

                                <p style="line-height: 26px; margin-bottom:15px;">
                                  Luis Fernando,
                                </p>

                                <p style="line-height: 26px;margin-bottom:15px;">
                                  La transferecia realiazada, se ha procesado con éxito.
                                </p>

                                <table align="center" bgcolor="5caad2" border="0" cellpadding="0" cellspacing="0" width="220">
                                  <tbody>
                                    <tr>
                                      <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                      <td align="center" style="color: #ffffff; font-size: 14px; font-family: Open Sans, Helvetica, sans-serif; line-height: 22px; letter-spacing: 1px;">
                                        <div style="line-height: 24px;">
                                          <a href="http://localhost:4200/actividad" style="color: #ffffff; text-decoration: none;">VER ACTIVIDAD</a>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                                    </tr>
                                  </tbody>
                                </table>

                                <table align="center" bgcolor="ffffff" border="0" cellpadding="0" cellspacing="0" width="220">
                                  <tbody>
                                    <tr>
                                      <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                                    </tr>
                                  </tbody>
                                </table>

                                <p style="line-height: 28px;">
                                  Recuerda que tu puedes hacer transferencias entre Perú y USA pagando 1.5% de comisión de lo enviado.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <table bgcolor="f4f4f4" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tbody>
            <tr>
              <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
            </tr>
            <tr>
              <td align="center">

                <table align="center" border="0" cellpadding="0" cellspacing="0" class="container590" width="590">
                  <tbody>
                    <tr>
                      <td style="text-align: center;font-size: 13px;color: #888888; font-family: Open Sans, Helvetica, sans-serif;line-height: 24px;">
                        <a href="http://www.tranzfer.me/" style="color: #888888;">tranzfer.me</a>.

                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>

    `,
  }

  await sleep(5000)
  await service.update(id, 'FINISHED')
  console.log('Actualizado')
  try {
    await transporter.sendMail(mailOptions)
  } finally {
    console.log('Enviado')
    done(null, true)
  }

})

processQueue.on('completed', job => {
  console.log(`Job #${job.id} completed`)
})

processQueue.on('error', err => {
  console.log(`Job with error`, err)
})

export default class {
  async add(ctx) {
    const entity = ctx.request.body

    entity.status = 'PROCESSED'

    const id = await service.add(entity)

    processQueue.add({ id })

    ctx.status = 200
  }

  async update(ctx) {
    const entity = ctx.request.body
    const { id, status } = entity

    await service.update(id, status)

    ctx.status = 200
  }

  async list(ctx) {
    ctx.body = await service.list()
  }

  async delete(ctx) {
    await service.delete()

    ctx.status = 200
  }
}

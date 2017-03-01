/*
    Controller functions containing the logic for the document uploads
    Authors : Robert Bryan
*/


var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
var key = process.env.KEY; // password for ggcinternapp@gmail.com

// Setting local env in powershell
// $env:key="password"

// Setting local env in terminal
// export KEY='password'



// placeholder values
var itecCoordinatorEmail = "rbryan3@ggc.edu";
var bioCoordinatorEmail = "rbryan3@ggc.edu";


module.exports.getDocumentUpload = function(req, res) {
    res.render('documentUpload', {
        user : req.session.passport.user
    });
}


// Upload itec resume 
module.exports.uploadItecResume = function(req, res) {
    var typeOfFile = 'resume';
    if (!req.files) {
        return res.flash('info', 'No files were uploaded.');
    }
    sendEmail(req.files.resume, typeOfFile, req, res);
};

// Upload bio essay
module.exports.uploadBioEssay = function(req, res) {
    var typeOfFile = 'essay';
    if (!req.files) {
        return res.flash('info', 'No files were uploaded.');
    }
    sendEmail(req.files.essay, typeOfFile, req, res);
};

//Upload bio transcript
module.exports.uploadBioTranscript = function(req, res) {
    var typeOfFile = 'transcript';
    if (!req.files) {
        return res.flash('info', 'No files were uploaded.');
    }
    sendEmail(req.files.transcript, typeOfFile, req, res);
};

function sendEmail(file, typeOfFile, req, res) {
    var coordinatorEmail;
    var emailSubject;
    var emailText;
    switch (typeOfFile) {
        case 'transcript':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "Placeholder transcript subject";
            emailText = "Placeholder transcript text";
            break;
        case 'essay':
            coordinatorEmail = bioCoordinatorEmail;
            emailSubject = "Placeholder essay subject";
            emailText = "Placeholder essay text";
            break;
        case 'resume':
            coordinatorEmail = itecCoordinatorEmail;
            emailSubject = "Placeholder resume subject";
            emailText = "Placeholder resume text";
            break;
        default:
            console.log('unknown type of file found');
            res.redirect('/documentUpload');
            break;
    }

    transporter = nodemailer.createTransport('smtps://ggcinternapp%40gmail.com:' + key + '@smtp.gmail.com');
            mailOptions = {
                from: '"GGC Interapp Admin" <admin@ggcinternapp>',
                to: [coordinatorEmail], // comment out for now - req.session.passport.user.email],
                subject: emailSubject,
                text: emailText,
                attachments: [
                    {
                        filename: file.name,
                        content: file.data,
                        encoding: 'binary'
                    }
                ]
            }
            transporter.sendMail(mailOptions, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log(typeOfFile + ' sent!');
                res.redirect('/documentUpload');
            })
}
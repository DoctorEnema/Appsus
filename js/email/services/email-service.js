import { storageService } from "../../services/async-storage-service.js";
import { utilService } from "../../services/util-service.js"

export const emailService = {
    query,
    getById,
    save,
    remove,
    update,
    searchByContent,
    filterByStatus,
    sortBy
}

const EMAILS_KEY = 'emails'
const gEmails = createEmails()

function query() {
    return storageService.query(EMAILS_KEY)
}

function createEmails() {
    var emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                folder: 'sent',
                subject: 'Subject',
                from: 'A guy',
                to: 'me',
                body: `Hello, my name is guy`,
                isRead: false,
                sentAt: Date.now(),
                id: utilService.makeId()
            },
            {
                folder: 'inbox',
                subject: 'Hi',
                from: 'ophir',
                to: 'me',
                body: `hi hoe are you?
                are you comung to visit next week ?
                `,
                isRead: false,
                sentAt: 1614362113000,
                id: utilService.makeId()
            },

            
            {
                folder: 'inbox',
                subject: `welcome!`,
                from: 'CATTUS',
                to: 'me',
                body: `Welcome to CATTUS, 
                you free two weeks subscribtion starts today!
                after the two weeks period your account will be charged 11$ per month.
                you can unsucribe at anytime by reaching to our helpteam : helpservices@cattus.com`,
                isRead: true,
                sentAt: 1612790413000,
                id: utilService.makeId()
            },
            {
                folder: 'inbox',
                subject: ' Receipt',
                from: 'wolt',
                to: 'me',
                body: `
                Receipt / Tax invoice (Original) #18423161 
                Order details
                Venue	The Showroom Bakehouse | Betzalel
                Order type	Delivery
                Delivery time	ASAP 
                My comment	
                Total price in ILS	70.00
                The Showroom Bakehouse | Betzalel
                24.06.2021
                ITEM	PRICE	PRICE (NET)	QTY	TOTAL
                Chocolate Cronut	18.00	15.38	1	18.00
                
                Berliner Pistachio	14.00	11.97	1	14.00
                
                בננה פודינג - קלאסי	20.00	17.09	1	20.00
                ‫תרצו כפיות חד״פ עם ההזמנה? 🥄 🌿: לא תודה			1	
                
                Delivery	18.00	15.38		18.00
                
                Subtotal excl. VAT				59.82
                
                VAT 17%				10.18
                
                Total in ILS 				70.00

            ` ,
                isRead: true,
                sentAt: 1611780545000,
                id: utilService.makeId()
            },
            {
                folder: 'inbox',
                subject: 'Hello',
                from: 'better help',
                to: 'me',
                body: ` hi,
                Your counselor Timothy Welch (LPCC, NCC, MAC) sent you a message just now. 

                Log in to your account and reply.
                
                If you have any questions or if you need assistance please contact us at contact@BetterHelp.com.
                
                Thanks,
                BetterHelp.com team
                
                
                
                To unsubscribe, log in to your account, click on the icon in the top right corner, choose Account Settings and click Quit Counseling. 
                
             
                    -------------------------------------------------------------
                    IMPORTANT: If you are considering suicide or if you or any other person may be in danger - please call now 1-800-273-TALK (8255) (24 hours hotline) or 911. 
                `,
                isRead: true,
                sentAt: 1614193632840,
                id: utilService.makeId()
            },
            {
                folder: 'inbox',
                subject: 'Its ya boi',
                from: 'github',
                to: 'me',
                body: `   
                DoctorEnema has invited you to collaborate on the
                DoctorEnema/Appsus repository
                 
                You can accept or decline this invitation. You can also head over to https://github.com/DoctorEnema/Appsus to check out the repository or visit @DoctorEnema to learn a bit more about them. 
                This invitation will expire in 7 days. 
                 
                 
                Note: This invitation was intended for hitotsunohito@gmail.com. If you were not expecting this invitation, you can ignore this email. If @DoctorEnema is sending you too many emails, you can block them or report abuse. 
                 
                Getting a 404 error? Make sure you’re signed in as OphirAdams. 
                Button not working? Copy and paste this link into your browser: 
                https://github.com/DoctorEnema/Appsus/invitations 
                
                `,
                isRead: true,
                sentAt: 1611515895000,
                id: utilService.makeId()
            },
            
            {
                folder: 'inbox',
                subject: 'dropbox',
                from: 'Rotem Carmo',
                to: 'me',
                body: `	 
                Hi ,
                Rotem Carmon (tetch6@gmail.com) invited you to edit the folder "CaMay21-ExcerciseSubmissions" on Dropbox.
                Go to folder
                
                
                Enjoy!
                The Dropbox team
                 
                Who else is invited	96 total
                     Adam Adlin
                     Adi Mittelman
                     Alex Levkov
                    
                `,
                isRead: true,
                sentAt: 1597519698000,
                id: utilService.makeId()
            },
            {
                folder: 'inbox',
                subject: 'order',
                from: 'Blippo Kawaii Shop',
                to: 'me',
                body: `Hi!

                Thank you for your message. Your order was shipped on the 26th of May and delivery usually takes 2-4 weeks. :)
                
                You can track using the following code: 303644959847
                On this website: http://track.4px.com/#/
                
                We hope your order will arrive soon. :) 
                
                Let me know if there's anything else I can do for you - I'm happy to help! :)
                ---------------------------------------------------------------------------------------------------------------------
                Jessica | Blippo Kawaii Shop
                Follow us on Instagram 
                 


                `,
                isRead: true,
                sentAt: 1551133930500,
                id: utilService.makeId()
            },
            {
                folder: 'sent',
                subject: 'app proj',
                from: 'me',
                to: 'ophir',
                body: `Hey ,
                can you check the updates i made on our project?
                `,
                isRead: true,
                sentAt: 1614372914000,
                id: utilService.makeId()
            }
        ]
        utilService.saveToStorage(EMAILS_KEY, emails)
    }
    return emails
}

function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function save(email) {
    return storageService.post(EMAILS_KEY, email)
}

function remove(id) {
    return storageService.remove(EMAILS_KEY, id)
}

function update(id) {
    return storageService.put(EMAILS_KEY, id)
}

function searchByContent(emails, content) {
    return emails.filter(email => {
        return email.body.toLowerCase().includes(content.toLowerCase()) ||
            email.from.toLowerCase().includes(content.toLowerCase()) ||
            email.subject.toLowerCase().includes(content.toLowerCase());
    });
}

function filterByStatus(emails, status) {
    if (status === 'read') {
        return emails.filter(email => {
            return email.isRead;
        });
    }
    else if (status === 'unread') {
        return emails.filter(email => {
            return !email.isRead;
        });
    }
}

function sortBy(emails, sort) {
    if (sort === 'date' || sort === '') return emails.sort((a, b) => (a.sentAt > b.sentAt) ? -1 : 1);
    else if (sort === 'name') return emails.sort((a, b) => a.from.localeCompare(b.from));
}

// let emailDB = [
//     {
//         folder: 'sent',
//         subject: 'assassassass',
//         from: 'assassass',
//         to: 'me',
//         body: `assassassassass
//         assassvvassassass`,
//         isRead: false,
//         sentAt: Date.now(),
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: 'ass',
//         from: 'ass',
//         to: 'me',
//         body: `assassassass`,
//         isRead: false,
//         sentAt: 1614362113000,
//         id: utilService.makeId()
//     },

//     {
//         folder: 'inbox',
//         subject: 'ass',
//         from: 'ass',
//         to: 'me',
//         body: `assassassassass`,
//         isRead: true,
//         sentAt: 1614193632740,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: `ass‏`,
//         from: 'ass',
//         to: 'me',
//         body: `assass`,
//         isRead: true,
//         sentAt: 1612790413000,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: 'ass',
//         from: 'ass',
//         to: 'me',
//         body: `
//         Hi ass ,
//       ass assassassassassassassassassassassassassass
//       ass
//       ass

//       assass
//       ass

//       ass
//       ass
//       assassass

//       assassassassass
//     Sincerely,
//     ass` ,
//         isRead: true,
//         sentAt: 1611780545000,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'sent',
//         subject: 'ass',
//         from: 'me',
//         to: 'ass',
//         body: `assassassass ass

//             -------------------------------------------------------------
//             assass ass`,
//         isRead: true,
//         sentAt: 1614193632840,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: 'assss',
//         from: 'ass',
//         to: 'me',
//         body: `ass ass ass ass ass`,
//         isRead: true,
//         sentAt: 1611515895000,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: 'ass',
//         from: 'ass',
//         to: 'me',
//         body: `assassassassassassassassassassass`,
//         isRead: true,
//         sentAt: 1609277825000,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: 'ass',
//         from: 'ass',
//         to: 'me',
//         body: `ass assassassassassvvvvvvvvv`,
//         isRead: true,
//         sentAt: 1597519698000,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'inbox',
//         subject: 'assassassassassass',
//         from: 'ass',
//         to: 'me',
//         body: `ass
//         ass
//         assassassassassassass`,
//         isRead: true,
//         sentAt: 1551133930500,
//         id: utilService.makeId()
//     },
//     {
//         folder: 'sent',
//         subject: 'ass',
//         from: 'me',
//         to: 'Gali',
//         body: `assassassassassassassass
//         assass`,
//         isRead: true,
//         sentAt: 1614372914000,
//         id: utilService.makeId()
//     }
// ]
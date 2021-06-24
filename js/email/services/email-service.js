import { storageService } from "../../services/async-storage-service.js";

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

function query() {
    return storageService.query(EMAILS_KEY)
        .then(emails => {
            if (!emails.length) {
                emails = emailDB;
                storageService.postMany(EMAILS_KEY, emails);
            }
            return emails;
        }
        );
}

function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function save(email) {
    // for editing email drafts
    // if (email.id) {
    // return storageService.put(EMAILS_KEY, email)
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

let emailDB = [
    {
        folder: 'inbox', subject: 'assassassass',
        from: 'assassass', to: 'me',
        body: `assassassassass
        assassvvassassass`,
        isRead: false, sentAt: Date.now(),
        id: '15511339305941234174'
    },
    {
        folder: 'inbox', subject: 'ass', from: 'ass', to: 'me',
        body: `assassassass`,
        isRead: false, sentAt: 1614362113000, id: '1614273355adfd'
    },

    {
        folder: 'inbox', subject: 'ass',
        from: 'ass', to: 'me',
        body: `assassassassass`,
        isRead: true, sentAt: 1614193632740,
        id: '15511339305941234567'
    },
    {
        folder: 'inbox', subject: `ass‏
    `, from: 'ass', to: 'me', body: `ass
    ass
    `, isRead: true, sentAt: 1612790413000, id: '1614172813000er'
    },
    {
        folder: 'inbox', subject: 'ass', from: 'ass', to: 'me',
        body: `
        Hi ass ,
      ass assassassassassassassassassassassassassass
      ass
      ass

      assass
      ass

      ass
      ass
      assassass

      assassassassass
    Sincerely,
    ass` ,
        isRead: true, sentAt: 1611780545000, id: '1611780545000aa'
    },
    {
        folder: 'seassnt', subject: 'ass',
        from: 'me', to: 'ass',
        body: `assassassass ass
        
            -------------------------------------------------------------
            assass ass`,
        isRead: true, sentAt: 1614193632840,
        id: '15511339305941234598'
    },
    {
        folder: 'inbox',
        subject: 'assss',
        from: 'ass', to: 'me',
        body: `ass ass
        ass ass ass  
        `,
        isRead: true, sentAt: 1611515895000,
        id: '15511339308001234444'
    },
    {
        folder: 'inbox',
        subject: 'ass',
        from: 'ass', to: 'me',
        body: `ass
        assassassassassassassassassass
`,
        isRead: true, sentAt: 1609277825000,
        id: '15511339308001234567'
    },
    {
        folder: 'inbox', subject: 'ass',
        from: 'ass', to: 'me',
        body: `ass assassassassassvvvvvvvvv"        
`,
        isRead: true, sentAt: 1597519698000,
        id: '15511339307001234567'
    },
    {
        folder: 'inbox', subject: 'assassassassassass',
        from: 'ass', to: 'me',
        body: `ass
        ass
        assassassassassassass`,
        isRead: true, sentAt: 1551133930500,
        id: '115511339305001234567'
    },
    {
        folder: 'sent',
        subject: 'ass',
        from: 'me', to: 'Gali',
        body: `assassassassassassassass
        assass`,
        isRead: true, sentAt: 1614372914000,
        id: '15511339308031234567'
    }
]
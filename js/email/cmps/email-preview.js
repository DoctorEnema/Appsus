// שוב אין לי מושג מה עשיתי פה 
/// זה מרגיש נכון 
///כל הלילה יש לי כאב ראש מזה 
// הייתי צריכה לעשות מסודר יותר 
import { eventBus } from "../../services/event-bus-service.js"


export default {
    props: ['email'],
    template: `
    <section class="email-preview" :class="{read: email.isRead}">
        <div class="email-info">
            <div class="from">{{email.from}}</div>
            <div class="subject">{{email.subject}}</div>
            <span> - </span>
            <div>{{bodyPreview}}</div>
            <div class="email-date">{{emailDate}}</div>
        </div>
        <div class="email-btns">
            <button class="toggle-read" @click.stop="readToggled(email)"></button>
            <button class="remove" @click.stop="emailEreased(email.id)"></button>
        </div>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        emailEreased(id) {
            eventBus.$emit('emailEreased', id)
            eventBus.$emit('show-msg', { type: 'success', txt:'Erased!' })
        },
        readToggled(email) {
            eventBus.$emit('readToggled', email)
        }
    },
    computed: {
        bodyPreview() {
            return this.email.body.substr(0, 25) + '...'
        },

        emailDate() {
            let sentDate = new Date(this.email.sentAt).toString()
            let currDate = new Date().toString()

            if (sentDate.substr(0, 15) === currDate.substr(0, 15)) {
                return sentDate.substr(16, 5);
            }
            /// if it's the same year- show date without year
            else if (sentDate.substr(11, 4) === currDate.substr(11, 4)) {
                return sentDate.substr(3, 7);
            }
            /// if it's from another year- show full date 
            else return new Date(this.email.sentAt).toLocaleDateString()
        }
    },
}


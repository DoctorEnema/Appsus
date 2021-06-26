// שוב אין לי מושג מה עשיתי פה 
/// זה מרגיש נכון 
///כל הלילה יש לי כאב ראש מזה 
// הייתי צריכה לעשות מסודר יותר 
import { eventBus } from "../../services/event-bus-service.js"


export default {
    props: ['email'],
    template: `
    <section>
        <td>{{email.subject}}</td>
        <!-- <h2></h2>
        <p>{{email.body}}</p> -->
        <button @click.stop="emailEreased(email.id)">Erase</button>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        emailEreased(id) {
            eventBus.$emit('emailEreased', id)

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


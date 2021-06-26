// import { eventBus } from '../../../site-services/event-bus.js'
import { emailService } from '../services/email-service.js'
import { utilService } from '../../services/util-service.js'

export default {
    props: ['replayEmail', 'note'],
    name: 'email-compose',
    template: `
        <div>
            <form @submit.prevent="emailSubmitted">
                <button  @click.prevent="composeClosed">X</button>
                <h3>New Email</h3>
                <input v-model="to" placeholder="to:">
                <input v-model="subject" placeholder="subject:">
                <textarea rows="12" cols="9" v-model="body" placeholder="your email here..."></textarea>
                <button type="submit" class="email-submit-btn">Send</button>
            </form>
        </div>`,
    data() {
        return {
            to: '',
            subject: '',
            body: '',
        }
    },
    methods: {
        setData() {
            if (this.replayEmail) {
                this.subject = `re: ${this.replayEmail.subject}`
                this.to = `${this.replayEmail.from}`
            }
            else if (this.note) this.body = this.note
        },
        emailSubmitted() {
            let newEmail = {
                folder: 'sent',
                subject: this.subject,
                from: 'me',
                to: this.to,
                body: this.body,
                isRead: false,
                sentAt: Date.now(),
                id: utilService.makeId()
            };
            emailService.save(newEmail)
                .then(() => {
                    this.$emit('emailSaved');
                })
        },
        composeClosed() {
            this.$emit('composeClosed');
        },
    },
    created() {
        this.setData();
    }
}
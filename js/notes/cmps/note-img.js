export default {
    props: ['note'],
    template: `
        <section>
                <h2>{{note.info.title}}</h2>
                <img :src="note.info.url" :alt="note.info.title">
        </section>
    `,
}
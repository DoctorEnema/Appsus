export default {
    props: ['note'],
    template: `
        <section>
            <h2>{{note.info.title}}</h2>
            <iframe :src="note.info.url"></iframe>
        </section>
    `,
}
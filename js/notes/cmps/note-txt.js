export default {
    props: ['note'],
    template: `
        <section>
            <div>
                <h2>{{note.info.title}}</h2>     
                <p>{{note.info.txt}}</p>
            </div>
        </section>
    `,
}
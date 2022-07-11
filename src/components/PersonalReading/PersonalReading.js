import './PersonalReading.css'

function PersonalReading() {
    return (
        <main className="PersonalReading">
            <article className="PersonalReading__pages">
                <section className="PersonalReading__pages__leftPage">
                    
                </section>
                <section className="PersonalReading__pages__rightPage">
                    <embed type="text/html" src={process.env.PUBLIC_URL + '/htmlSource/practice.html'}></embed>
                </section>
            </article>
            <aside className="PersonalReading__mostLabeled">
                <div className="PersonalReading__mostLabeled__chart">
                    <div className="PersonalReading__mostLabeled__chart--title">
                        <h2 className="PersonalReading__mostLabeled__chart--title--text">Most Labeled</h2>
                    </div>
                    <div className="PersonalReading__mostLabeled__chart--list">
                        <ol>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                    </div>
                </div>
            </aside>
        </main>
    );
}

export default PersonalReading;
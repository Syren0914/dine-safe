import CountUp from "@/app/TextAnimations/CountUp/CountUp";

export default function StatsSection() {
    return (
        <section className="py-28 md:py-26">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">+
                            <CountUp
                            from={0}
                            to={1200}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                            />
                        </div>
                        <p>Stars on GitHub</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                        <CountUp
                            from={0}
                            to={22}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                        />
                             M</div>
                        <p>Active Users</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">
                        +<CountUp
                            from={0}
                            to={500}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                        />
                        </div>
                        <p>Powered Apps</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
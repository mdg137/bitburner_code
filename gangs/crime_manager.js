export async function main(ns) {
    while (true) {
        for (let j = ns.args[0]; j < ns.args[1]; j++) {
            var tasks = ns.gang.getTaskNames()
            var members = ns.gang.getMemberNames()
            for (let i = 0; i < members.length; i++) {
                ns.gang.setMemberTask(members[i], tasks[j])
            }
            await ns.sleep(ns.args[2])
        }
        ns.gang.setTerritoryWarfare(true)
        await ns.sleep(1000)
    }
}
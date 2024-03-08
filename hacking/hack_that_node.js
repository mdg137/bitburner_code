export async function main(ns) {
    while (true) {
        if (ns.getServerSecurityLevel(ns.args[0]) > ns.getServerMinSecurityLevel(ns.args[0]) + 3) {
            await ns.weaken(ns.args[0])
        }
        else if (ns.getServerMoneyAvailable(ns.args[0]) < 0.99 * ns.getServerMaxMoney(ns.args[0])) {
            await ns.grow(ns.args[0])
        }
        else if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(ns.args[0])) {
            await ns.hack(ns.args[0])
        }
        await ns.sleep(1000)
    }
}
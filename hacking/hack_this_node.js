export async function main(ns) {
    ns.run("copy_and_run.js", 1, "hack_this_node.js")
    while (true) {
        if (ns.getServerSecurityLevel(ns.getHostname()) > ns.getServerMinSecurityLevel(ns.getHostname()) + 5) {
            await ns.weaken(ns.getHostname())
        }
        else if (ns.getServerMoneyAvailable(ns.getHostname()) < 0.75 * ns.getServerMaxMoney(ns.getHostname())) {
            await ns.grow(ns.getHostname())
        }
        else if (ns.getHackingLevel() > ns.getServerRequiredHackingLevel(ns.getHostname())) {
            await ns.hack(ns.getHostname())
        }
        await ns.sleep(1000)
    }
}
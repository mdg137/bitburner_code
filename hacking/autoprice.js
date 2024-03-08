export async function main(ns) {
    while (ns.getPurchasedServers().length < 25) {
        for (let i = 0; i < 25; i++) {
            ns.purchaseServer("test", 4)
        }
        await ns.sleep(1000)
    }
    var list = ns.getPurchasedServers()
    while (true) {
        for (let i = 0; i < list.length; i++) {
            ns.upgradePurchasedServer(list[i], 2 * (ns.getServerMaxRam(list[i])))
        }
        await ns.sleep(1000)
    }
}
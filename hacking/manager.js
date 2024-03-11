import { launcher } from "class_launcher.js"
export function find_ram(ns, threads, script) {
    var purchasedservers = ns.getPurchasedServers()
    var source_name
    for (let i = 0; i < purchasedservers.length; i++) {
        var free_ram = ns.getServerMaxRam(purchasedservers[i]) - ns.getServerUsedRam(purchasedservers[i])
        var free_threads = Math.floor(free_ram / ns.getScriptRam(script))
        if (free_threads >= threads) {
            source_name = purchasedservers[i]
            break
        }
    }
    if (source_name == null) {
        ns.print("Not enough ram for hack. Buy more servers!")
        return false
    }
    else {
        return source_name
    }
}
export async function main(ns) {
    const server = ns.getServer(ns.args[0])
    const server_name = ns.args[0]
    const player = ns.getPlayer()
    const launch = new launcher(ns, server_name, 0)
    while (true) {
        var istargetmoney = ns.getServerMoneyAvailable(server_name) < 0.9 * ns.getServerMaxMoney(server_name)
        var difference = ns.getServerSecurityLevel(server_name) - (ns.getServerMinSecurityLevel(server_name) + 3)
        var isweak = difference > 1
        var isportsopen = launch.destroy_barriers(ns, server_name)
        if (!isportsopen) {
            break
        }
        if (isweak) {
            var weaken_time = ns.formulas.hacking.weakenTime(server, player)
            var weak_amount = ns.weakenAnalyze(1)
            var threads = Math.ceil(difference / weak_amount)
            var ram = find_ram(ns, threads, "weak_dumb.js")
            if (ram != false) {
                ns.scp("weak_dumb.js", ram)
                ns.exec("weak_dumb.js", ram, threads, server_name)
                await ns.sleep(weaken_time + 100)
            }
            else {
                ns.print("Can't find enough ram to weaken the server. Upgrade your servers!")
                //ns.print(threads)
                await ns.sleep(1000)
            }
        }
        else if (istargetmoney) {
            var threads = ns.formulas.hacking.growThreads(server, player, 0.5 * ns.getServerMaxMoney(server_name))
            var grow_time = ns.formulas.hacking.growTime(server, player)
            var ram = find_ram(ns, threads, "grow_dumb.js")
            if (ram != false) {
                ns.scp("grow_dumb.js", ram)
                ns.exec("grow_dumb.js", ram, threads, server_name)
                await ns.sleep(grow_time + 100)
            }
            else {
                ns.print("Can't find enough ram to grow the server. Upgrade your servers!")
                await ns.sleep(1000)
            }
        }
        else {
            var one_thread = ns.formulas.hacking.hackPercent(server, player)
            var threads = Math.ceil(1 / one_thread)
            var hack_time = ns.formulas.hacking.hackTime(server, player)
            var ram = find_ram(ns, threads, "hack_dumb.js")
            if (ram != false) {
                ns.scp("hack_dumb.js", ram)
                ns.exec("hack_dumb.js", ram, threads, server_name)
                await ns.sleep(hack_time + 100)
            }
            else {
                await ns.sleep(1000)
            }
        }
    }
}

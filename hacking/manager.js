export async function main(ns) {
    while (true) {
        var server = ns.getServer(ns.args[0])
        var server_name = ns.args[0]
        var player = ns.getPlayer()
        var istargetmoney = server.moneyAvailable < 0.9 * server.moneyMax
        var difference = ns.getServerSecurityLevel(server_name) - (ns.getServerMinSecurityLevel(server_name) + 3)
        var isweak = difference > 0

        if (!server.sshPortOpen && ns.fileExists("BruteSSH.exe")) {
            ns.brutessh(server_name)
        }
        if (!server.ftpPortOpen && ns.fileExists("FTPCrack.exe")) {
            ns.ftpcrack(server_name)
        }
        if (!server.smtpPortOpen && ns.fileExists("relaySMTP.exe")) {
            ns.relaysmtp(server_name)
        }
        if (!server.httpPortOpen && ns.fileExists("HTTPWorm.exe")) {
            ns.httpworm(server_name)
        }
        if (!server.sqlPortOpen && ns.fileExists("SQLInject.exe")) {
            ns.sqlinject(server_name)
        }
        var nuke = ns.nuke(server_name)
        if (!nuke) { break }
        var purchasedservers = ns.getPurchasedServers()
        if (isweak) {
            var weaken_time = ns.formulas.hacking.weakenTime(server, player)
            var weak_amount = ns.weakenAnalyze(1)
            var threads = Math.ceil(difference / weak_amount)
            var source_name
            for (let i = 0; i < purchasedservers.length; i++) {
                var free_ram = ns.getServerMaxRam(purchasedservers[i]) - ns.getServerUsedRam(purchasedservers[i])
                var free_threads = Math.floor(free_ram / ns.getScriptRam("weak_dumb.js"))
                if (free_threads >= threads) {
                    source_name = purchasedservers[i]
                    break
                }
            }
            ns.scp("weak_dumb.js", source_name)
            ns.exec("weak_dumb.js", source_name, threads, server_name)
            await ns.sleep(weaken_time + 1000)
        }
        else if (istargetmoney) {
            var threads = ns.formulas.hacking.growThreads(server, player, 0.9 * server.moneyMax)
            var grow_time = ns.formulas.hacking.growTime(server, player)
            var source_name
            for (let i = 0; i < purchasedservers.length; i++) {
                var free_ram = ns.getServerMaxRam(purchasedservers[i]) - ns.getServerUsedRam(purchasedservers[i])
                var free_threads = Math.floor(free_ram / ns.getScriptRam("grow_dumb.js"))
                if (free_threads >= threads) {
                    source_name = purchasedservers[i]
                    break
                }
            }
            ns.scp("grow_dumb.js", source_name)
            ns.exec("grow_dumb.js", source_name, threads, server_name)
            await ns.sleep(grow_time + 1000)
        }
        else {
            var one_thread = ns.formulas.hacking.hackPercent(server, player)
            var threads = Math.ceil(1 / one_thread)
            var hack_time = ns.formulas.hacking.hackTime(server, player)
            var source_name
            for (let i = 0; i < purchasedservers.length; i++) {
                var free_ram = ns.getServerMaxRam(purchasedservers[i]) - ns.getServerUsedRam(purchasedservers[i])
                var free_threads = Math.floor(free_ram / ns.getScriptRam("hack_dumb.js"))
                if (free_threads >= threads) {
                    source_name = purchasedservers[i]
                    break
                }
            }
            ns.scp("hack_dumb.js", source_name)
            ns.exec("hack_dumb.js", source_name, threads, server_name)
            await ns.sleep(hack_time + 1000)
        }
    }
}

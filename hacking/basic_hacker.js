import {spider} from class_spider
export function main(ns) {
    class launcher {
        constructor(target_hack, with_ram, ports) {
            this.target = target_hack
            this.ram = with_ram
            this.ports = ports
        }
        find_server_with_ram(list) {
            var name = null
            var purchased_servers = ns.getPurchasedServers()
            for (let i = 0; i < purchased_servers.length; i++) {
                if ((ns.getServerMaxRam(purchased_servers[i]) - ns.getServerUsedRam(purchased_servers[i])) >= this.ram) {
                    name = purchased_servers[i]
                }
            }
            if (name != null) {
                return name
            }
            else {
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == this.target) {
                        continue
                    }
                    var free_ram = ns.getServerMaxRam(list[i]) - ns.getServerUsedRam(list[i])
                    if (free_ram >= this.ram) {
                        name = list[i]
                        break
                    }
                }
                if (name == null) {
                    return name
                }
                else {
                    return name
                }
            }
        }
        destroy_barriers(x) {
            if (x == null) {
                return false
            }
            else if (ns.hasRootAccess(x) == true) {
                return true
            }
            else if (ns.getServerNumPortsRequired(x) > this.ports) {
                return false
            }
            else {
                if (ns.fileExists("BruteSSH.exe", "home")) {
                    ns.brutessh(x)
                }
                if (ns.fileExists("FTPCrack.exe", "home")) {
                    ns.ftpcrack(x)
                }
                if (ns.fileExists("relaySMTP.exe", "home")) {
                    ns.relaysmtp(x)
                }
                if (ns.fileExists("HTTPWorm.exe", "home")) {
                    ns.httpworm(x)
                }
                if (ns.fileExists("SQLInject.exe", "home")) {
                    ns.sqlinject(x)
                }
                ns.nuke(x)
                return true
            }
        }
        send_in_the_hackers(servers) {
            var pserv_list = ns.getPurchasedServers()
            for (let i = 0; i < pserv_list.length; i++) {
                if (this.target == pserv_list[i]) {
                    ns.print("Specified target was a purchased server. Ignoring...")
                    return false
                }
            }
            var servname = this.find_server_with_ram(servers)
            var barriers_down_ram = this.destroy_barriers(servname)
            var barriers_down_target = this.destroy_barriers(this.target)
            if ((barriers_down_ram == false) || (barriers_down_target == false)) {
                ns.print("Cannot hack this server, root access is not available or there is not enough ram. Qutting...")
                return false
            }
            else {
                ns.scp("hack_that_node.js", servname)
                var threads = Math.floor((this.ram) / ns.getScriptRam("hack_that_node.js"))
                ns.exec("hack_that_node.js", servname, threads, this.target)
                return true
            }
        }

    }

    const x = new spider(100)
    var server_list = x.make_list()
    const y = []
    //ns.print(server_list)
    for (let i = 0; i < server_list.length; i++) {
        y[i] = new launcher(server_list[i], ns.args[1], ns.args[0])
        y[i].send_in_the_hackers(server_list)
    }
}
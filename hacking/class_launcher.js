/*
This is the launcher class. This class is designed to copy grow, weaken, and hack scripts (not dependent on formulas API)
to servers with appropriate ram to grow/weaken/hack a target. 

Current usage: basic_hacker.js for hacking servers, manager.js for the launcher's "destroy_barriers" function
*/
export class launcher {
    constructor(ns, target_hack, with_ram) {
        this.target = target_hack
        this.ram = with_ram
        this.port_scripts = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
        this.server = ns.getServer(target_hack)
    }
    find_server_with_ram(ns, list) { //takes a list (usually from spider object) and returns a server name with appropriate ram
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
    destroy_barriers(ns, x) { //opens all possible ports on server x
        if (x == null) {
            return false
        }
        else if (ns.hasRootAccess(x) == true) {
            return true
        }
        else {
            var num_open_ports = 0
            const open_port = [ns.brutessh, ns.ftpcrack, ns.relaysmtp, ns.httpworm, ns.sqlinject]
            var num_open_ports = 0
            for (let i = 0; i < this.port_scripts.length; i++) {
                if (ns.fileExists(this.port_scripts[i])) {
                    open_port[i](x)
                    num_open_ports = num_open_ports + 1
                }
            }
            if (ns.getServerNumPortsRequired(x) > num_open_ports) {
                ns.print("This server has one or more ports you can't open. Buy more port scripts from the Darkweb!")
                return false
            }
            else {
                ns.nuke(x)
                return true
            }
        }
    }
    send_in_the_hackers(ns, servers) { //attempts to cpy and run hacking script on ram server at this.target
        var pserv_list = ns.getPurchasedServers()
        for (let i = 0; i < pserv_list.length; i++) {
            if (this.target == pserv_list[i]) {
                ns.print("Specified target was a purchased server. Ignoring...")
                return false
            }
        }
        var servname = this.find_server_with_ram(ns, servers)
        var barriers_down_ram = this.destroy_barriers(ns, servname)
        var barriers_down_target = this.destroy_barriers(ns, this.target)
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

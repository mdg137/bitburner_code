export async function main(ns) {
    var i = 0
    while (true) {
        if (ns.gang.canRecruitMember()) {
            ns.gang.recruitMember(i.toString())
        }
        var members = ns.gang.getMemberNames()
        var gear = ns.gang.getEquipmentNames()
        for (let j = 0; j < members.length; j++) {
            for (let k = 0; k < gear.length; k++) {
                ns.gang.purchaseEquipment(members[j], gear[k])
            }
        }
        i++
        await ns.sleep(ns.args[0])
    }
}
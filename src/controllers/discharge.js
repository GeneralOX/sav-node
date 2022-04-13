const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createDischarge = async (req, res, next) => {
    var interventions = req.body.invoices.map((v) => { return { id: v.id } });
    const discharge = await prisma.discharge.create({
        data: {
            userid: req.body.userid,
            destination: req.body.destination,
            interventions: {
                connect: interventions,
            },
        },
        include: { interventions: { select: { id: true } } }
    });

    _data = await prisma.intervention.updateMany({
        where: { dischargeId: discharge.id },
        data: { outStore: true }
    })

    _data = req.body.invoices.map((v) => {
        return {
            interventionId: v.id,
            status: "En attente recuperation boutique via reparateur externe",
            obs: v.laststatus,
            local: req.body.destination,
        }
    });
    await prisma.Intervention_status.createMany({ data: _data });
    res.json(_data);
}

exports.createSwapDischarge = async (req, res, next) => {
    var dechargeItems = req.body.dechargeItems;
    const discharge = await prisma.discharge.create({
        data: {
            userid: req.body.userid,
            destination: "Entrepot",
            interventions: { connect: dechargeItems.map((v) => { return { id: parseInt(v.id) } }) },
        }
    });

    await prisma.swap_status.createMany({
        data: dechargeItems.map((v) => {
            return {
                status: v.status,
                comment: "",
                interventionId: v.id
            }
        })
    });

    await prisma.device.updateMany({
        where: { imei: { in: dechargeItems.map((v) => v.device) } },
        data: { isAvailable: false }

    });
    res.json({ invoice: discharge });
}
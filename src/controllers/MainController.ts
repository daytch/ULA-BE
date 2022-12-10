import { Request, Response } from "express";
import { SuratLog } from "../models/SuratLog";
import { Surat } from "../models/Surat";
import moment from "moment";
import { nikParser } from 'nik-parser'
import { SuratAttachment } from "../models/SuratAttachment";

export class MainController{
    public async SelfService(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            // insert surat
            let nik = nikParser(req.body.data.nik);
            if(nik.isValid()){
                let cek = await Surat.findOne({
                    where: {
                        nik: req.body.data.nik,
                        judul: req.body.data.judul,
                        tujuan: req.body.data.tujuan
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                let isDup = false;
                if(cek?.createdAt != null){
                    let today = moment().format("YYYY-MM-DD");
                    let created = moment(cek?.createdAt).format("YYYY-MM-DD");
                    if(today == created){
                        isDup = true;
                    }
                }
                if(isDup){
                    status = 401
                    rtn = {
                        message: "Gagal submit surat karena duplikasi data",
                    }
                }
                else {
                    req.body.data.createdBy = "Self Service"
                    let ins = await Surat.create({...req.body.data})
                    ins.no_surat = ins.id + "/ULA/" + moment().format("DDMMYYYY");
                    await ins.save()
                    // insert logs
                    let SuratLogs : SuratLog = new SuratLog();
                    SuratLogs.id_surat = ins.id;
                    SuratLogs.status = ins.status;
                    SuratLogs.keterangan = "Submit surat pada admin umum";
                    SuratLogs.createdBy = ins.createdBy;
                    SuratLogs.save();

                    status = 200
                    rtn = {
                        message: "Success insert surat",
                        data: ins
                    }
                }
            }
            else {
                status = 401
                rtn = {
                    message: "NIK tidak ditemukan",
                }
            }
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async SubmitSurat(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            // insert surat
            let nik = nikParser(req.body.data.nik);
            if(nik.isValid()){
                let cek = await Surat.findOne({
                    where: {
                        nik: req.body.data.nik,
                        judul: req.body.data.judul,
                        tujuan: req.body.data.tujuan
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
                let isDup = false;
                if(cek?.createdAt != null){
                    let today = moment().format("YYYY-MM-DD");
                    let created = moment(cek?.createdAt).format("YYYY-MM-DD");
                    if(today == created){
                        isDup = true;
                    }
                }
                if(isDup){
                    status = 401
                    rtn = {
                        message: "Gagal submit surat karena duplikasi data",
                    }
                }
                else {
                    req.body.data.createdBy = req.body.payload.username;
                    let ins = await Surat.create({...req.body.data})
                    ins.no_surat = ins.id + "/ULA/" + moment().format("DDMMYYYY");
                    await ins.save()
                    // insert logs
                    let SuratLogs : SuratLog = new SuratLog();
                    SuratLogs.id_surat = ins.id;
                    SuratLogs.status = ins.status;
                    SuratLogs.keterangan = "Submit surat pada admin umum";
                    SuratLogs.createdBy = ins.createdBy;
                    SuratLogs.save();

                    status = 200
                    rtn = {
                        message: "Success insert surat",
                        data: ins
                    }
                }
            }
            else {
                status = 401
                rtn = {
                    message: "NIK tidak ditemukan",
                }
            }
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async TrackingPage(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            status = 200
            rtn = await Surat.findOne({
                where: req.query,
                include: [SuratAttachment, SuratLog]
            });
            // rtn = await SuratLog.findAll({
            //     where: {id_surat: surat?.id}
            // });
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async Dashboard(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            let surats : Surat[] = await Surat.findAll({
                order: [['createdAt', 'ASC']]
            });
            let suratmasuk = 0;
            let suratproses = 0;
            let suratselesai = 0;
            let periodesuratmasuk : any = {};
            let periodesuratproses : any = {};
            let periodesuratselesai : any = {};
            for(let i = 0; i < surats.length; i++){
                let blnthn = moment(surats[i].createdAt).format("YYYY-MM");
                if(surats[i].status == "A"){
                    suratmasuk++;
                    if(periodesuratmasuk[blnthn]){
                        periodesuratmasuk[blnthn]++;
                    }
                    else {
                        periodesuratmasuk[blnthn] = 1;
                    }
                }
                else if(surats[i].status.startsWith("B")){
                    suratproses++;
                    if(periodesuratproses[blnthn]){
                        periodesuratproses[blnthn]++;
                    }
                    else {
                        periodesuratproses[blnthn] = 1;
                    }
                }
                else if(surats[i].status == "F"){
                    suratselesai++;
                    if(periodesuratselesai[blnthn]){
                        periodesuratselesai[blnthn]++;
                    }
                    else {
                        periodesuratselesai[blnthn] = 1;
                    }
                }
            }
            let permasuk = [];
            let perproses = [];
            let perselesai = [];
            for(let i = 0; i < 12; i++){
                let blnthn = moment().subtract(i, "months").format("YYYY-MM");
                let cnt = 0;
                if(periodesuratmasuk[blnthn]){
                    cnt = periodesuratmasuk[blnthn];
                }
                permasuk.push({periode: blnthn, total: cnt});
                cnt = 0;
                if(periodesuratproses[blnthn]){
                    cnt = periodesuratproses[blnthn];
                }
                perproses.push({periode: blnthn, total: cnt});
                cnt = 0;
                if(periodesuratselesai[blnthn]){
                    cnt = periodesuratselesai[blnthn];
                }
                perselesai.push({periode: blnthn, total: cnt});
            }
            status = 200
            rtn = {
                "suratmasuk": {
                    "total": suratmasuk,
                    "detail": permasuk
                },
                "suratproses": {
                    "total": suratproses,
                    "detail": perproses
                },
                "suratselesai": {
                    "total": suratselesai,
                    "detail": perselesai
                }
            }
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async SuratMasuk(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            status = 200
            let param = {
                status: req.body.payload.status
            }
            let surat = await Surat.findAll({
                where: param,
                include: [SuratAttachment]
            });
            rtn = surat
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async SuratKeluar(req: Request, res: Response){
        let rtn: any = [];
        let status = 0;
        try{
            status = 200
            let param = {
                status: req.body.payload.status
            }
            let surat = await SuratLog.findAll({
                where: param
            });
            for(let s of surat){
                let suratonly = await Surat.findByPk(s.id_surat, {
                    include: [SuratAttachment]
                });
                if(suratonly?.status != param.status){
                    rtn.push(suratonly);
                }
            }
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async ActionSurat(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            let surats : Surat | null = await Surat.findByPk(req.body.id);
            if(surats != null){
                let ssurat : Surat = new Surat();
                ssurat = surats;
                if(ssurat.status == req.body.payload.status){
                    ssurat.status = req.body.destination;
                    await ssurat.save();

                    // insert logs
                    let SuratLogs : SuratLog = new SuratLog();
                    SuratLogs.id_surat = ssurat.id;
                    SuratLogs.status = ssurat.status;
                    SuratLogs.keterangan = req.body.keterangan;
                    SuratLogs.createdBy = req.body.payload.username;
                    SuratLogs.save();

                    if(req.body.lampiran != undefined && req.body.lampiran != ""){
                        let suratAttachment : SuratAttachment = new SuratAttachment();
                        suratAttachment.id_surat = surats.id;
                        suratAttachment.keterangan = req.body.keterangan;
                        suratAttachment.status = req.body.destination;
                        suratAttachment.createdBy = req.body.payload.username;
                        suratAttachment.lampiran = req.body.lampiran;
                        suratAttachment.save();
                    }

                    status = 200
                }
                else {
                    status = 401
                    rtn = {
                        message: "Surat sudah diproses sebelumnya",
                    }
                }
            }
            else {
                status = 401
                rtn = {
                    message: "Surat Not Found",
                }
            }
            
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }

    public async laporan(req: Request, res: Response){
        let rtn: any;
        let status = 0;
        try{
            let surat = await Surat.findAll({
                order: [['createdAt', 'DESC']]
            });
            for(let s of surat){
                let logs = await SuratLog.findOne({
                    where: {id_surat : s.id},
                    order: [['createdAt', 'DESC']]
                });
                s.status = "On Progress"
                s.tgl_selesai = "-"
                if(logs != null){
                    if(logs.status == "F"){
                        s.status = "Done";
                        s.tgl_selesai = logs.createdAt;
                    }
                }
            }
            status = 200;
            rtn = surat;
        }
        catch(err: any){
            console.error(err);
            status = 500;
        }
        return res.status(status).json(rtn);
    }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const SuratLog_1 = require("../models/SuratLog");
const Surat_1 = require("../models/Surat");
const moment_1 = __importDefault(require("moment"));
const nik_parser_1 = require("nik-parser");
class MainController {
    SelfService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                // insert surat
                let nik = (0, nik_parser_1.nikParser)(req.body.data.nik);
                if (nik.isValid()) {
                    let cek = yield Surat_1.Surat.findOne({
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
                    if ((cek === null || cek === void 0 ? void 0 : cek.createdAt) != null) {
                        let today = (0, moment_1.default)().format("YYYY-MM-DD");
                        let created = (0, moment_1.default)(cek === null || cek === void 0 ? void 0 : cek.createdAt).format("YYYY-MM-DD");
                        if (today == created) {
                            isDup = true;
                        }
                    }
                    if (isDup) {
                        status = 401;
                        rtn = {
                            message: "Gagal submit surat karena duplikasi data",
                        };
                    }
                    else {
                        req.body.data.createdBy = "Self Service";
                        let ins = yield Surat_1.Surat.create(Object.assign({}, req.body.data));
                        ins.no_surat = ins.id + "/ULA/" + (0, moment_1.default)().format("DDMMYYYY");
                        yield ins.save();
                        // insert logs
                        let SuratLogs = new SuratLog_1.SuratLog();
                        SuratLogs.id_surat = ins.id;
                        SuratLogs.status = ins.status;
                        SuratLogs.keterangan = "Submit surat pada admin umum";
                        SuratLogs.createdBy = ins.createdBy;
                        SuratLogs.save();
                        status = 200;
                        rtn = {
                            message: "Success insert surat",
                            data: ins
                        };
                    }
                }
                else {
                    status = 401;
                    rtn = {
                        message: "NIK tidak ditemukan",
                    };
                }
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    SubmitSurat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                // insert surat
                let nik = (0, nik_parser_1.nikParser)(req.body.data.nik);
                if (nik.isValid()) {
                    let cek = yield Surat_1.Surat.findOne({
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
                    if ((cek === null || cek === void 0 ? void 0 : cek.createdAt) != null) {
                        let today = (0, moment_1.default)().format("YYYY-MM-DD");
                        let created = (0, moment_1.default)(cek === null || cek === void 0 ? void 0 : cek.createdAt).format("YYYY-MM-DD");
                        if (today == created) {
                            isDup = true;
                        }
                    }
                    if (isDup) {
                        status = 401;
                        rtn = {
                            message: "Gagal submit surat karena duplikasi data",
                        };
                    }
                    else {
                        req.body.data.createdBy = req.body.payload.username;
                        let ins = yield Surat_1.Surat.create(Object.assign({}, req.body.data));
                        ins.no_surat = ins.id + "/ULA/" + (0, moment_1.default)().format("DDMMYYYY");
                        yield ins.save();
                        // insert logs
                        let SuratLogs = new SuratLog_1.SuratLog();
                        SuratLogs.id_surat = ins.id;
                        SuratLogs.status = ins.status;
                        SuratLogs.keterangan = "Submit surat pada admin umum";
                        SuratLogs.createdBy = ins.createdBy;
                        SuratLogs.save();
                        status = 200;
                        rtn = {
                            message: "Success insert surat",
                            data: ins
                        };
                    }
                }
                else {
                    status = 401;
                    rtn = {
                        message: "NIK tidak ditemukan",
                    };
                }
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    TrackingPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                status = 200;
                let surat = yield Surat_1.Surat.findOne({
                    where: req.query
                });
                rtn = yield SuratLog_1.SuratLog.findAll({
                    where: { id_surat: surat === null || surat === void 0 ? void 0 : surat.id }
                });
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    Dashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                let surats = yield Surat_1.Surat.findAll({
                    order: [['createdAt', 'ASC']]
                });
                let suratmasuk = 0;
                let suratproses = 0;
                let suratselesai = 0;
                let periodesuratmasuk = {};
                let periodesuratproses = {};
                let periodesuratselesai = {};
                for (let i = 0; i < surats.length; i++) {
                    let blnthn = (0, moment_1.default)(surats[i].createdAt).format("YYYY-MM");
                    if (surats[i].status == "A") {
                        suratmasuk++;
                        if (periodesuratmasuk[blnthn]) {
                            periodesuratmasuk[blnthn]++;
                        }
                        else {
                            periodesuratmasuk[blnthn] = 1;
                        }
                    }
                    else if (surats[i].status.startsWith("B")) {
                        suratproses++;
                        if (periodesuratproses[blnthn]) {
                            periodesuratproses[blnthn]++;
                        }
                        else {
                            periodesuratproses[blnthn] = 1;
                        }
                    }
                    else if (surats[i].status == "F") {
                        suratselesai++;
                        if (periodesuratselesai[blnthn]) {
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
                for (let i = 0; i < 12; i++) {
                    let blnthn = (0, moment_1.default)().subtract(i, "months").format("YYYY-MM");
                    let cnt = 0;
                    if (periodesuratmasuk[blnthn]) {
                        cnt = periodesuratmasuk[blnthn];
                    }
                    permasuk.push({ periode: blnthn, total: cnt });
                    cnt = 0;
                    if (periodesuratproses[blnthn]) {
                        cnt = periodesuratproses[blnthn];
                    }
                    perproses.push({ periode: blnthn, total: cnt });
                    cnt = 0;
                    if (periodesuratselesai[blnthn]) {
                        cnt = periodesuratselesai[blnthn];
                    }
                    perselesai.push({ periode: blnthn, total: cnt });
                }
                status = 200;
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
                };
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    SuratMasuk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                status = 200;
                let param = {
                    status: req.body.payload.status
                };
                let surat = yield Surat_1.Surat.findAll({
                    where: param
                });
                rtn = surat;
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    SuratKeluar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn = [];
            let status = 0;
            try {
                status = 200;
                let param = {
                    status: req.body.payload.status
                };
                let surat = yield SuratLog_1.SuratLog.findAll({
                    where: param
                });
                for (let s of surat) {
                    let suratonly = yield Surat_1.Surat.findByPk(s.id_surat);
                    if ((suratonly === null || suratonly === void 0 ? void 0 : suratonly.status) != param.status) {
                        rtn.push(suratonly);
                    }
                }
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    ActionSurat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                let surats = yield Surat_1.Surat.findByPk(req.body.id);
                if (surats != null) {
                    let ssurat = new Surat_1.Surat();
                    ssurat = surats;
                    if (ssurat.status == req.body.payload.status) {
                        ssurat.status = req.body.destination;
                        yield ssurat.save();
                        // insert logs
                        let SuratLogs = new SuratLog_1.SuratLog();
                        SuratLogs.id_surat = ssurat.id;
                        SuratLogs.status = ssurat.status;
                        SuratLogs.keterangan = req.body.keterangan;
                        SuratLogs.createdBy = req.body.payload.username;
                        SuratLogs.save();
                        status = 200;
                    }
                    else {
                        status = 401;
                        rtn = {
                            message: "Surat sudah diproses sebelumnya",
                        };
                    }
                }
                else {
                    status = 401;
                    rtn = {
                        message: "Surat Not Found",
                    };
                }
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
    laporan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtn;
            let status = 0;
            try {
                let surat = yield Surat_1.Surat.findAll({
                    order: [['createdAt', 'DESC']]
                });
                for (let s of surat) {
                    let logs = yield SuratLog_1.SuratLog.findOne({
                        where: { id_surat: s.id },
                        order: [['createdAt', 'DESC']]
                    });
                    s.status = "On Progress";
                    s.tgl_selesai = "-";
                    if (logs != null) {
                        if (logs.status == "F") {
                            s.status = "Done";
                            s.tgl_selesai = logs.createdAt;
                        }
                    }
                }
                status = 200;
                rtn = surat;
            }
            catch (err) {
                console.error(err);
                status = 500;
            }
            return res.status(status).json(rtn);
        });
    }
}
exports.MainController = MainController;
//# sourceMappingURL=MainController.js.map
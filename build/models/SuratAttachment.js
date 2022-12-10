"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuratAttachment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Surat_1 = require("./Surat");
let SuratAttachment = class SuratAttachment extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
], SuratAttachment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Surat_1.Surat),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], SuratAttachment.prototype, "id_surat", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: false,
    })
], SuratAttachment.prototype, "lampiran", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(2),
        allowNull: false,
    })
], SuratAttachment.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        defaultValue: ""
    })
], SuratAttachment.prototype, "keterangan", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(60),
        allowNull: false,
        defaultValue: ""
    })
], SuratAttachment.prototype, "createdBy", void 0);
SuratAttachment = __decorate([
    sequelize_typescript_1.Table
], SuratAttachment);
exports.SuratAttachment = SuratAttachment;
//# sourceMappingURL=SuratAttachment.js.map